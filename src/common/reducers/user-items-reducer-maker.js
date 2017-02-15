const shared = {
  hasFetched: false,
  active: false,
  isSearching: false,
  isSorting: false,
  items: [],
  query: '',
  sort: 'Nya först',
  sortNavActive: false,
  total: 0
}

const userItemsReducerMaker = what => {
  const isRecipes = what === 'recipes'
  const initial = {... shared, active: isRecipes ? true : false}

  return (state = initial, {type, payload}) => {
    switch (type) {
      case `set_user_${what}`: {
        return {
          ... state,
          items: payload,
          hasFetched: true
        }
      }

      case `add_user_${what}`: {
        return {... state, items: [... state.items, ... payload]}
      }

      case `set_user_${what}_total`: {
        return {... state, total: payload ? payload : 0}
      }

      case `set_user_${what}_active`: {
        return {... state, active: payload ? true : false}
      }

      case `set_user_${what}_sorting`: {
        return {... state, isSorting: payload ? true : false}
      }

      case `set_user_${what}_searching`: {
        return {... state, isSearching: payload ? true : false}
      }

      case `set_user_${isRecipes ? 'recipe' : 'comment'}`: {
        const newState = {... state}
        const index = state.items.findIndex(item => item._id === payload._id)

        if (index < 0) {
          return state
        }

        newState.items[index] = {
          ... state.items[index],
          ... payload
        }

        return newState
      }

      case `set_user_${what}_sort_nav_active`: {
        return {... state, sortNavActive: payload ? true : false}
      }

      case `set_user_${what}_sort`: {
        return {... state, sort: payload}
      }

      case `set_user_${what}_query`: {
        return {... state, query: payload ? payload : ''}
      }

      case `del_user_${isRecipes ? 'recipe' : 'comment'}`: {
        const items = state.items.filter(item => item._id !== payload)

        return {... state, items}
      }

      case `clear_user_${what}_query`: {
        return {... state, query: ''}
      }

      case `clear_user_${what}`: {
        return initial
      }

      default: {
        return state
      }
    }
  }
}

export default userItemsReducerMaker
