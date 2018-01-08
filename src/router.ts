import * as Router from 'koa-router'
import auth from './middleware/auth.middleware'
import loginController from './controller/login.controller'
import logoutController from './controller/logout.controller'
import userController from './controller/user.controller'
import registerController from './controller/register.controller'

export default (router: Router) => {
  router.post('/api/v1/login', auth.isNotLogin, loginController.login)
  router.post('/api/v1/register', auth.isNotLogin, registerController.createUser)
  router.get('/api/v1/logout', auth.isLogin, logoutController.logout)
  router.get('/api/v1/user', userController.getOwnInfo)
  router.get('/api/v1/user/:id', userController.getUserInfo)
  router.post('/api/v1/updateUserInfo', auth.isLogin, userController.updateUserInfo)
  router.post('/api/v1/updateUserAvatar', auth.isLogin, userController.updateUserAvatar)
}
