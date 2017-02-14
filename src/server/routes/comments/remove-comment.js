const removeComment = ({
  authenticated,
  userId,
  req,
  error,
  success,
  Comment
}) => {
  const {_id, authorId} = req.body

  const response = {
    auth: 'Måste vara inloggad för att radera kommentarer.',
    error: 'Kunde inte radera kommentar. Försök igen senare.',
    success: 'Kommentaren raderades.'
  }

  if (! authenticated) {
    error(response.auth)

    return
  } else if (authorId !== userId) {
    error(response.error)

    return
  }

  Comment.findById(_id, (err, comment) => {
    if (err) {
      error(response.error)

      return
    }

    comment.remove(() => {
      success({message: response.success})
    })
  })
}

export default removeComment
