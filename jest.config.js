const fs = require('fs')

const root = fs.existsSync('dist') ? 'dist' : 'src'

module.exports = {
  verbose: true,
  roots: [`<rootDir>/${root}`]
}
