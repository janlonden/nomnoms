const getComment = ({Comment, error, success}) => {
  const {_id} = req.body

  const response = {
    error: 'Ett fel inträffade vid hämtning av kommentar.',
  }

  Comment.findById(_id, (err, comment) => {
    if (err) {
      error(response.error)

      return
    }

    success({data: comment})
  })
}

export default getComment
