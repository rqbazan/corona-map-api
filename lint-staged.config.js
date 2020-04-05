module.exports = {
  '*.{js,json,md,xml,yml}': 'prettier --ignore-path .gitignore --write',
  '*.{js,ts}': [
    'eslint --ignore-path .gitignore --fix',
    () => 'tsc -p tsconfig.json --noEmit'
  ]
}
