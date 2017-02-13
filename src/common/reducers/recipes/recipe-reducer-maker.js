import striptags from 'striptags'

const initial = {
  _id: '',
  title: '',
  description: '',

  ingredients: [{
    ... {
      _id: 'initial',
      ingredient: '',
      amount: ''
    }
  }],

  instructions: [{
    ... {
      _id: 'initial',
      instruction: ''
    }
  }],

  photo: '',
  photoError: '',
  uploading: false,
  requesting: false,

  errors: {
    title: '',
    description: '',
    ingredients: '',
    instructions: ''
  }
}

const recipeReducerMaker = what => (state = initial, {type, payload}) => {
  switch (type) {
    case `set_${what}_recipe`: {
      return {... state, ... payload}
    }

    case `set_${what}_recipe_errors`: {
      return {... state, errors: payload}
    }

    case `set_${what}_recipe_uploading`: {
      return {... state, uploading: payload ? true : false}
    }

    case `set_${what}_recipe_requesting`: {
      return {... state, requesting: payload ? true : false}
    }

    case `set_${what}_recipe_photo`: {
      return {... state, photo: payload ? payload : ''}
    }

    case `set_${what}_recipe_photo_error`: {
      return {... state, photoError: payload ? payload : ''}
    }

    case `set_${what}_recipe_title`: {
      return {
        ... state,
        title: payload ? payload : '',

        errors: {
          ... state.errors,
          title: payload
            ? payload.length > 60
              ? 'Titeln får inte vara längre än 60 tecken.'
              : ''
            : state.errors.title
        }
      }
    }

    case `set_${what}_recipe_description`: {
      return {
        ... state,
        description: payload ? payload : '',

        errors: {
          ... state.errors,
          description: striptags(payload) ? '' : state.errors.description
        }
      }
    }

    case `set_${what}_recipe_ingredient`: {
      const newState = {... state}
      const {index, name, value} = payload

      newState.ingredients[index][name] = value

      if (value) {
        newState.errors.ingredients = ''
      }

      return newState
    }

    case `add_${what}_recipe_ingredient`: {
      return {... state, ingredients: [... state.ingredients, payload]}
    }

    case `sort_${what}_recipe_ingredient`: {
      const newState = {... state}
      const {index, button} = payload
      const newIndex = button === 'upp' ? index - 1 : index + 1

      newState.ingredients = state.ingredients.reduce(
        (sorted, current, currentIndex, original) => {
          if (currentIndex === index && original[newIndex]) {
            sorted[newIndex] = original[index]
            sorted[index] = original[newIndex]
          }

          return sorted
        }, [... state.ingredients]
      )

      return newState
    }

    case `del_${what}_recipe_ingredient`: {
      const newState = {... state}

      newState.ingredients.splice(payload, 1)

      return newState
    }

    case `set_${what}_recipe_instruction`: {
      const newState = {... state}
      const {index, name, value} = payload

      newState.instructions[index][name] = value

      if (striptags(value)) {
        newState.errors.instructions = ''
      }

      return newState
    }

    case `add_${what}_recipe_instruction`: {
      return {... state, instructions: [... state.instructions, payload]}
    }

    case `sort_${what}_recipe_instruction`: {
      const newState = {... state}
      const {index, button} = payload
      const newIndex = button === 'upp' ? index - 1 : index + 1

      newState.instructions = state.instructions.reduce(
        (sorted, current, currentIndex, original) => {
          if (currentIndex === index && original[newIndex]) {
            sorted[newIndex] = original[index]
            sorted[index] = original[newIndex]
          }

          return sorted
        }, [... state.instructions]
      )

      return newState
    }

    case `del_${what}_recipe_instruction`: {
      const newState = {... state}

      newState.instructions.splice(payload, 1)

      return newState
    }

    case `clear_${what}_recipe`: {
      return initial
    }

    default: {
      return state
    }
  }
}

export default recipeReducerMaker
