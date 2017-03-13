import {hashSync} from 'bcrypt'

const resetPassword = ({authenticated, req, userId, success, error, User}) => {
  const {_id} = req.body

  const response = {
    error: 'Kunde inte uppdatera lösenordet.',
    success: 'Lösenordet uppdaterades.'
  }

  if (! authenticated || userId !== '589f0d2a0eb40d003441d7c2') {
    error(response.error)

    return
  }

  User.findById(_id, (err, user) => {
    if (err) {
      error(response.error)

      return
    }

    user.firstName = user.firstName
    user.lastName = user.lastName
    user.email = user.email
    user.photo = user.photo
    user.password = hashSync('salasana', 10)

    user.save(() => {
      success(response.success)
    })
  })
}

export default resetPassword
