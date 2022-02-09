const path = require('path');
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/css/variables.scss";
            @import "@/assets/css/titles.scss";
            `,

      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname,'src'))
  },
  devServer: {
    disableHostCheck: true
  }
};
