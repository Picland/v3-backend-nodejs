/**
 * The definition of database table structure, operations and field mapping.
 *
 */
import Sequelize from 'sequelize'
import config from 'config-lite'

const sequelize = new Sequelize(config.mysql)

const User = sequelize.define('user', {
  id: Sequelize.CHAR(36),
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
  underscored: true
})

const register = user => {
  return User.create({
    id: user.id,
    phone_number: user.phoneNumber,
    password: user.password,
    name: user.name,
    gender: user.gender,
    avatar: user.avatar,
    bio: user.bio,
    email: user.email
  })
}

const getUserInfo = async filter => {
  const result = (await User.find({where: filter})).dataValues
  return {
    id: result.id,
    phoneNumber: result.phone_number,
    password: result.password,
    name: result.name,
    gender: result.gender,
    avatar: result.avatar,
    bio: result.bio,
    createdAt: result.created_at
  }
}

User.sync()

export default User

export {
  register,
  getUserInfo
}
