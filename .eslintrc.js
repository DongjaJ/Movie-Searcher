module.exports = {
  "root": true,
  "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "@typescript-eslint/parser",
    },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended', // eslint basic
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // eslint의 typescript formatting 기능 제거 (eslint-config-prettier)
    'plugin:prettier/recommended',  // eslint-plugin-prettier, eslint-config-prettier
    'plugin:vue/essential'
  ],
  "rules": {
    "prettier/prettier": "error",
}
};
