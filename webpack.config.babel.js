import {resolve} from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import postcssAssets from 'postcss-assets'
import postcssCssnext from 'postcss-cssnext'
import webpack from 'webpack'

const production = process.env.NODE_ENV === 'production'

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
}

const entryFile = resolve('src/client/client.js')
const jsLoader = 'babel?presets[]=react,presets[]=es2015'

const cssLoader =
  'css?modules&importLoaders=1&localIdentName=' +
  '[name]__[local]___[hash:base64:5]!postcss!stylus'

const config = {
  node: {fs: 'empty'},

  entry: production
    ? entryFile
    : [
        entryFile,
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client'
      ],

  output: {
    path: resolve('dist'),
    publicPath: '/dist',
    filename: `bundle${production ? '' : '-dev'}.js`
  },

  plugins: production
    ? [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },

          comments: false
        }),

        new ExtractTextPlugin('main.css', {allChunks: true})
      ]
    : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ],

  devtool: ! production && 'cheap-module-eval-source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        loader: production ? jsLoader : `react-hot!${jsLoader}`
      },

      {
        test: /\.styl$/,
        include: [resolve('src/common')],

        // css-modules-require-hook !

        loader: production
          ? ExtractTextPlugin.extract('style', cssLoader)
          : `style!${cssLoader}`
      },

      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  postcss: [
    postcssCssnext(),
    postcssAssets()
  ]
}

export default config
