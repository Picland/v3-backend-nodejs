import User, * as userModel from '../model/user.model'

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
const getUserById = userId => userModel.getUserInfo({id: userId})

// 根据用户ID修改用户信息
const updateUserInfo = async (userId, data) => {
  await User.update({_id: userId}, { $set: data }).exec()
  return User.findOne({ _id: userId }).exec()
}

export default {
  register,
  getUserByPhone,
  getUserById,
  updateUserInfo
}
