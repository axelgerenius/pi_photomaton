module.exports = {
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      minimize: false
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].minify = false;
      return args;
    });
  }
};
