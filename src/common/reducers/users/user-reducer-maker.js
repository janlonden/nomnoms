const initial = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatedPassword: '',
  photo: '',
  photoError: '',
  uploading: false,
  requesting: false,
  message: '',
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
}

const userReducerMaker = what => (state = initial, {type, payload}) => {
  switch (type) {
    case `set_${what}_user`: {
      return {... state, ... payload}
    }

    case `set_${what}_user_field`: {
      const {name, value} = payload
      const newState = {... state}

      if (value && name !== 'repeatedPassword') {
        newState.errors[name] = ''
      }

      if (value && name === 'repeatedPassword') {
        newState.errors.password = ''
      }

      newState[name] = value

      return newState
    }

    case `set_${what}_user_message`: {
      return {... state, message: payload}
    }

    case `set_${what}_user_uploading`: {
      return {... state, uploading: payload ? true : false}
    }

    case `set_${what}_user_requesting`: {
      return {... state, requesting: payload ? true : false}
    }

    case `set_${what}_user_photo`: {
      return {... state, photo: payload ? payload : ''}
    }

    case `set_${what}_user_photo_error`: {
      return {... state, photoError: payload ? payload : ''}
    }

    case `set_${what}_user_errors`: {
      return {... state, errors: payload}
    }

    case `clear_${what}_user`: {
      return initial
    }

    default: {
      return state
    }
  }
}

export default userReducerMaker
