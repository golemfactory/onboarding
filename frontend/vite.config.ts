import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development'
  console.log('using version', process?.env?.npm_package_version)
  return {
    define: {
      APP_VERSION: JSON.stringify(process?.env?.npm_package_version),
    },
    base: '/onboarding#/',
    plugins: [react()],
    resolve: {
      alias: {
        app: resolve(__dirname, 'src', 'app'),
        components: resolve(__dirname, 'src', 'components'),
        hooks: resolve(__dirname, 'src', 'hooks'),
        state: resolve(__dirname, 'src', 'state'),
        utils: resolve(__dirname, 'src', 'utils'),
        ethereum: resolve(__dirname, 'src', 'ethereum'),
        types: resolve(__dirname, 'src', 'types'),
        assets: resolve(__dirname, 'src', 'assets'),
        settings: resolve(__dirname, 'src', 'settings'),
        themes: resolve(__dirname, 'src', 'themes'),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? '[name]__[local]__[hash:base64:5]'
          : '[hash:base64:5]',
      },
    },
  }
})
