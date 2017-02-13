import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from './webpack.config.babel'

const bundler = webpack(webpackConfig)

browserSync({
  proxy: {
    target: '127.0.0.1:3000',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,

        stats: {
          colors: true
        }
      }),

      webpackHotMiddleware(bundler)
    ]
  },

  files: [
    'dist/main.css'
  ],

  port: 3001,
  notify: false,
  open: false
})
