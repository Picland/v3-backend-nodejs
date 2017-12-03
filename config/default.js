/**
 * config-lite 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 config 目录
 * 加载不同的配置文件。如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default
 * 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。
 * 如果程序以 NODE_ENV=test node app 启动，则通过 require('config-lite') 会依次降级查找 config/test.js、config/test.json、
 * config/test.node、config/tes.yml、config/test.yaml 并合并 default 配置; 如果程序以 NODE_ENV=production node app 启动，
 * 则通过 require('config-lite') 会依次降级查找 config/production.js、config/production.json、config/production.node、
 * config/production.yml、config/production.yaml 并合并 default 配置
 * @type {{port: number, tokenSecret: string, mongodb: string}}
 */

const dbConfig = require('./db.config')
const port = +process.env.PORT || 3000
module.exports = {
    port,
    tokenSecret: 'bm9kZXNlcnZlckFQSWp8dHNlY6JldA==',
    mongodb: `mongodb://${dbConfig.user}:${dbConfig.pwd}@localhost:${dbConfig.port}/${dbConfig.db}?authSource=admin`
}
