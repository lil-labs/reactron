import { $ } from 'execa'

const $$ = $({
  stdio: 'inherit',
  env: { NODE_ENV: 'production', LEFTHOOK: '0' },
})

await $$`lerna publish`
