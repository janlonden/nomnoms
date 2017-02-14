import {browserHistory} from 'react-router'
import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './search.styl'

const Search = ({pathname, query, isSearching, dispatch}) => {
  const onChange = ({target}) => {
    const {value} = target

    if (value && pathname !== '/recept') {
      browserHistory.push('/recept')
    }

    dispatch('set_all_recipes_query', value)
  }

  const clearQuery = event => {
    event.preventDefault()

    dispatch('clear_all_recipes_query')
  }

  return (
    <div styleName="root">
      <input
        name="query"
        onChange={onChange}
        placeholder="Sök recept"
        styleName="input-text"
        type="text"
        value={query}
      />

      <a
        href="#"
        onClick={clearQuery}
        styleName={`clear-search ${query.length ? ' visible' : ''}`}
      >
        Avbryt sökning
      </a>
    </div>
  )
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
}

export default CSSModules(Search, styles, {allowMultiple: true})
