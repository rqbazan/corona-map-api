module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: process.versions.node
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '~': './src',
          tests: './tests'
        }
      }
    ]
  ],
  ignore: ['**/*.d.ts']
}
