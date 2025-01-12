import { $ } from 'execa'

const $$ = $({
  stdio: 'inherit',
  env: { NODE_ENV: 'production', LEFTHOOK: '0' },
})

await $$`LEFTHOOK=0 lerna publish`
