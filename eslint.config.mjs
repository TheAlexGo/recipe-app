// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile, fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignoresConfig = includeIgnoreFile(gitignorePath);
ignoresConfig.ignores.push('types/supabase.ts');

export default tseslint.config(
  ignoresConfig,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(compat.extends('airbnb')),
  ...fixupConfigRules(compat.extends('airbnb/hooks')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...fixupConfigRules(compat.extends('plugin:prettier/recommended')),
  eslintConfigPrettier,
  {
    rules: {
      camelcase: 'off',
      'no-return-await': 'off',
      'no-underscore-dangle': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'import/prefer-default-export': 'off',
      'react/button-has-type': 'off',
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      'no-undef': 'off',
      'class-methods-use-this': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          controlComponents: ['Input'],
        },
      ],
      'import/extensions': ['error', { tsx: 'never', json: 'ignorePackages' }],
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
