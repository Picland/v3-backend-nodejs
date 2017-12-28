module.exports = {
  tokenSecret: 'bm9kZXNlcnZlckFQSWp8dHNlY6JldA==',
  server: {
    port: +process.env.PORT || 8888
  },
  mongodb: {
    host: '127.0.0.1',
    user: 'porta',
    pwd: 'porta123',
    database: 'earth-sandbox',
    port: 27017
  },
  mysql: {
    host: '127.0.0.1',
    user: 'porta',
    password: 'porta',
    database: 'earth-sandbox',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
}
