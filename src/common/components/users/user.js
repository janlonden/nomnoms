import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import request from 'common/functions/request'

import styles from './user.styl'

import UserComments from 'common/components/comments/user-comments'
import UserRecipes from 'common/components/recipes/user-recipes'

const User = ({user, dispatch, userComments, userRecipes}) => {
  const {_id: userId} = user

  const setInput = (input, _id) => event => {
    event.preventDefault()

    const {target} = event

    if (input === 'updateRecipe') {
      const recipe = userRecipes.items.find(recipe => recipe._id === _id)

      dispatch('set_update_recipe', recipe)
    }

    if (input === 'updateComment') {
      const comment = userComments.items.find(comment => comment._id === _id)

      dispatch('set_update_comment', comment)
    }

    if (input === 'updateUser') {
      dispatch('set_update_user', user)
    }

    if (input === 'removeRecipe') {
      dispatch('set_confirm', {
        item: 'recipe',
        _id,
        authorId: userId
      })
    }

    if (input === 'removeComment') {
      dispatch('set_confirm', {
        item: 'comment',
        _id,
        authorId: userId
      })
    }

    dispatch('set_input', input)
  }

  return ! userId
    ? <main styleName="root center">
        <h2 styleName="alt-heading">
          Logga in eller registrera för att få åtkomst till denna sida.
        </h2>
      </main>
    : <main styleName="root">
        {userRecipes.active &&
          <UserRecipes
            dispatch={dispatch}
            recipesActive={userRecipes.active}
            request={request}
            setInput={setInput}
            user={user}
            userItems={userRecipes}
          />
        }

        {userComments.active &&
          <UserComments
            commentsActive={userComments.active}
            dispatch={dispatch}
            request={request}
            setInput={setInput}
            user={user}
            userItems={userComments}
          />
        }
      </main>
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  userComments: PropTypes.object.isRequired,
  userRecipes: PropTypes.object.isRequired
}

const stateToProps = state => ({
  user: state.user,
  userComments: state.userComments,
  userRecipes: state.userRecipes
})

const dispatchToProps = dispatch => ({
  dispatch (type, payload) {
    dispatch({type, payload})
  }
})

export default connect(stateToProps, dispatchToProps)(
  CSSModules(User, styles, {allowMultiple: true})
)
