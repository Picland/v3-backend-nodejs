import { Middleware } from 'koa'

declare function log4n (): Middleware
declare namespace log4n { }
export = log4n
