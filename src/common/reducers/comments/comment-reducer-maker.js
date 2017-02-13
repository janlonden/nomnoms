const initial = {
  text: '',
  error: '',
  requesting: false
}

const commentReducerMaker = what => (state = initial, {type, payload}) => {
  switch (type) {
    case `set_${what}_comment`: {
      return {... state, ... payload}
    }

    case `set_${what}_comment_text`: {
      return {
        ... state, text: payload ? payload : '',
        error: payload ? '' : state.error
      }
    }

    case `set_${what}_comment_error`: {
      return {... state, error: payload}
    }

    case `set_${what}_comment_requesting`: {
      return {... state, requesting: payload ? true : false}
    }

    case `clear_${what}_comment`: {
      return initial
    }

    default: {
      return state
    }
  }
}

export default commentReducerMaker
