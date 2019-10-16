const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  devServer: {
    hot: false,
    inline: false,
    disableHostCheck: true,
  },
  configureWebpack: {
    plugins: [new WriteFilePlugin()],
  },
}
