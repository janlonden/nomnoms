const stylus = require('stylus')

module.exports = {
  extensions: ['.styl'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',

  preprocessCss: function (css, filename) {
    return stylus(css)
      .set('filename', filename)
      .render()
  }
}
