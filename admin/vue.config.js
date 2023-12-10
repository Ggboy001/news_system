const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    },
    proxy: {
      '/adminapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }

    }
  }
})
