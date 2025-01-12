import { $ } from 'execa'

const $$ = $({
  stdio: 'inherit',
  env: { NODE_ENV: 'production', HUSKY_SKIP_HOOKS: 'true' },
})

await $$`lerna publish`
