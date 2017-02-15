import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import CSSModules from 'react-css-modules'
import functional from 'react-functional'
import React, {PropTypes} from 'react'
import renderHTML from 'react-render-html'

import request from 'common/functions/request'

import styles from './home.styl'

import RecipeArticles from 'common/components/recipes/recipe-articles'
import Spinner from 'common/components/spinner/spinner'

const Home = ({recentRecipes, popularRecipes, dispatch, userId}) => {
  const showAll = what => event => {
    event.preventDefault()

    dispatch('set_all_recipes_sort', what)
    dispatch('set_all_recipes_sorting', true)

    browserHistory.push('/recept')
  }

  return popularRecipes.recipes.length && recentRecipes.recipes.length
    ? <main styleName="boxes">
        <h2 styleName="box heading">Senast upplagda recept</h2>

        {RecipeArticles(recentRecipes.recipes, userId)}

        <section styleName="box">
          <a
            href="#"
            onClick={showAll('Nya först')}
            styleName="button more-link"
          >
            <span>Visa fler</span>
          </a>
        </section>

        <h2 styleName="box heading">Populära recept</h2>

        {RecipeArticles(popularRecipes.recipes, userId)}

        <section styleName="box">
          <a
            href="#"
            onClick={showAll('Populäritet')}
            styleName="button more-link"
          >
            <span>Visa fler</span>
          </a>
        </section>
      </main>
    : <main styleName="center"><Spinner/></main>
}

const getRecipes = ({dispatch}) => {
  const find = {}
  const limit = 8
  const skip = 0
  const recentlyAdded = {createdAt: -1}
  const popular = {likes: -1}

  request('getRecipes', {find, limit, skip, sort: recentlyAdded})
    .then(({status, payload}) => {
      if (status === 'success') {
        dispatch('set_recent_recipes', payload.data)
      }

      if (status === 'error') {
        console.log(payload)
      }
    })

    .catch(err => {
      console.log(err)
    })

// var today = moment().startOf('day')
// var tomorrow = moment(today).add(1, 'days')

// MyModel.find({
//   createdAt: {
//     $gte: today.toDate(),
//     $lt: tomorrow.toDate()
//   }
// })

  request('getRecipes', {find, limit, skip, sort: popular})
    .then(({status, payload}) => {
      if (status === 'success') {
        dispatch('set_popular_recipes', payload.data)
      }

      if (status === 'error') {
        console.log(payload)
      }
    })

    .catch(err => {
      console.log(err)
    })
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  popularRecipes: PropTypes.object.isRequired,
  recentRecipes: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

const stateToProps = state => ({
  popularRecipes: state.popularRecipes,
  recentRecipes: state.recentRecipes,
  userId: state.user._id
})

const dispatchToProps = dispatch => ({
  dispatch (type, payload) {
    dispatch({type, payload})
  }
})

const lifeCycleMethods = {
  componentDidMount (props) {
    getRecipes(props)
  }
}

export default connect(stateToProps, dispatchToProps)(functional(
  CSSModules(Home, styles, {allowMultiple: true}), lifeCycleMethods
))
