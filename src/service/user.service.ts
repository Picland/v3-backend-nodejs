import * as userModel from '../model/user.model'

/**
 * @public
 * @return {object}
 */
const register = (user: object) => userModel.register(user)

/**
 * @public
 * @return {object}
 */
// todo 把phone_number放到model层做名称映射
const getUserByPhone = (phoneNumber: string) => userModel.getUserInfo({ phone_number: phoneNumber })

/**
 * @public
 * @return {object}
 */
const getUserById = async (userId: string) => {
  const user = await userModel.getUserInfo({ id: userId })
  delete user.password
  return user
}

/**
 * Update user info by user id.
 *
 * @public
 * @return {object}
 */
const updateUserInfo = async (userId: string, data: object) => {
  const user = await userModel.updateUserInfo(userId, data)
  delete user.password
  return user
}

export default {
  register,
  getUserByPhone,
  getUserById,
  updateUserInfo
}
