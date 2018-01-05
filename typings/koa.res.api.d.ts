import { Middleware } from 'koa'

// declare function api ()
// declare function api_error (data)

declare function api_middleware (options?: Object): Middleware
declare namespace api_middleware { }
export = api_middleware
