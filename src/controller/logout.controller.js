export default {
  logout (ctx) {
    ctx.cookies.set('token')
    return ctx.api(200, {}, {
      'code': 0,
      'msg': '已退出登录'
    })
  }
}
