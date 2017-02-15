import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import functional from 'react-functional'
import React, {PropTypes} from 'react'

import request from 'common/functions/request'

import styles from './user-input.styl'

import Confirm from 'common/components/confirm/confirm'
import Login from 'common/components/users/form/login'
import NewComment from 'common/components/comments/form/new-comment'
import NewRecipe from 'common/components/recipes/form/new-recipe'
import NewUser from 'common/components/users/form/new-user'
import UpdateComment from 'common/components/comments/form/update-comment'
import UpdateRecipe from 'common/components/recipes/form/update-recipe'
import UpdateUser from 'common/components/users/form/update-user'

const UserInput = ({
  confirm,
  dispatch,
  input,
  login,
  newComment,
  newRecipe,
  newUser,
  recipe,
  updateComment,
  updateRecipe,
  updateUser,
  user
}) => {
  const close = event => {
    event.preventDefault()

    dispatch('clear_input')
    dispatch('clear_confirm')
  }

  const inputComponents = {
    removeComment:
      <Confirm
        dispatch={dispatch}
        confirm={confirm}
      />,

    removeRecipe:
      <Confirm
        dispatch={dispatch}
        confirm={confirm}
      />,

    newRecipe:
      <NewRecipe
        dispatch={dispatch}
        newRecipe={newRecipe}
        request={request}
        user={user}
      />,

    updateRecipe:
      <UpdateRecipe
        dispatch={dispatch}
        request={request}
        updateRecipe={updateRecipe}
        user={user}
      />,

    updateComment:
      <UpdateComment
        recipeId={updateRecipe._id}
        dispatch={dispatch}
        request={request}
        updateComment={updateComment}
        user={user}
      />,

    login:
      <Login
        dispatch={dispatch}
        login={login}
        request={request}
      />,

    newUser:
      <NewUser
        dispatch={dispatch}
        newUser={newUser}
        request={request}
        userId={user._id}
      />,

    updateUser:
      <UpdateUser
        dispatch={dispatch}
        request={request}
        updateUser={updateUser}
        userId={user._id}
      />
  }

  return input
    ? <section styleName="root">
        <a href="#" styleName="close" onClick={close}>
          <span className="hidden">Stäng</span>
        </a>
        <div styleName="user-input-section">{inputComponents[input]}</div>
      </section>
    : null
}

UserInput.propTypes = {
  confirm: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  login: PropTypes.object.isRequired,
  newComment: PropTypes.object.isRequired,
  newRecipe: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  updateComment: PropTypes.object.isRequired,
  updateRecipe: PropTypes.object.isRequired,
  updateUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const stateToProps = state => ({
  confirm: state.confirm,
  input: state.input,
  login: state.login,
  newComment: state.newComment,
  newRecipe: state.newRecipe,
  newUser: state.newUser,
  recipe: state.recipe,
  updateComment: state.updateComment,
  updateRecipe: state.updateRecipe,
  updateUser: state.updateUser,
  user: state.user
})

const dispatchToProps = dispatch => ({
  dispatch (type, payload) {
    dispatch({type, payload})
  }
})

const lifeCycleMethods = {
  componentDidUpdate (props) {
    const app = document.querySelector('#app')

    if (props.input) {
      app.classList.add('user-input-state')
    } else {
      app.classList.remove('user-input-state')
    }
  },

  componentDidMount (props) {
    const {dispatch} = props

    window.addEventListener('keydown', event => {
      if (event.keyCode === 27) {
        dispatch('clear_input')
        dispatch('clear_confirm')
      }
    })
  }
}

export default connect(stateToProps, dispatchToProps)(functional(
  CSSModules(UserInput, styles, {allowMultiple: true}),
  lifeCycleMethods
))
