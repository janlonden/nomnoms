import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/switchMap'
import {Subject} from 'rxjs/Subject'

import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import functional from 'react-functional'
import React, {PropTypes} from 'react'
import renderHTML from 'react-render-html'

import request from 'common/functions/request'

import RecipeArticles from 'common/components/recipes/recipe-articles'
import Spinner from 'common/components/spinner/spinner'

import NoSearchResults from
  'common/components/no-search-results/no-search-results'

import styles from './recipes.styl'

const Recipes = ({query, dispatch, allRecipes, user}) => {
  const {
    hasFetched, isSorting, isSearching, recipes, sort, sortNavActive, total
  } = allRecipes

  const {_id: userId} = user

  const addRecipes = event => {
    event.preventDefault()

    const find = query ? {query} : {}
    const limit = query ? recipes.length + 19 : 20
    const skip = query ? recipes.length - 1 : recipes.length

    const sortValues = {
      'Nya först': {createdAt: -1},
      'Gamla först': {createdAt: 1},
      'Populäritet': {likes: -1},
      'Från A till Ö': {title: 1},
      'Från Ö till A': {title: -1}
    }

    request('getRecipes', {find, limit, skip, sort: sortValues[sort]})
      .then(({status, payload}) => {
        if (status === 'success') {
          dispatch('add_all_recipes', payload.data)
          dispatch('set_all_recipes_total', payload.total ? payload.total : 0)
        }

        if (status === 'error') {
          console.log(payload)
        }
      })

      .catch(err => {
        console.log(err)
      })
  }

  const onSortClick = event => {
    event.preventDefault()
  }

  let timeout

  const openSortNav = () => {
    clearTimeout(timeout)

    if (! sortNavActive) {
      dispatch('set_all_recipes_sort_nav_active', true)
    }
  }

  const sortNavTimeout = () => {
    timeout = setTimeout(() => {
      dispatch('set_all_recipes_sort_nav_active', false)
    }, 500)
  }

  const changeSort = event => {
    event.preventDefault()

    const value = event.target.innerHTML

    dispatch('set_all_recipes_sort', value)
    dispatch('set_all_recipes_sort_nav_active', false)
  }

  const renderRecipes = () => {
    if (! hasFetched || isSearching) {
      return <div styleName="box"><Spinner/></div>
    }

    else if (query && ! isSearching && ! recipes.length) {
      return (
        <div styleName="box">
          <NoSearchResults what='recept' query={query} />
        </div>
      )
    }

    else {
      return RecipeArticles(recipes, userId)
    }
  }

  return (
    <main styleName="boxes">
      <section styleName="box filter center">
        <h2 styleName="heading">Recept</h2>

        <div styleName="sort">
          <a
            href="#"
            onClick={onSortClick}
            onMouseOut={sortNavTimeout}
            onMouseOver={openSortNav}

            styleName={
              'button open-sort-nav'
              + (sortNavActive ? ' active' : '')
              + (isSorting ? ' sorting' : '')
            }
          >
            <span>{sort}</span>
          </a>

          <ul
            onMouseOut={sortNavTimeout}
            onMouseOver={openSortNav}
            styleName={`sort-nav ${sortNavActive ? 'active' : ''}`}
          >
            <li><a href="#" onClick={changeSort}>Nya först</a></li>
            <li><a href="#" onClick={changeSort}>Gamla först</a></li>
            <li><a href="#" onClick={changeSort}>Populäritet</a></li>
            <li><a href="#" onClick={changeSort}>Från A till Ö</a></li>
            <li><a href="#" onClick={changeSort}>Från Ö till A</a></li>
          </ul>
        </div>
      </section>

      {renderRecipes()}

      {recipes.length >= 20 && recipes.length < total &&
        <section styleName="box">
          <a
            href="#"
            onClick={addRecipes}
            styleName="button more-link"
          >
            <span>Visa fler</span>
          </a>
        </section>
      }
    </main>
  )
}

const getRecipes = ({dispatch, allRecipes}) => {
  const find = {query: allRecipes.query}
  const limit = 20
  const skip = 0

  const sortValues = {
    'Nya först': {createdAt: -1},
    'Gamla först': {createdAt: 1},
    'Populäritet': {likes: -1},
    'Från A till Ö': {title: 1},
    'Från Ö till A': {title: -1}
  }

  return request('getRecipes', {
    find, limit, skip, sort: sortValues[allRecipes.sort]
  })
}

Recipes.propTypes = {
  allRecipes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

const stateToProps = state => ({
  allRecipes: state.allRecipes,
  query: state.allRecipes.query,
  user: state.user
})

const dispatchToProps = dispatch => ({
  dispatch (type, payload) {
    dispatch({type, payload})
  }
})

let sort$
let query$
let promise$

const lifeCycleMethods = {
  componentDidMount (props) {
    const {dispatch} = props

    sort$ = new Subject()
    query$ = new Subject()
    promise$ = new Subject()

    sort$
      .subscribe(props => {
        promise$.next(getRecipes(props))
      })

    query$
      .debounceTime(500)
      .subscribe(props => {
        promise$.next(getRecipes(props))
      })

    promise$
      .switchMap(promise => promise)
      .subscribe(({status, payload}) => {
        if (status === 'success') {
          dispatch('set_all_recipes', payload.data)
          dispatch('set_all_recipes_total', payload.total)
        }

        if (status === 'error') {
          console.log(payload)
        }

        dispatch('set_all_recipes_sorting', false)
        dispatch('set_all_recipes_searching', false)
      })

    promise$.next(getRecipes(props))
  },

  componentDidUpdate (props, prevProps) {
    const {dispatch, allRecipes} = props

    if (props.allRecipes.sort !== prevProps.allRecipes.sort) {
      if (! allRecipes.isSorting) {
        dispatch('set_all_recipes_sorting', true)
      }

      sort$.next(props)
    }

    if (props.allRecipes.query !== prevProps.allRecipes.query) {
      if (! allRecipes.isSearching) {
        dispatch('set_all_recipes_searching', true)
      }

      query$.next(props)
    }
  },

  componentWillUnmount () {
    sort$.unsubscribe()
    query$.unsubscribe()
    promise$.unsubscribe()
  }
}

export default connect(stateToProps, dispatchToProps)(functional(
  CSSModules(Recipes, styles, {allowMultiple: true}),
  lifeCycleMethods
))
