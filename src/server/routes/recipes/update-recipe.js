const updateRecipe = ({
  authenticated,
  error,
  Recipe,
  recipePromise,
  req,
  sanitize,
  striptags,
  success,
  userId
}) => {
  const {
    _id,
    title,
    description,
    ingredients,
    instructions,
    authorId,
    photo,
  } = req.body

  const response = {
    auth: 'Måste vara inloggad för att uppdatera recept.',
    error: 'Kunde inte uppdatera recept. Försök igen senare.',
    success: 'Receptet uppdaterades.'
  }

  if (! authenticated) {
    error(response.auth)

    return
  } else if (authorId !== userId) {
    error(response.error)

    return
  }

  Recipe.findById(_id, (err, recipe) => {
    if (err) {
      error(response.error)

      return
    }

    recipe.title = striptags(title)
    recipe.description = sanitize(description)

    recipe.ingredients = ingredients.map(ingredient => ({
      ... ingredient,
      amount: striptags(ingredient.amount),
      ingredient: striptags(ingredient.ingredient)
    }))

    recipe.instructions = instructions.map(instruction => ({
      ... instruction,
      instruction: sanitize(instruction.instruction)
    }))

    recipe.photo = striptags(photo)

    recipe.save()

    recipePromise(recipe)
      .then(recipe => {
        success({
          data: recipe,
          message: response.success
        })
      })

      .catch(err => {
        error(response.error)
      })
  })
}

export default updateRecipe
