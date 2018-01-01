import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from 'config-lite'
import winston from 'winston'
import expressWinston from 'express-winston'
import favicon from 'serve-favicon'
import resApi from 'res.api'
import pkg from './package.json'
import formidable from './src/middleware/formidable.middleware'
import api from './src/api'

const server = express()

server.use(bodyParser.json())
server.use(cookieParser())
server.use(resApi)

// --------------------------------------------------------------------------
// Static Resource
// --------------------------------------------------------------------------
server.use(favicon(path.join('./static', 'favicon.ico')))
server.use(express.static(path.join('./static')))

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
server.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'log/success.log'
    })
  ]
}))

// --------------------------------------------------------------------------
// Restful API
// --------------------------------------------------------------------------
api(server)

// --------------------------------------------------------------------------
// Error Log
// --------------------------------------------------------------------------
server.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'log/error.log'
    })
  ]
}))

// --------------------------------------------------------------------------
// Start the Server
// --------------------------------------------------------------------------
server.listen(config.server.port, () => {
  console.log(`${pkg.name} listening on http://localhost:${config.server.port}`)
})
