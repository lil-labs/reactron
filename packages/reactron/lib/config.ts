type ReactronConfig = {
  main: {
    cwd?: string
    dev: string
    build: string
  }
  renderer: {
    cwd?: string
    dev: string
    build: string
  }
  resources?: string
}

type ReactronResultConfig = {
  main: {
    cwd: string
    dev: string
    build: string
  }
  renderer: {
    cwd: string
    dev: string
    build: string
  }
  resources?: string
}

export const defineConfig = (config: ReactronConfig): ReactronResultConfig => {
  return {
    ...config,
    main: {
      cwd: config.main.cwd || '.',
      ...config.main,
    },
    renderer: {
      cwd: config.renderer.cwd || '.',
      ...config.renderer,
    },
  }
}
