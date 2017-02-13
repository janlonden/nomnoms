import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './no-search-results.styl'

const NoSearchResults = ({what, query}) => {
  const queryWords = query
    .split(' ')
    .filter(word => word)
    .map(query => `"${query}"`)

  return (
    <h2 styleName="alt-heading">
      {`Inga ${what} hittades med ${
        queryWords.length > 1
          ? `nyckelorden ${queryWords.join(', ')}`
          : `nyckelordet ${queryWords}`
      }.`}
    </h2>
  )
}

NoSearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  what: PropTypes.string.isRequired
}

export default CSSModules(NoSearchResults, styles, {allowMultiple: true})
