import { Command } from 'commander'

const program = new Command()

program.name('reactron').description('⚡ React + Electron ⚡')

program.command('dev', { isDefault: true }).action(() =>
  import('./reactron-dev').then(({ reactronDev }) => {
    reactronDev()
  })
)

program.command('build').action(() =>
  import('./reactron-build').then(({ reactronBuild }) => {
    reactronBuild()
  })
)

program.parse()
