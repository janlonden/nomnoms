import {isEmail, trim} from 'validator'
import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './login.styl'

const LoginForm = ({login, dispatch, request}) => {
  const {email, password, errors, message, requesting} = login

  const onChange = ({target}) => {
    const {name, value} = target

    dispatch('set_login_field', {name, value})
  }

  const onSubmit = event => {
    event.preventDefault()

    if (requesting) {
      return
    }

    if (checkAndSetErrors()) {
      return
    }

    const payload = {
      email: trim(email),
      password: trim(password)
    }

    dispatch('set_login_requesting', true)

    request('login', payload)
      .then(({status, payload}) => {
        if (status === 'success') {
          dispatch('set_user', payload.data)
          dispatch('clear_input')
          dispatch('clear_login')
        }

        if (status === 'error') {
          dispatch('set_login_message', payload)
        }

        dispatch('set_login_requesting', false)
      })

      .catch(err => {
        console.log(err)

        dispatch('set_login_requesting', false)
      })
  }

  const checkAndSetErrors = () => {
    const errors = {
      email: ! email
        ? 'Epost måste fyllas i.'
        : ! isEmail(trim(email))
          ? 'Epost är inte giltigt.'
          : '',

      password: ! password ? 'Lösenord måste fyllas i.' : ''
    }

    dispatch(`set_login_errors`, errors)

    return Object.keys(errors).some(error => errors[error])
  }

  return (
    <section styleName="root">
      <h2 styleName="heading">Logga in</h2>

      <form onSubmit={onSubmit} styleName="form">
        <section styleName="input-section email-section">
          {errors.email &&
            <p styleName="error">{errors.email}</p>
          }

          <label htmlFor="email-input">
            <span className="hidden">E-post</span>
          </label>

          <input
            id="email-input"
            name="email"
            onChange={onChange}
            placeholder="Epost"
            styleName="input-text"
            type="email"
            value={email}
          />
        </section>

        <section styleName="input-section password-section">
          {errors.password &&
            <p styleName="error">{errors.password}</p>
          }

          <label htmlFor="password-input">
            <span className="hidden">Lösenord</span>
          </label>

          <input
            id="password-input"
            name="password"
            onChange={onChange}
            placeholder="Lösenord"
            styleName="input-text"
            type="password"
            value={password}
          />
        </section>

        <section styleName="submit-section">
          {message && <p styleName="error">{message}</p>}

          <button styleName={`button ${requesting ? 'requesting' : ''}`}>
            <span>{requesting ? 'Loggar in' : 'Logga in'}</span>
          </button>
        </section>
      </form>
    </section>
  )
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired
}

export default CSSModules(LoginForm, styles, {allowMultiple: true})
