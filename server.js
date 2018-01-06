import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import logger from 'koa-logger'
import log4n from 'koa-log4n'
import favicon from 'koa-favicon'
import resApi from 'koa.res.api'
import bodyParser from 'koa-bodyparser'
import config from 'config-lite'
import pkg from './package.json'
import formidable from './src/middleware/formidable.middleware'
import api from './src/api'

const server = new Koa()
const router = new Router()

// --------------------------------------------------------------------------
// Main Middlewares
// --------------------------------------------------------------------------
server.use(log4n())
server.use(logger())
server.use(bodyParser())
server.use(resApi())
server.use(favicon(path.join('./static', 'favicon.ico')))
server.use(serve(path.join('./static')))
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
