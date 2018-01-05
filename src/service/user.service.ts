import * as userModel from '../model/user.model'

export const register = (user: object) => userModel.register(user)

// todo 把phone_number放到model层做名称映射
export const getUserByPhone = (phoneNumber: string) => userModel.getUserInfo({ phone_number: phoneNumber })

export const getUserById = async (userId: string) => {
  const user = await userModel.getUserInfo({ id: userId })
  delete user.password
  return user
}

/**
 * Update user info by user id.
 */
export const updateUserInfo = async (userId: string, data: object) => {
  const user = await userModel.updateUserInfo(userId, data)
  delete user.password
  return user
}
