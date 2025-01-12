import { $ } from 'execa'

process.env.NODE_ENV = 'production'

const $$ = $({
  stdio: 'inherit',
  // env: { NODE_ENV: 'production' },
})

await $$`lerna publish --force-publish`
