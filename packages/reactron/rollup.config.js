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
    banner: '#!/usr/bin/env node',
    inlineDynamicImports: true,
  },
  external,
  ...baseOptions,
})

export default [
  cli('lib/reactron.ts', 'bin/reactron.js', 'esm', ['commander']),
  cli('lib/reactron-dev.ts', 'bin/reactron-dev.js', 'esm'),
  cli('lib/reactron-build.ts', 'bin/reactron-build.js', 'esm'),
]
