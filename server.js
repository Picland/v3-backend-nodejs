import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import resApi from 'koa.res.api'
import bodyParser from 'koa-bodyparser'
import config from 'config-lite'
import pkg from './package.json'
import formidable from './src/middleware/formidable.middleware'
import log4js from './src/middleware/log4js'
import api from './src/api'

const server = new Koa()
const router = new Router()

server.use(log4js())
server.use(logger())
server.use(bodyParser())
server.use(resApi())

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
// Restful API
// --------------------------------------------------------------------------
api(router)
server.use(router.routes()).use(router.allowedMethods())

// --------------------------------------------------------------------------
// Start the Server
// --------------------------------------------------------------------------
server.listen(config.server.port, () => {
  console.log(`${pkg.name} listening on http://localhost:${config.server.port}`)
})
