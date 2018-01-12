import * as sha1 from 'sha1'
import userModel from '../model/user.model'

interface User {
  id: string
  phoneNumber: string
  password?: string
  name?: string
  gender?: string
  avatar?: string
  bio?: string
  email?: string
}

function checkUserPassword (password: string, userPassword: string) {
  return sha1(password) === userPassword
}

function deleteUserPassword (user: User) {
  delete user.password
  return user
}

function register (user: User) {
  return userModel.register(user)
}

// todo 把phone_number放到model层做名称映射
async function checkUser (phoneNumber: string, password: string) {
  const user: User = await userModel.getUserInfo({ phone_number: phoneNumber })
  return checkUserPassword(password, user.password) ? deleteUserPassword(user) : null
}

async function getUserById (userId: string) {
  const user: User = await userModel.getUserInfo({ id: userId })
  return deleteUserPassword(user)
}

async function updateUserInfo (userId: string, data: object) {
  const user: User = await userModel.updateUserInfo(userId, data)
  return deleteUserPassword(user)
}

export default {
  register,
  checkUser,
  getUserById,
  updateUserInfo
}
