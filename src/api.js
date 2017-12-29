import auth from './middleware/auth.middleware'
import loginController from './controller/login.controller'
import logoutController from './controller/logout.controller'
import userController from './controller/user.controller'
import registerController from './controller/register.controller'

export default server => {
  server.post('/api/v1/login', auth.isNotLogin, loginController.login)
  server.post('/api/v1/register', auth.isNotLogin, registerController.createUser)
  server.get('/api/v1/logout', auth.isLogin, logoutController.logout)
  server.get('/api/v1/user', userController.getOwnInfo)
  server.get('/api/v1/user/:id', userController.getUserInfo)
  server.post('/api/v1/updateUserInfo', auth.isLogin, userController.updateUserInfo)
  server.post('/api/v1/updateUserAvatar', auth.isLogin, userController.updateUserAvatar)
}

// 将下划线转化为大写字母
// husky
