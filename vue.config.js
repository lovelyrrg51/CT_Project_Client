module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,

    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',

    //  devServer: {
    //      proxy: 'http://172.17.135.161:8000',
    //      hot: true,
    //      disableHostCheck: true,
    //  }
}