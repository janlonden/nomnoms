const newComment = ({
  authenticated,
  Comment,
  error,
  Recipe,
  recipePromise,
  req,
  sanitize,
  striptags,
  success,
  userId
}) => {
  const {recipeId, text, author, authorId, authorPhoto} = req.body

  const response = {
    auth: 'Måste vara inloggad för att kommentera.',
    error: 'Kunde inte lägga till kommentar.',
  }

  if (! authenticated) {
    error(response.auth)

    return
  } else if (authorId !== userId) {
    error(response.error)

    return
  }

  new Comment({
    recipeId: striptags(recipeId),
    author: striptags(author),
    authorId: striptags(authorId),
    authorPhoto: striptags(authorPhoto),
    text: sanitize(text)
  })

  .save((err, comment) => {
    if (err) {
      error(response.error)

      return
    }

    Recipe.findById(recipeId, (err, recipe) => {
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
  })
}

export default newComment
