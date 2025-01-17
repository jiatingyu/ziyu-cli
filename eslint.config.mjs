import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignorePatterns: ['./lib',"./types"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: { project: ['tsconfig.json'] },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      'no-useless-escape': 0,
    },
  },
]
