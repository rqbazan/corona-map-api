require('dotenv').config()

module.exports = {
  verbose: true,
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  setupFilesAfterEnv: ['./jest.setup.js']
}
