import Sequelize from 'sequelize'
import config from 'config-lite'

const sequelize = new Sequelize(config.mysql)

const User = sequelize.define('user', {
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
  freezeTableName: true
})

User.sync()

export {
  User
}
