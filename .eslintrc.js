module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "semi": ["error", "always"],
    "eqeqeq": ["error", "always"],
    "no-unused-vars": ["error", { "vars": "local", "args": "after-used", "varsIgnorePattern": "^_" }]
  }
}
