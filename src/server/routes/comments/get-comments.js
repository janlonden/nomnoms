const getComments = ({req, error, success, Recipe, Comment, striptags}) => {
  const {find, limit, skip, sort} = req.body
  const {query, authorId} = find

  const response = {
    error: 'Ett fel inträffade vid hämtning av kommentarer.'
  }

  let total

  const sendComments = comments => {
    if (! comments.length) {
      success({data: comments, total})

      return
    }

    const promises = comments.map(comment =>
      new Promise ((resolve, reject) => {
        Recipe.findById(comment.recipeId, (err, recipe) => {
          if (err) {
            reject(err)

            return
          }

          const {
            _id,
            recipeId,
            text,
            author,
            authorId,
            authorPhoto,
            createdAt
          } = comment

          resolve({
            _id,
            recipe: recipe.title,
            recipeId,
            text,
            author,
            authorId,
            authorPhoto,
            createdAt
          })
        })
      })
    )

    Promise.all(promises)
      .then(comments => {
        success({data: comments, total})
      })

      .catch(err => {
        error(response.error)
      })
  }

  const filtered = () => {
    Comment
      .find({authorId})
      .sort(sort)
      .exec((err, comments) => {
        if (err) {
          error(response.error)

          return
        }

        const wordsFromString = str => striptags(str.toLowerCase())
          .split(' ')
          .filter(word => word)

        const queryWords = wordsFromString(query)

        const filteredComments = comments
          .filter(comment => queryWords.every(queryWord =>
            wordsFromString(comment.text)
              .some(word => word.includes(queryWord))
          ))

          .map((comment, index, comments) => {
            if (! index) {
              total = comments.length
            }

            return comment
          })

          .slice(skip, limit)

        sendComments(filteredComments)
      })
  }

  const unFiltered = () => {
    Comment
      .find({authorId})
      .exec((err, comments) => {
        total = comments.length
      })
      
    Comment
      .find({authorId})
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .exec((err, comments) => {
        if (err) {
          error(response.error)

          return
        }

        sendComments(comments)
      })
  }

  query ? filtered() : unFiltered()
}

export default getComments
