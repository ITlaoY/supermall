module.export = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/acomponents',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}