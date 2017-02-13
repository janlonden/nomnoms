const initial = {
  _id: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  photo: ''
}

const user = (state = initial, {type, payload}) => {
  switch (type) {
    case 'set_user': {
      return payload
    }

    case 'clear_user': {
      return initial
    }

    default: {
      return state
    }
  }
}

export default user
