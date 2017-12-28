import fs from 'fs'
import path from 'path'
import resolve from 'resolve'
import yaml from 'js-yaml'
import merge from 'merge-descriptors'
import optimist from 'optimist'
import chalk from 'chalk'

const argv = optimist.argv

const filename = process.env.NODE_ENV || 'default'
const CONFIG_BASEDIR = process.env.CONFIG_BASEDIR || process.env.NODE_CONFIG_BASEDIR ||
  (module.parent && module.parent.filename ? path.dirname(module.parent.filename) : '') ||
  process.cwd()
const CONFIG_DIR = process.env.CONFIG_DIR || process.env.NODE_CONFIG_DIR || 'config'
const CONFIG = merge(JSON.parse(process.env.CONFIG || process.env.NODE_CONFIG || '{}'), argv)

export default {}

if (filename !== 'default') {
  try {
    module.exports = loadConfig(filename)
  } catch (e) {
    console.error(chalk.red('config-lite load `' + filename + '` failed'))
    console.error(chalk.red(e.stack))
  }
}

try {
  module.exports = merge(module.exports, loadConfig('default'), false)
} catch (e) {
  console.error(chalk.red('config-lite load `default` failed'))
  console.error(chalk.red(e.stack))
}

function loadConfig (filename) {
  var filepath = resolve.sync(filename, {
    basedir: CONFIG_BASEDIR,
    extensions: ['.js', '.json', '.node', '.yaml', '.yml'],
    moduleDirectory: CONFIG_DIR
  })
  if (/\.ya?ml$/.test(filepath)) {
    return merge(CONFIG, yaml.safeLoad(fs.readFileSync(filepath, 'utf8')), false)
  } else {
    return merge(CONFIG, require(filepath), false)
  }
}
