/**
 * Formidable just for uploading img
 *
 * @reference https://github.com/felixge/node-formidable#api
 * @reference https://github.com/noraesae/express-formidable
 */

import * as formidable from 'formidable'
import { Context } from 'koa'

export default function parse (options: Object) {
  const form = new formidable.IncomingForm()
  Object.assign(form, options)

  return async (ctx: Context, next: Function) => {
    if (ctx.is('multipart/form-data')) {
      await new Promise((resolve, reject) => {
        form.parse(ctx.req, (err, fields, files) => {
          if (err) {
            reject(err)
          } else {
            Object.assign(ctx.request, { fields, files })
            resolve()
          }
        })
      })
    }
    return next()
  }
}
