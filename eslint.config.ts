import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { files: ['**/*.{js,ts}'] },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig
)
