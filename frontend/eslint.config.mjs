import js from '@eslint/js'
import { configs } from 'typescript-eslint'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginUnicorn from 'eslint-plugin-unicorn'
import expoConfig from 'eslint-config-expo/flat.js'
import jsdoc from 'eslint-plugin-jsdoc'

export default [
  ...expoConfig,
  js.configs.recommended,
  ...configs.recommended,

  // Настройки для всех файлов с React и TypeScript
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      unicorn: pluginUnicorn,
      jsdoc: jsdoc,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Prettier
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
          endOfLine: 'auto',
        },
      ],

      // Unicorn
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/prevent-abbreviations': 'off', // полезно отключить для React проектов

      // Общие правила
      'no-console': 'warn',
      'no-debugger': 'error',

      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
        },
      ],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
    },
  },

  // Игнорируем сборки и выходные директории
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },
]
