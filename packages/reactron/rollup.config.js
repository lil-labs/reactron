import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const cli = (input, output, format, external = []) => ({
  input,
  output: {
    file: output,
    format,
    inlineDynamicImports: true,
    banner: '#!/usr/bin/env node',
  },
  external,
  plugins: [typescript(), process.env.NODE_ENV === 'production' && terser()],
})

const lib = (input, output, format, external = []) => ({
  input,
  output: {
    file: output,
    format,
  },
  external,
  plugins: [typescript(), process.env.NODE_ENV === 'production' && terser()],
})

export default [
  cli('cli/reactron.ts', 'bin/reactron.js', 'esm', ['commander']),
  lib('lib/config.ts', 'dist/config.js', 'esm'),
]
