import {hashSync} from 'bcrypt'

const updateUser = ({
  authenticated,
  Comment,
  error,
  Recipe,
  req,
  striptags,
  success,
  User,
  userId
}) => {
  const {_id, firstName, lastName, email, password, photo} = req.body

  const response = {
    auth: 'Måste vara inloggad för att uppdatera användardetaljer.',
    error: 'Kunde inte uppdatera användardetaljer.',
    success: 'Användardetaljerna uppdaterades.'
  }

  if (! authenticated) {
    error(response.auth)

    return
  } else if (_id !== userId) {
    error(response.error)

    return
  }

  const strippedFirstName = striptags(firstName)
  const strippedLastName = striptags(lastName)
  const strippedEmail = striptags(email)
  const strippedPhoto = striptags(photo)

  Recipe.update(
    {authorId: _id},
    {author: `${strippedFirstName} ${strippedLastName}`},
    {multi: true},

    (err, success) => {
      if (err) {
        console.log(err)
      }
    }
  )

  Comment.update(
    {authorId: _id},

    {
      author: `${strippedFirstName} ${strippedLastName}`,
      authorPhoto: strippedPhoto
    },

    {multi: true},

    (err, success) => {
      if (err) {
        console.log(err)
      }
    }
  )

  User.findById(_id, (err, user) => {
    if (err) {
      error(response.error)

      return
    }

    user.firstName = strippedFirstName
    user.lastName = strippedLastName
    user.email = strippedEmail
    user.photo = strippedPhoto

    if (password) {
      user.password = hashSync(password, 10)
    }

    user.save(() => {
      success({message: response.success})
    })
  })
}

export default updateUser
