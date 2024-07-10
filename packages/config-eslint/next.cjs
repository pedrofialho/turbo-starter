const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

/** @type {import('eslint').ESLint.ConfigData['rules']} */
const rules = {
  'tailwindcss/no-custom-classname': 'off',
  'tailwindcss/classnames-order': 'off',

  'no-duplicate-imports': 'error',
  'import/order': [
    'error',
    {
      'newlines-between': 'always',
      distinctGroup: false,
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      groups:
        // ['builtin', 'external', 'parent', 'sibling', 'index'],
        [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      pathGroups: [
        {
          pattern: 'react',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: 'next',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: 'next/**',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: '@repo/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~/**',
          group: 'internal',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['react'],
    },
  ],
  'no-restricted-imports': [
    'error',
    {
      name: 'clsx',
      message: 'Use `cn` instead.',
    },
    {
      name: 'tailwind-merge',
      message: 'Use `cn` instead.',
    },
  ],
}

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc',
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:tailwindcss/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules,
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.ts',
    },
  },
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'next/core-web-vitals',
        'prettier',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        ...rules,

        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          {
            fixStyle: 'inline-type-imports',
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
        ],
      },
    },
  ],
}
