import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/', '.next/', 'storybook-static/', '.swc/']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      react: {
        version: '19.0'
      }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  },
  {
    files: ['**/*.stories.*'],
    plugins: {
      storybook
    },
    rules: {
      ...storybook.configs.recommended.rules
    }
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-floating-promises': 'off'
    }
  },
  prettier
);
