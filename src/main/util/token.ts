/**
 * JWT token management
 */

import * as jwt from 'jsonwebtoken'
import * as config from 'config'
import { Context } from 'koa'

const secretKey: string = config.get('tokenSecret')
const TOKEN_EXPIRATION = '7 days' // normal token expires strategy：month for mobile，week for web
const secret = Buffer.from(secretKey, 'base64')

export function generateToken (payload: object) {
  return jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRATION })
}

export function decodeToken (token: string) {
  return jwt.decode(token)
}

export function verifyToken (token: string, options?: jwt.VerifyOptions) {
  try {
    let payload = jwt.verify(token, secret, options)
    return payload
  } catch (err) {
    return false
  }
}

export function refreshToken (token: string) {
  const payload: any = decodeToken(token)
  let newToken = null
  if (payload) {
    newToken = jwt.sign({ userId: payload.userId }, secret, { expiresIn: TOKEN_EXPIRATION })
  }
  return newToken
}

export function getToken (ctx: Context) {
  if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
    // Authorization: Bearer [token]
    return ctx.headers.authorization.split(' ')[1]
  }
  if (ctx.query && ctx.query.token) {
    return ctx.query.token
  }
  if (ctx.cookies.get('token')) {
    return ctx.cookies.get('token')
  }
  return null
}

export default {
  generateToken,
  verifyToken,
  decodeToken,
  refreshToken,
  getToken
}
