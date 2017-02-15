const initial = {
  hasFetched: false,
  isSearching: false,
  isSorting: false,
  query: '',
  recipes: [],
  sort: 'Nya först',
  sortNavActive: false,
  total: 0
}

const recipesReducerMaker = what => (state = initial, {type, payload}) => {
  switch (type) {
    case `set_${what}_recipes`: {
      return {... state, recipes: payload, hasFetched: true}
    }

    case `add_${what}_recipes`: {
      return {... state, recipes: [... state.recipes, ... payload]}
    }

    case `set_${what}_recipes_total`: {
      return {... state, total: payload ? payload : 0}
    }

    case `set_${what}_recipes_query`: {
      return {... state, query: payload ? payload : ''}
    }

    case `clear_${what}_recipes_query`: {
      return {... state, query: ''}
    }

    case `set_${what}_recipes_sorting`: {
      return {... state, isSorting: payload ? true : false}
    }

    case `set_${what}_recipes_searching`: {
      return {... state, isSearching: payload ? true : false}
    }

    case `set_${what}_recipes_sort_nav_active`: {
      return {... state, sortNavActive: payload ? true : false}
    }

    case `set_${what}_recipes_sort`: {
      return {... state, sort: payload}
    }

    case `like_${what}_recipes_recipe`: {
      const {_id, userId} = payload
      const index = state.recipes.findIndex(recipe => recipe._id === _id)

      if (index < 0) {
        return state
      }

      const newState = {... state}

      const liked = state.recipes[index].likers.some(
        likerId => likerId === userId
      )

      if (! liked) {
        newState.recipes[index].likers = [
          ... state.recipes[index].likers,
          userId
        ]
      } else {
        newState.recipes[index].likers = state.recipes[index].likers.filter(
          likerId => likerId !== userId
        )
      }

      return newState
    }

    default: {
      return state
    }
  }
}

export default recipesReducerMaker
