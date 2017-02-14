const likeRecipe = ({authenticated, req, error, success, userId, Recipe}) => {
  const {_id, userId: clientUserId} = req.body

  const response = {
    auth: 'Måste vara inloggad för att gilla recept.',
    error: 'Kunde inte gilla recept. Försök igen senare.',
    success: 'Recept gillad/ogillad.'
  }

  if (! authenticated) {
    error(response.auth)

    return
  } else if (clientUserId !== userId) {
    error(response.error)
  }

  Recipe.findById(_id, (err, recipe) => {
    if (err) {
      error(response.error)

      return
    }

    const liked = recipe.likers.find(liker => liker === userId)

    if (! liked) {
      recipe.likers.push(userId)
    } else {
      recipe.likers = recipe.likers.filter(liker => liker !== userId)
    }

    recipe.likes = recipe.likers.length

    recipe.save((err, recipe) => {
      if (err) {
        error(response.error)

        return
      }

      success({message: response.success})
    })
  })
}

export default likeRecipe
