import * as userModel from '../model/user.model'
import * as sha1 from 'sha1'

interface User {
  id: string,
  phoneNumber: string,
  password?: string,
  name?: string,
  gender?: string,
  avatar?: string,
  bio?: string,
  email?: string
}

const checkUserPassword = (password: string, userPassword: string) => sha1(password) === userPassword
const deleteUserPassword = (user: User) => {
  delete user.password
  return user
}

export const register = (user: User) => userModel.register(user)

// todo 把phone_number放到model层做名称映射
export const checkUser = async (phoneNumber: string, password: string) => {
  const user: User = await userModel.getUserInfo({ phone_number: phoneNumber })
  return checkUserPassword(password, user.password) ? deleteUserPassword(user) : null
}

export const getUserById = async (userId: string) => {
  const user: User = await userModel.getUserInfo({ id: userId })
  return deleteUserPassword(user)
}

/**
 * Update user info by user id.
 */
export const updateUserInfo = async (userId: string, data: object) => {
  const user: User = await userModel.updateUserInfo(userId, data)
  return deleteUserPassword(user)
}
