import {isEmail, trim} from 'validator'

const initial = {
  email: '',
  password: '',
  message: '',
  requesting: false,
  errors: {
    email: '',
    password: ''
  }
}

const login = (state = initial, {type, payload}) => {
  switch (type) {
    case 'set_login_field': {
      const newState = {... state}
      const {name, value} = payload

      if (value) {
        newState.errors[name] = ''
      }

      newState[name] = value

      return newState
    }

    case 'set_login_message': {
      return {... state, message: payload}
    }

    case 'set_login_requesting': {
      return {... state, requesting: payload ? true : false}
    }

    case 'set_login_errors': {
      return {... state, errors: payload}
    }

    case 'clear_login': {
      return initial
    }

    default: {
      return state
    }
  }
}

export default login
