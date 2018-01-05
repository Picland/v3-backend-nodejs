import * as sha1 from 'sha1'
import { Context } from 'koa'
import * as userService from '../service/user.service'
import * as tokenUtil from '../util/token'

export const login = async (ctx: Context) => {
  const { account, password } = ctx.request.body
  try {
    let user = await userService.getUserByPhone(account)
    if (!user || (sha1(password) !== user.password)) {
      return ctx.api(403, {}, {
        code: -1,
        msg: '用户名或密码错误'
      })
    }
    delete user.password
    // 客户端通过登录请求提交用户名和密码，服务端验证通过后生成一个 Token 与该用户进行关联，并将 Token 返回给客户端
    const token = tokenUtil.generateToken({ userId: user.id })
    ctx.cookies.set('token', token)
    return ctx.api(200, user, {
      code: 0,
      msg: '登录成功'
    })
  } catch (e) {
    return ctx.api(403, {}, {
      code: -1,
      msg: e.message
    })
  }
}
