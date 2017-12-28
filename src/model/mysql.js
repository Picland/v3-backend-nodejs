import Sequelize, { STRING, CHAR } from 'sequelize'
import config from 'config-lite'

const sequelize = new Sequelize(config.mysql)

const User = sequelize.define('user', {
  phone_number: {
    type: STRING(50),
    primaryKey: true
  },
  password: STRING(50),
  name: STRING(100),
  gender: CHAR(1),
  avatar: STRING(100),
  bio: STRING(100),
  email: STRING(100)
}, {
  freezeTableName: true
})

export {
  User
}
