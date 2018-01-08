import * as fs from 'fs'
import * as path from 'path'
import * as sha1 from 'sha1'
import tokenUtil from '../util/token'
import userService from '../service/user.service'
import { Context } from 'koa'

async function getOwnInfo (ctx: Context) {
  const oldToken = tokenUtil.getToken(ctx)
  if (!oldToken || !tokenUtil.verifyToken(oldToken)) {
    return ctx.api(401, {}, {
      code: -1,
      msg: '未登录无权限'
    })
  }
  // TODO: revoke old token
  const newTokent = tokenUtil.refreshToken(oldToken)
  ctx.cookies.set('token', newTokent)
  try {
    const user = await userService.getUserById((tokenUtil.decodeToken(newTokent) as any).userId)
    return ctx.api(200, { user })
  } catch (e) {
    return ctx.api(403, {}, {
      code: -1,
      msg: e.message
    })
  }
}

async function getUserInfo (ctx: Context) {
  try {
    const user = await userService.getUserById(ctx.params.id)
    return ctx.api(200, { user })
  } catch (e) {
    return ctx.api(403, {}, {
      code: -1,
      msg: e.message
    })
  }
}

async function updateUserInfo (ctx: Context) {
  if (ctx.request.body.password) {
    if (!ctx.request.body.newpassword1 || !ctx.request.body.newpassword2) {
      return ctx.api(403, {}, {
        code: -1,
        msg: '请填写新密码'
      })
    }
    let { password, newpassword1, newpassword2 } = ctx.request.body
    // 基础校验
    if (password.length < 6 || password.length > 16) {
      throw new Error('密码长度须6-16位')
    }
    if (newpassword1.length < 6 || newpassword1.length > 16) {
      throw new Error('密码长度须6-16位')
    }
    if (newpassword2.length < 6 || newpassword2.length > 16) {
      throw new Error('密码长度须6-16位')
    }
    // 基础校验通过
    password = sha1(password)
    newpassword1 = sha1(newpassword1)
    newpassword2 = sha1(newpassword2)
    try {
      const user = await userService.getUserById(ctx.headers.userid)
      if (password !== user.password) {
        throw new Error('原密码不正确')
      }
      if (newpassword1 !== newpassword2) {
        throw new Error('两次密码输入不一致')
      }
      let result = await userService.updateUserInfo(ctx.headers.userid, { password: newpassword2 })
      return ctx.api(200, result)
    } catch (e) {
      return ctx.api(403, {}, {
        code: -1,
        msg: e.message
      })
    }
  } else {
    try {
      let result = await userService.updateUserInfo(ctx.headers.userid, ctx.request.body)
      return ctx.api(200, result)
    } catch (e) {
      return ctx.api(403, {}, {
        code: -1,
        msg: e.message
      })
    }
  }
}

async function updateUserAvatar (ctx: Context) {
  const avatar = (ctx.request as any).files.files
  const body = {
    avatar: avatar.path.split(path.sep).pop()
  }
  try {
    let result = await userService.updateUserInfo(ctx.headers.userid, body)
    return ctx.api(201, result, {
      code: 0,
      msg: '上传成功'
    })
  } catch (e) {
    // 上传头像失败，异步删除上传的头像
    avatar &&
      avatar.path &&
      fs.unlink(avatar.path, e => {
        throw e
      })
    return ctx.api(403, {}, {
      code: -1,
      msg: e.message
    })
  }
}

export default {
  getOwnInfo,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar
}
