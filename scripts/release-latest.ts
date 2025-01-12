import { $ } from 'execa'

const $$ = $({ stdio: 'inherit' })

await $$`lerna publish`
