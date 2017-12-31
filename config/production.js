module.exports = {
  tokenSecret: 'bm9kZXNlcnZlckFQSWp8dHNlY6JldA==',
  server: {
    port: 8888
  },
  mysql: {
    host: '127.0.0.1',
    user: 'porta',
    password: 'porta',
    database: 'earth-production',
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
