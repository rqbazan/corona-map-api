require('dotenv').config()

module.exports = {
  verbose: true,
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  setupFiles: ['./jest.setup.js']
}
