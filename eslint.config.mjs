// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  includeIgnoreFile,
  fixupConfigRules,
  fixupPluginRules,
} from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(compat.extends('airbnb')),
  ...fixupConfigRules(compat.extends('airbnb/hooks')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...fixupConfigRules(compat.extends('plugin:prettier/recommended')),
  {
    plugins: {
      prettier: fixupPluginRules(prettier),
    },
    rules: {
      'no-underscore-dangle': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      'class-methods-use-this': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'import/extensions': ['error', { tsx: 'never' }],
      'import/order': [
        'error',
        {
          groups: [
            'index',
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: '*.+(css|svg)',
              group: 'type',
              position: 'after',
              patternOptions: {
                matchBase: true,
              },
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
);
