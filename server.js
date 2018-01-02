import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import config from 'config-lite'
// import winston from 'winston'
// import expressWinston from 'express-winston'
import favicon from 'koa-favicon'
import resApi from 'koa.res.api'
import pkg from './package.json'
import formidable from './src/middleware/formidable.middleware'
import api from './src/api'

const server = new Koa()
const router = new Router()

server.use(bodyParser())
server.use(resApi())
server.use(logger())

// --------------------------------------------------------------------------
// Static Resource
// --------------------------------------------------------------------------
server.use(favicon(path.join('./static', 'favicon.ico')))
server.use(serve(path.join('./static')))

// --------------------------------------------------------------------------
// Form and File Upload Middleware
// --------------------------------------------------------------------------
server.use(formidable({
  uploadDir: path.join('./static/img'),
  keepExtensions: true
}))

// --------------------------------------------------------------------------
// Success Log
// --------------------------------------------------------------------------
// server.use(expressWinston.logger({
//   transports: [
//     new (winston.transports.Console)({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'log/success.log'
//     })
//   ]
// }))

// --------------------------------------------------------------------------
// Restful API
// --------------------------------------------------------------------------
api(router)
server.use(router.routes()).use(router.allowedMethods())

// --------------------------------------------------------------------------
// Error Log
// --------------------------------------------------------------------------
// server.use(expressWinston.errorLogger({
//   transports: [
//     new winston.transports.Console({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'log/error.log'
//     })
//   ]
// }))

// --------------------------------------------------------------------------
// Start the Server
// --------------------------------------------------------------------------
server.listen(config.server.port, () => {
  console.log(`${pkg.name} listening on http://localhost:${config.server.port}`)
})
