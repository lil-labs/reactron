import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const baseOptions = {
  plugins: [typescript(), process.env.NODE_ENV === 'production' && terser()],
}

const cli = (input, output, format, external = []) => ({
  input,
  output: {
    file: output,
    format,
    inlineDynamicImports: true,
    banner: '#!/usr/bin/env node',
  },
  external,
  ...baseOptions,
})

export default [cli('cli/reactron.ts', 'bin/reactron.js', 'esm', ['commander'])]
