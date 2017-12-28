module.exports = {
  tokenSecret: 'bm9kZXNlcnZlckFQSWp8dHNlY6JldA==',
  server: {
    port: +process.env.PORT || 8888
  },
  mongodb: {
    host: '127.0.0.1',
    username: 'porta',
    password: 'porta123',
    database: 'earth-development',
    port: 27017
  },
  mysql: {
    dialect: 'mysql',
    database: 'earth-development',
    operatorsAliases: false,
    host: 'localhost',
    port: 3306,
    username: 'porta',
    password: 'porta',
    timezone: '+08:00'
  }
}
