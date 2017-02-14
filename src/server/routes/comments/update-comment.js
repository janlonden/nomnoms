const updateComment = ({
  authenticated,
  userId,
  req,
  error,
  success,
  Comment,
  sanitize
}) => {
  const {_id, text, authorId} = req.body

  const response = {
    auth: 'Måste vara inloggad för att uppdatera kommentarer.',
    error: 'Kunde inte uppdatera kommentar. Försök igen senare.',
    success: 'Kommentaren uppdaterades.'
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

    comment.text = sanitize(text)

    comment.save(() => {
      success({message: response.success})
    })
  })
}

export default updateComment
