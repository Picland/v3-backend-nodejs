import * as path from 'path'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as serve from 'koa-static'
import * as logger from 'koa-logger'
import * as favicon from 'koa-favicon'
import * as resApi from 'koa.res.api'
import * as bodyParser from 'koa-bodyparser'
import * as config from 'config-lite'
import * as log4n from '../temp/koa-log4n'
import formidable from './middleware/formidable.middleware'
import setRouter from './router'

const server = new Koa()
const router = new Router()

// --------------------------------------------------------------------------
// Main Middlewares
// --------------------------------------------------------------------------
server.use(log4n())
server.use(logger())
server.use(bodyParser())
server.use(resApi())
server.use(favicon(path.join(__dirname, '../static', 'favicon.ico')))
server.use(serve(path.join(__dirname, '../static')))
server.use(formidable({
  uploadDir: path.join(__dirname, '../static/img'),
  keepExtensions: true
}))

// --------------------------------------------------------------------------
// Restful API
// --------------------------------------------------------------------------
setRouter(router)
server.use(router.routes()).use(router.allowedMethods())

// --------------------------------------------------------------------------
// Start the Server
// --------------------------------------------------------------------------
server.listen(config.server.port, () => {
  console.log(`✔︎ listening on http://localhost:${config.server.port} from Process [pid = ${process.pid}]`)
})
