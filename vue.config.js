const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [new WriteFilePlugin()],
  },
}
