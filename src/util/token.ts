/**
 * JWT token管理
 */

import * as jwt from 'jsonwebtoken'
import * as config from 'config-lite'
import { Context } from 'koa'

const secretKey = config.tokenSecret
const TOKEN_EXPIRATION = '7 days' // normal token expires strategy：month for mobile，week for web
const secret = Buffer.from(secretKey, 'base64')

export const generateToken = (payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRATION })
}

export const verifyToken = (token: string, options?: jwt.VerifyOptions) => {
  try {
    let payload = jwt.verify(token, secret, options)
    return payload
  } catch (err) {
    return false
  }
}

export const decodeToken = (token: string) => jwt.decode(token)

export const refreshToken = (token: string) => {
  const payload: any = decodeToken(token)
  let newToken = null
  if (payload) {
    newToken = jwt.sign({ userId: payload.userId }, secret, { expiresIn: TOKEN_EXPIRATION })
  }
  return newToken
}

export const getToken = (ctx: Context) => {
  if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer [token]
    return ctx.headers.authorization.split(' ')[1]
  }
  if (ctx.query && ctx.query.token) {
    return ctx.query.token
  }
  if (ctx.cookies.get('token')) { // for page
    return ctx.cookies.get('token')
  }
  return null
}
