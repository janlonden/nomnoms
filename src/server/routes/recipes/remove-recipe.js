const removeRecipe = ({
  authenticated,
  userId,
  req,
  error,
  success,
  Recipe,
  Comment
}) => {
  const {_id, authorId} = req.body

  const response = {
    auth: 'Måste vara inloggad för att radera recept.',
    error: 'Kunde inte radera recept.',
    success: 'Receptet raderades.'
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

    Comment.remove({recipeId: _id})
      .exec((err, success) => {
        if (err) {
          console.log(err)
        }
      })

    recipe.remove(() => {
      success({data: response.success})
    })
  })
}

export default removeRecipe
