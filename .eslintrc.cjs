module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'prettier'
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: ['react', 'jsx-a11y'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Не нужен в React 17+
      'react/prop-types': 'off', // Если не используешь PropTypes
      'react/display-name': 'off', // Отключаем чтобы не ругался на memo
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
  