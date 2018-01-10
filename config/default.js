/**
 * @description config-lite is a module that can read config file lightweightly.
 *  it will load diff config from the config dir where the process execute by NODE_ENV.
 *  if there is no NODE_ENV，it will read the file named `default`,
 *  if there is NODE_ENV，it will merge `${NODE_ENV}` file and `default` file.
 *
 * @note config-lite supports suffix such as .js、.json、.node、.yml、.yaml.
 *  if start node by `NODE_ENV=production node app`, it will search config/production.js, config/production.json,
 *  config/production.node, config/production.yml, config/production.yaml and merge `default` config in turn.
 *
 * @github https://github.com/nswbmw/config-lite
 */

module.exports = {
  tokenSecret: 'bm9kZXNlcnZlckFQSWp8dHNlY6JldA==',
  server: {
    port: 8888
  },
  mysql: {
    host: '127.0.0.1',
    username: 'porta',
    password: 'porta',
    database: 'earth-development',
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
