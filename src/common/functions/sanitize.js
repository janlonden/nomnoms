import sanitizeHtml from 'sanitize-html'

const sanitize = what =>
  sanitizeHtml(what, {
    allowedTags: [
      'a',
      'b',
      'br',
      'div',
      'i',
      's',
      'u'
    ],

    allowedAttributes: {
      'a': ['href']
    }
  })

export default sanitize
