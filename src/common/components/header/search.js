import {browserHistory} from 'react-router'
import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './search.styl'

let magnifyingGlass

const Search = ({pathname, query, isSearching, dispatch}) => {
  const onChange = ({target}) => {
    const {value} = target

    if (value && pathname !== '/recept') {
      dispatch('set_all_recipes', [])

      setTimeout(() => {
        browserHistory.push('/recept')
      }, 100)
    }

    dispatch('set_all_recipes_query', value)
  }

  const clearQuery = event => {
    event.preventDefault()

    dispatch('clear_all_recipes_query')
  }

  const onSearchFocus = () => {
    if (! magnifyingGlass) {
      magnifyingGlass = document.querySelector('.magnifying-glass-header')
    }

    magnifyingGlass.classList.add('magnifying-glass-hidden')
  }

  const onSearchBlur = () => {
    if (! query) {
      magnifyingGlass.classList.remove('magnifying-glass-hidden')
    }
  }

  return (
    <div styleName="root">
      <label className="hidden" htmlFor="search">Sök recept</label>

      <input
        id="search"
        name="query"
        onBlur={onSearchBlur}
        onChange={onChange}
        onFocus={onSearchFocus}
        styleName="input-text"
        type="text"
        value={query}
      />

      <span
        styleName="magnifying-glass"

        className={
          `magnifying-glass-header ${query ? 'magnifying-glass-hidden' : ''}`
        }
      >
      </span>

      <a
        href="#"
        onClick={clearQuery}
        styleName={`clear-search ${query ? ' visible' : ''}`}
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
