import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import request from 'common/functions/request'

import styles from './confirm.styl'

const Confirm = ({dispatch, confirm}) => {
  const {item, _id, authorId, requesting} = confirm

  const clear = () => {
    dispatch('clear_confirm')
    dispatch('clear_input')
  }

  const cancel = event => {
    event.preventDefault()

    clear()
  }

  const remove = event => {
    event.preventDefault()

    if (requesting) {
      return
    }

    dispatch('set_confirm_requesting', true)

    if (item === 'recipe') {
      request('removeRecipe', {_id, authorId})
        .then(({status, payload}) => {
          if (status === 'success') {
            dispatch('clear_recipe')

            browserHistory.push('/jag')

            dispatch('del_recipe_recipe', _id)
            dispatch('del_user_recipe', _id)
          }

          if (status === 'error') {
            console.log(payload)
          }

          clear()
        })

        .catch(err => {
          console.log(err)

          clear()
        })
    }

    if (item === 'comment') {
      request('removeComment', {_id, authorId})
        .then(({status, payload}) => {
          if (status === 'success') {
            console.log(payload.message)

            dispatch('del_recipe_comment', _id)
            dispatch('del_user_comment', _id)
          }

          if (status === 'error') {
            console.log(payload)
          }

          clear()
        })

        .catch(err => {
          console.log(err)

          clear()
        })
    }
  }

  return (
    <div styleName="root">
      <p>
        {
          'Är du säker på att du vill ta bort '
          + (item === 'recipe' ? 'receptet' : 'kommentaren') + '?'
        }
      </p>

      <a
        href="#"
        onClick={remove}
        styleName={`button yes ${requesting ? 'requesting' : ''}`}
      >
        <span>{requesting ? 'Raderar' : 'Ja'}</span>
      </a>

      <a href="#" onClick={cancel}styleName="button no"><span>Nej</span></a>
    </div>
  )
}

Confirm.propTypes = {
  confirm: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const stateToProps = state => ({
  confirm: state.confirm
})

const dispatchToProps = dispatch => ({
  dispatch (type, payload) {
    dispatch({type, payload})
  }
})

export default connect(stateToProps, dispatchToProps)(CSSModules(
  Confirm, styles, {allowMultiple: true}
))
