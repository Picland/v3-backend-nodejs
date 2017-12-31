import * as userModel from '../model/user.model'

/**
 * @public
 * @param {object} [user]
 * @return {object}
 */
const register = user => userModel.register(user)

/**
 * @public
 * @param {string} [phoneNumber]
 * @return {object}
 */
// todo 把phone_number放到model层做名称映射
const getUserByPhone = phoneNumber => userModel.getUserInfo({phone_number: phoneNumber})

/**
 * @public
 * @param {string} [userId]
 * @return {object}
 */
const getUserById = async userId => {
  const user = await userModel.getUserInfo({id: userId})
  delete user.password
  return user
}

/**
 * Update user info by user id.
 *
 * @public
 * @param {string} [userId]
 * @return {object}
 */
const updateUserInfo = async (userId, data) => {
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
