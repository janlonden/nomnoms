import Comment from 'server/models/comment'
import User from 'server/models/user'

const recipePromise = recipe => new Promise((resolve, reject) => {
  const {
    _id,
    title,
    description,
    ingredients,
    instructions,
    likers,
    author,
    authorId,
    photo,
    createdAt
  } = recipe

  const comments = new Promise((resolve, reject) => {
    Comment.find({recipeId: _id}, (err, comments) => {
      if (err) {
        reject(err)

        return
      }

      resolve(comments)
    })
  })

  const authorPhoto = new Promise((resolve, reject) => {
    User.findById(authorId, (err, user) => {
      if (err) {
        reject(err)

        return
      }

      resolve(user.photo)
    })
  })

  Promise.all([comments, authorPhoto])
    .then(promises => {
      resolve({
        _id,
        title,
        description,
        ingredients,
        instructions,
        likers,
        author,
        authorId,
        authorPhoto: promises[1],
        photo,
        comments: promises[0],
        createdAt
      })
    })

    .catch(err => {
      reject(err)
    })
})

export default recipePromise
