/**
 * The definition of database table structure, operations and field mapping.
 *
 */
import * as Sequelize from 'sequelize'
import * as config from 'config-lite'

const sequelize = new Sequelize(config.mysql)

const User = sequelize.define('user', {
  id: {
    type: Sequelize.CHAR(36),
    validate: { isUUID: 4 }
  },
  phone_number: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  password: Sequelize.STRING(50),
  name: Sequelize.STRING(100),
  gender: Sequelize.CHAR(1),
  avatar: Sequelize.STRING(100),
  bio: Sequelize.STRING(100),
  email: Sequelize.STRING(100)
}, {
  freezeTableName: true,
  underscored: true,
  charset: 'utf8'
})

const getUserMapping = (result: any) => {
  return {
    id: result.id,
    phoneNumber: result.phone_number,
    password: result.password,
    name: result.name,
    gender: result.gender,
    avatar: result.avatar,
    bio: result.bio,
    email: result.email,
    createdAt: result.created_at
  }
}

export const register = async (user: any) => {
  const result: any = await User.create({
    id: user.id,
    phone_number: user.phoneNumber,
    password: user.password,
    name: user.name,
    gender: user.gender,
    avatar: user.avatar,
    bio: user.bio,
    email: user.email
  })
  return getUserMapping(result.dataValues)
}

export const getUserInfo = async (filter: Object) => {
  const result: any = await User.find({ where: filter })
  return getUserMapping(result.dataValues)
}

export const updateUserInfo = async (userId: string, data: Object) => {
  await User.update(data, { where: { id: userId } })
  return getUserInfo({ id: userId })
}

User.sync()
