const path = require('path');

module.exports = {
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: path.join(__dirname, 'tsconfig.json')
    },
    extends: ['@euberdeveloper/typescript'],
    rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-invalid-this': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off'
    }
};