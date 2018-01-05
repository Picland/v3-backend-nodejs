const path = require('path')

const ROOT = process.cwd()

// 错误日志输出完整路径
const errorLogPath = path.resolve(ROOT, './log/error/error')

// 响应日志输出完整路径
const responseLogPath = path.resolve(ROOT, './log/response/response')

module.exports = {
  appenders: {
    errorLogger: {
      'type': 'dateFile', // 日志类型
      'filename': errorLogPath, // 日志输出位置
      'alwaysIncludePattern': true, // 是否总是有后缀名
      'pattern': '-yyyy-MM-dd-hh.log' // 后缀，每小时创建一个新的日志文件
    },
    resLogger: {
      type: 'dateFile',
      'filename': responseLogPath,
      'alwaysIncludePattern': true,
      'pattern': '-yyyy-MM-dd-hh.log'
    }
  },
  categories: {
    errorLogger: { appenders: ['errorLogger'], level: 'error' },
    resLogger: { appenders: ['resLogger'], level: 'all' },
    default: { appenders: ['errorLogger', 'resLogger'], level: 'trace' }
  }
}
