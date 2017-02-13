const initial = {
  requesting: false
}

const confirm = (state = initial, {type, payload}) => {
  switch (type) {
    case 'set_confirm': {
      return {... state, ... payload}
    }

    case 'set_confirm_requesting': {
      return {... state, requesting: payload ? true : false}
    }

    case 'clear_confirm': {
      return initial
    }

    default: {
      return state
    }
  }
}

export default confirm
