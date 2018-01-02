/**
 * Formidable just for uploading img
 *
 * @reference https://github.com/felixge/node-formidable#api
 * @reference https://github.com/noraesae/express-formidable
 */

import formidable from 'formidable'

function parse (opts) {
  const form = new formidable.IncomingForm()
  Object.assign(form, opts)

  return async (ctx, next) => {
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

export default parse
