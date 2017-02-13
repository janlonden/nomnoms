const initial = {
  responsive: false,
  responsiveNavActive: false,
  userNavActive: false
}

const nav = (state = initial, {type, payload}) => {
  switch (type) {
    case 'set_nav_responsive': {
      return {... state, responsive: payload ? true : false}
    }

    case 'set_nav_responsive_active': {
      return {... state, responsiveNavActive: payload ? true : false}
    }

    case 'set_nav_user_active': {
      return {... state, userNavActive: payload ? true : false}
    }

    default: {
      return state
    }
  }
}

export default nav
