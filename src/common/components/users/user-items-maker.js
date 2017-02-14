import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/switchMap'
import {Subject} from 'rxjs/Subject'

import functional from 'react-functional'
import React, {PropTypes} from 'react'

import Spinner from 'common/components/spinner/spinner'
import userComment from 'common/components/comments/user-comment'
import userRecipe from 'common/components/recipes/user-recipe'

import NoSearchResults from
  'common/components/no-search-results/no-search-results'

const userItemsMaker = what => {
  const isRecipes = what === 'recipes'

  const Component = ({
    dispatch, request, setInput, user, userItems, recipesActive, commentsActive
  }) => {
    const {
      hasItems,
      isSearching,
      isSorting,
      items,
      query,
      sort,
      sortNavActive,
      total
    } = userItems

    const authorId = user._id

    const onQueryChange = ({target}) => {
      const {value} = target

      dispatch(`set_user_${what}_query`, value)
    }

    const onSortClick = event => {
      event.preventDefault()
    }

    let timeout

    const openSortNav = () => {
      clearTimeout(timeout)

      if (! sortNavActive) {
        dispatch(`set_user_${what}_sort_nav_active`, true)
      }
    }

    const sortNavTimeout = () => {
      timeout = setTimeout(() => {
        dispatch(`set_user_${what}_sort_nav_active`, false)
      }, 500)
    }

    const changeSort = event => {
      event.preventDefault()

      const value = event.target.innerHTML

      dispatch(`set_user_${what}_sort`, value)
      dispatch(`set_user_${what}_sort_nav_active`, false)
    }

    const setSection = section => event => {
      event.preventDefault()

      if (section === 'recipes') {
        dispatch('set_user_comments_active', false)
        dispatch('set_user_recipes_active', true)
      } else {
        dispatch('set_user_recipes_active', false)
        dispatch('set_user_comments_active', true)
      }
    }

    const addItems = event => {
      event.preventDefault()

      const find = {authorId, query}
      const limit = query ? items.length + 19 : 20
      const skip = query ? items.length - 1 : items.length

      const sortValues = {
        'Nya först': {createdAt: -1},
        'Gamla först': {createdAt: 1},
        'Populäritet': {likes: -1},
        'Från A till Ö': {title: 1},
        'Från Ö till A': {title: -1}
      }

      request(`get${isRecipes ? 'Recipes' : 'Comments'}`, {
        find, limit, skip, sort: sortValues[sort]
      })
        .then(({status, payload}) => {
          if (status === 'success') {
            dispatch(`add_user_${what}`, payload.data)

            dispatch(
              `set_user_${what}_total`, payload.total ? payload.total : 0
            )
          }

          if (status === 'error') {
            console.log(payload)
          }
        })

        .catch(err => {
          console.log(err)
        })
    }

    const clearQuery = event => {
      event.preventDefault()

      dispatch(`clear_user_${what}_query`)
    }

    const renderItems = () => {
      if (isSearching) {
        return (
          <div styleName="box"><Spinner/></div>
        )
      }

      else if (query && ! isSearching && ! items.length) {
        return (
          <div styleName="box">
            <NoSearchResults
              what={isRecipes ? 'recept' : 'kommentarer'}
              query={query}
            />
          </div>
        )
      }

      else if (items.length) {
        return items.map((item, index) => isRecipes
          ? userRecipe(item, index, setInput)
          : userComment(item, index, setInput)
        )
      }

      else {
        return (
          <div styleName="box no-items">
            <h2>Inga {isRecipes ? 'recept' : 'kommentarer'} än.</h2>
          </div>
        )
      }
    }

    return (
      <section styleName={`boxes ${commentsActive ? 'comments' : ''}`}>
        <h2 className="hidden">Min sida</h2>

        <header styleName="box filter">
          <ul styleName="section-nav">
            <li>
              <a
                href="#"
                styleName={`recipes-link ${recipesActive ? 'active' : ''}`}
                onClick={setSection('recipes')}
              >
                Mina recept
              </a>
            </li>

            <li>
              <a
                href="#"
                styleName={`comments-link ${commentsActive ? 'active' : ''}`}
                onClick={setSection('comments')}
              >
                Mina kommentarer
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={setInput('updateUser')}
                styleName="update-user-link"
              >
                Användardetaljer
              </a>
            </li>
          </ul>

          <div styleName="search-sort">
            <label className="hidden" htmlFor={`${what}-search-input`}>
              Sök {isRecipes ? 'recept' : 'kommentarer'}
            </label>

            <div styleName="search">
              <input
                id={`${what}-search-input`}
                name="query"
                onChange={onQueryChange}
                placeholder={`Sök ${isRecipes ? 'recept' : 'kommentarer'}`}
                styleName="input-text"
                type="text"
                value={query}
              />

              <a
                href="#"
                onClick={clearQuery}
                styleName={`clear-search ${query.length ? 'visible' : ''}`}
              >
                Avbryt sökning
              </a>
            </div>

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
                {isRecipes
                  ? <div>
                      <li><a href="#" onClick={changeSort}>Nya först</a></li>

                      <li>
                        <a href="#" onClick={changeSort}>Gamla först</a>
                      </li>

                      <li>
                        <a href="#" onClick={changeSort}>Populäritet</a>
                      </li>

                      <li>
                        <a href="#" onClick={changeSort}>Från A till Ö</a>
                      </li>

                      <li>
                        <a href="#" onClick={changeSort}>Från Ö till A</a>
                      </li>
                    </div>
                  : <div>
                      <li><a href="#" onClick={changeSort}>Nya först</a></li>

                      <li>
                        <a href="#" onClick={changeSort}>Gamla först</a>
                      </li>
                    </div>
                }
              </ul>
            </div>
          </div>
        </header>

        {renderItems()}

        {items.length < total &&
          <div styleName="box">
            <a
              href="#"
              onClick={addItems}
              styleName="button more-link"
            >
              <span>Visa fler</span>
            </a>
          </div>
        }
      </section>
    )
  }

  const getItems = ({dispatch, user, userItems, request}) => {
    const find = {authorId: user._id, query: userItems.query}
    const limit = 20
    const skip = 0

    const sortValues = {
      'Nya först': {createdAt: -1},
      'Gamla först': {createdAt: 1},
      'Populäritet': {likes: -1},
      'Från A till Ö': {title: 1},
      'Från Ö till A': {title: -1}
    }

    return request(`get${isRecipes ? 'Recipes' : 'Comments'}`, {
      find, limit, skip, sort: sortValues[userItems.sort]
    })
  }

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
          promise$.next(getItems(props))
        })

      query$
        .debounceTime(500)
        .subscribe(props => {
          promise$.next(getItems(props))
        })

      promise$
        .switchMap(promise => promise)
        .subscribe(({status, payload}) => {
          if (status === 'success') {
            dispatch(`set_user_${what}`, payload.data)
            dispatch(`set_user_${what}_total`, payload.total)
          }

          if (status === 'error') {
            console.log(payload)
          }

          dispatch(`set_user_${what}_sorting`, false)
          dispatch(`set_user_${what}_searching`, false)
        })

      promise$.next(getItems(props))
    },

    componentDidUpdate (props, prevProps) {
      const {dispatch, userItems} = props

      if (props.userItems.sort !== prevProps.userItems.sort) {
        if (! userItems.isSorting) {
          dispatch(`set_user_${what}_sorting`, true)
        }

        sort$.next(props)
      }

      if (props.userItems.query !== prevProps.userItems.query) {
        if (! userItems.isSearching) {
          dispatch(`set_user_${what}_searching`, true)
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

  Component.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  return functional(Component, lifeCycleMethods)
}

export default userItemsMaker
