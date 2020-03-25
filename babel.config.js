module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: process.versions.node
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '~': './src'
        }
      }
    ]
  ],
  comments: false,
  ignore: ['**/typedefs.js']
}
