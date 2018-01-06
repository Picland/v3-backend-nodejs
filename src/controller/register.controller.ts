import * as path from 'path'
import * as sha1 from 'sha1'
import * as uuid from 'uuid'
import * as tokenUtil from '../util/token'
import * as userService from '../service/user.service'
import { Context } from 'koa'

export const createUser = async (ctx: Context, next: Function) => {
  let {
    account: phoneNumber,
    inviteCode,
    password,
    name = '',
    gender = 'x',
    bio = '',
    avatar = '',
    email = ''
  } = ctx.request.body

  // 校验参数
  try {
    if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
      throw new Error('请输入正确的手机号码')
    }
    // if (!(name.length >= 1 && name.length <= 10)) {
    //   throw new Error('名字请限制在 1-10 个字符')
    // }
    // if (!['m', 'f', 'x'].includes(gender)) {
    //   throw new Error('性别只能是男、女或保密')
    // }
    // if (!(bio.length >= 0 && bio.length <= 30)) {
    //   throw new Error('个人简介请限制在 1-30 个字符')
    // }
    if (!avatar) {
      avatar = 'default_avatar.jpg'
      // throw new Error('缺少头像')
    } else {
      avatar = avatar.path.split(path.sep).pop()
    }
    if (inviteCode !== 'TCAEVu32018') {
      throw new Error('无效的邀请码')
    }
    if (password.length < 6 || password.length > 16) {
      throw new Error('密码长度须6-16位')
    }
    // if (password !== repassword) {
    //   throw new Error('两次输入密码不一致')
    // }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    // avatar && avatar.path && fs.unlink(req.files.avatar.path)
    return ctx.api(403, {}, {
      code: -1,
      msg: e.message
    })
  }

  // 明文密码加密
  password = sha1(password)

  // 待写入数据库的用户信息
  let user = {
    id: uuid.v4(),
    phoneNumber,
    name,
    password,
    gender,
    bio,
    avatar,
    email
  }
  try {
    const result: any = await userService.register(user)
    const userId = result.id
    const token = tokenUtil.generateToken({ userId })
    ctx.cookies.set('token', token)
    return ctx.api(201, { user: { id: userId } }, {
      code: 0,
      msg: '注册成功'
    })
  } catch (e) {
    // 注册失败，异步删除上传的头像
    // req.files.avatar && fs.unlink(req.files.avatar.path)
    if (e.name.match('UniqueConstraintError')) {
      return ctx.api(403, {}, {
        code: -1,
        msg: '账号已经被注册'
      })
    }
    // return next(e)
  }
}
