const recipe = (state = {}, {type, payload}) => {
  switch (type) {
    case 'set_recipe': {
      return payload
    }

    case 'like_recipe': {
      if (! state.likers) {
        return state
      }
    
      const liked = state.likers.some(likerId => likerId === payload)

      if (! liked) {
        return {
          ... state,
          likers: [... state.likers, payload]
        }
      } else {
        return {
          ... state,
          likers: state.likers.filter(likerId => likerId !== payload)
        }
      }
    }

    case 'set_recipe_comment': {
      if (! state.comments) {
        return state
      }

      const index = state.comments.findIndex(
        comment => comment._id === payload._id
      )

      if (index < 0) {
        return state
      }

      const newState = {... state}

      newState.comments[index] = {
        ... state.comments[index],
        ... payload
      }

      return newState
    }

    case 'del_recipe_comment': {
      if (! state.comments) {
        return state
      }

      return {
        ... state,
        comments: state.comments.filter(comment => comment._id !== payload)
      }
    }

    case 'clear_recipe': {
      return {}
    }

    default: {
      return state
    }
  }
}

export default recipe
