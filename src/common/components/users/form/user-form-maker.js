import {isEmail, trim} from 'validator'
import React, {PropTypes} from 'react'

import PhotoUpload from 'common/components/forms/photo-upload'

const userFormMaker = what =>
  ({dispatch, newUser, request, updateUser, userId}) => {

  const isNew = what === 'new'
  const isUpdate = what === 'update'
  const fields = isNew ? newUser : updateUser

  const {
    firstName,
    lastName,
    email,
    password,
    repeatedPassword,
    photo,
    photoError,
    uploading,
    requesting,
    message,
    errors
  } = fields

  const onChange = ({target}) => {
    const {name, value} = target

    dispatch(`set_${what}_user_field`, {name, value})
  }

  const onSubmit = event => {
    event.preventDefault()

    if (checkAndSetErrors() || uploading) {
      return
    }

    const handler = isUpdate ? 'updateUser' : 'newUser'

    const userPayload = {
      firstName: trim(firstName),
      lastName: trim(lastName),
      email: trim(email),
      password: trim(password),
      photo
    }

    if (isUpdate) {
      userPayload._id = userId
    }

    dispatch(`set_${what}_user_requesting`, true)

    request(handler, userPayload)
      .then(({status, payload}) => {
        if (status === 'success') {
          if (isUpdate) {
            console.log(payload.message)

            userPayload.fullName =
              `${userPayload.firstName} ${userPayload.lastName}`

            dispatch('set_user', {... userPayload, password: ''})
            dispatch('clear_update_user')
          } else {
            dispatch('set_user', payload.data)
            dispatch('clear_new_user')
          }

          dispatch('clear_input')
        }

        if (status === 'error') {
          dispatch(`set_${what}_user_message`, payload)
        }

        dispatch(`set_${what}_user_requesting`, false)
      })

      .catch(err => {
        console.log(err)

        dispatch(`set_${what}_user_requesting`, false)
      })
  }

  const checkAndSetErrors = () => {
    const errors = {
      firstName: ! firstName ? 'Förnamn måste fyllas i.' : '',
      lastName: ! lastName ? 'Efternamn måste fyllas i.' : '',

      email: ! email
        ? 'Epost måste fyllas i.'
        : ! isEmail(trim(email))
          ? 'Epost är inte giltigt.'
          : '',

      password: ! password && isNew
        ? 'Lösenord måste fyllas i.'
        : password && ! repeatedPassword
          ? 'Upprepa lösenordet.'
          : password !== repeatedPassword
            ? 'Lösenorden matchar inte varandra.'
            : ''
    }

    dispatch(`set_${what}_user_errors`, errors)

    return Object.keys(errors).some(error => errors[error])
  }

  if (uploading && photoError) {
    dispatch('set_update_user_photo_error', '')
  }

  const formHasErrors = () =>
    Object
      .keys(errors)
      .some(error => {
        if (error === 'password') {
          return false
        }

        return errors[error] && errors[error] !== 'initial'
      })

  return (
    <section styleName="root">
      <h2 styleName="heading">
        {isUpdate ? 'Användardetaljer' : 'Registrera'}
      </h2>

      <form onSubmit={onSubmit} styleName="form">
        {Boolean(isUpdate) &&
          <section>
            <PhotoUpload
              dispatch={dispatch}
              isUpdate={isUpdate}
              photo={photo}
              photoError={photoError}
              request={request}
              uploading={uploading}
              what="user"
            />
          </section>
        }

        <section styleName="input-section user-section">
          {errors.firstName && errors.firstName !== 'initial' &&
            <p styleName="error">{errors.firstName}</p>
          }

          <label htmlFor="first-name-input">
            <span className="hidden">Förnamn</span>
          </label>

          <input
            id="first-name-input"
            name="firstName"
            onChange={onChange}
            placeholder="Förnamn"
            styleName="input-text"
            type="text"
            value={firstName}
          />
        </section>

        <section styleName="input-section user-section">
          {errors.lastName && errors.lastName !== 'initial' &&
            <p styleName="error">{errors.lastName}</p>
          }

          <label htmlFor="last-name-input">
            <span className="hidden">Efternamn</span>
          </label>

          <input
            id="last-name-input"
            name="lastName"
            onChange={onChange}
            placeholder="Efternamn"
            styleName="input-text"
            type="text"
            value={lastName}
          />
        </section>

        <section styleName="input-section email-section">
          {errors.email && errors.email !== 'initial' &&
            <p styleName="error">{errors.email}</p>
          }

          <label htmlFor="email-input">
            <span className="hidden">E-post</span>
          </label>

          <input
            id="email-input"
            name="email"
            onChange={onChange}
            placeholder="E-post"
            styleName="input-text"
            type="email"
            value={email}
          />
        </section>

        <section styleName="input-section password-section">
          {errors.password && errors.password !== 'initial' &&
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

        <section styleName="input-section password-section">
          <label htmlFor="password-repeat-input">
            <span className="hidden">Upprepa lösenord</span>
          </label>

          <input
            id="password-repeat-input"
            name="repeatedPassword"
            onChange={onChange}
            placeholder="Upprepa lösenord"
            styleName="input-text"
            type="password"
            value={repeatedPassword}
          />
        </section>

        <section styleName="submit-section">
          {message && <p styleName="error">{message}</p>}

          <button styleName={
            'button'

            + (isUpdate ? ' update' : ' new')
            + ((requesting || uploading) ? ' requesting' : '')
          }>
            <span>
              {uploading
                ? 'Laddar upp foto'
                : isUpdate
                  ? requesting ? 'Sparar' : 'Spara'
                  : requesting ? 'Registrerar' : 'Registrera'
              }
            </span>
          </button>
        </section>
      </form>
    </section>
  )
}

export default userFormMaker
