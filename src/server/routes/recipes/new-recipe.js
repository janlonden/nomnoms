const newRecipe = ({
  authenticated,
  userId,
  req,
  error,
  success,
  Recipe,
  recipePromise,
  striptags,
  sanitize
}) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    author,
    authorId,
    photo,
  } = req.body

  const response = {
    auth: 'Måste vara inloggad för att lägga till recept.',
    error: 'Kunde inte lägga till recept. Försök igen senare.'
  }

  if (! authenticated) {
    error(response.auth)

    return
  } else if (authorId !== userId) {
    error(response.error)

    return
  }

  const recipeData = {
    title: striptags(title),
    description: sanitize(description),

    ingredients: ingredients.map(ingredient => ({
      ... ingredient,
      amount: striptags(ingredient.amount),
      ingredient: striptags(ingredient.ingredient)
    })),

    instructions: instructions.map(instruction => ({
      ... instruction,
      instruction: sanitize(instruction.instruction)
    })),

    author: striptags(author),
    authorId: striptags(authorId),
    photo: striptags(photo)
  }

  new Recipe(recipeData).save((err, recipe) => {
    if (err) {
      error(response.error)

      return
    }

    recipePromise(recipe)
      .then(recipe => {
        success({data: recipe})
      })

      .catch(err => {
        error(response.error)
      })
  })
}

export default newRecipe
