import auth from './middleware/auth'
import loginController from './controller/loginController'
import logoutController from './controller/logoutController'
import userController from './controller/userController'
import registerController from './controller/registerController'

export default (server) => {
    server.post('/api/v1/login', auth.isNotLogin, loginController.login)
    server.post('/api/v1/register', auth.isNotLogin, registerController.createUser)
    server.get('/api/v1/logout', auth.isLogin, logoutController.logout)
    server.get('/api/v1/user', userController.getOwnInfo)
    server.get('/api/v1/user/:id', userController.getUserInfo)
    server.post('/api/v1/updateUserInfo', auth.isLogin, userController.updateUserInfo)
    server.post('/api/v1/updateUserAvatar', auth.isLogin, userController.updateUserAvatar)
}
