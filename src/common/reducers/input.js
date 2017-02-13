const input = (state = '', {type, payload}) => {
  switch (type) {
    case 'set_input': {
      return payload ? payload : ''
    }

    case 'clear_input': {
      return ''
    }

    default: {
      return state
    }
  }
}

export default input
