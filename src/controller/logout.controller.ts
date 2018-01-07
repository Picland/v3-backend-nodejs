import { Context } from 'koa'

function logout (ctx: Context) {
  ctx.cookies.set('token')
  return ctx.api(
    200,
    {},
    {
      code: 0,
      msg: '已退出登录'
    }
  )
}

export default {
  logout
}
