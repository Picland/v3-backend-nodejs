const fs = require('fs')

// Parse the .babelrc config file
const babelrc = fs.readFileSync('./.babelrc')
let config

try {
    config = JSON.parse(babelrc)
    delete config.presets[0][1].targets.browsers
    config.presets[0][1].targets.node = 'current'
} catch (err) {
    console.error('==> ERROR: Error parsing your .babelrc.\n', err)
}

// Using babel-register to do the runtime compile,
// to make Node.js support the ES6 module loading.
require('babel-register')(config)
require('./server')