import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import request from 'common/functions/request'

import styles from './likes.styl'

const Likes = ({
  _id,
  classes = '',
  dispatch,
  likers,
  span,
  userId
}) => {
  const likeRecipe = event => {
    event.preventDefault()

    if (! userId) {
      return
    }

    dispatch('like_recipe', userId)
    dispatch('like_all_recipes_recipe', {_id, userId})
    dispatch('like_popular_recipes_recipe', {_id, userId})
    dispatch('like_recent_recipes_recipe', {_id, userId})

    request('likeRecipe', {_id, userId})
      .then(({status, payload}) => {
        if (status === 'success') {
          console.log(payload.message)
        }

        if (status === 'error') {
          console.log(payload)
        }
      })

      .catch(err => {
        console.log(err)
      })
  }

  const likedClass = userId
    ? likers.some(liker => liker === userId) ? 'liked' : ''
    : ''

  const hasLikesClass = likers.length ? 'has-likes' : ''

  return span
    ? <span styleName={`root ${hasLikesClass} ${classes}`}>
        {Boolean(likers.length) && likers.length}
        <span className="hidden"> likes</span>
      </span>
    : <a
        href="#"
        onClick={likeRecipe}
        styleName={`root link ${likedClass} ${hasLikesClass} ${classes}`}
      >
        {Boolean(likers.length) && likers.length}
        <span className="hidden"> likes</span>
      </a>
}

Likes.propTypes = {
  _id: PropTypes.string.isRequired,
  classes: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  likers: PropTypes.array.isRequired,
  span: PropTypes.bool,
  userId: PropTypes.string
}

const stateToProps = state => ({
  userId: state.user._id
})

const dispatchToProps = dispatch => ({
  dispatch (type, payload) {
    dispatch({type, payload})
  }
})

export default connect(stateToProps, dispatchToProps)(
  CSSModules(Likes, styles, {allowMultiple: true})
)
