module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "rules": {
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [2, "single", { "avoidEscape": true }],
      "semi": [
          "error",
          "always"
      ]
  }
};