const path = require('path');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
	configureWebpack: {
    resolve:{
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '~c': path.resolve(__dirname, 'src/components'),
        '~v': path.resolve(__dirname, 'src/views'),
        '~s': path.resolve(__dirname, 'src/store'),
        '~h': path.resolve(__dirname, 'src/helpers'),
        '~r': path.resolve(__dirname, 'src/router')
      }
    }
	}
}