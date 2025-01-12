import { $ } from 'execa'

const $$ = $({ stdio: 'inherit', env: { NODE_ENV: 'production' } })

await $$`lerna publish`
