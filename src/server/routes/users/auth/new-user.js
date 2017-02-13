import {hashSync} from 'bcrypt'

const register = ({authenticated, req, error, success, User, striptags}) => {
  const {firstName, lastName, email, password} = req.body

  const response = {
    auth: 'Redan inloggad.',
    userExists: 'En användare med samma e-post finns redan.',
    error: 'Kunde inte logga in.'
  }

  if (authenticated) {
    error(response.auth)

    return
  }

  User.findOne({email}, (err, user) => {
    if (err) {
      error(response.error)

      return
    }

    if (user) {
      error(response.userExists)

      return
    }

    const newUser = {
      firstName: striptags(firstName),
      lastName: striptags(lastName),
      email: striptags(email),
      password: hashSync(password, 10)
    }

    new User(newUser).save((err, user) => {
      if (err) {
        error(response.error)

        return
      }

      const {_id, firstName, lastName, fullName, email} = user

      req.login(user, err => {
        if (err) {
          error(response.error)

          return
        }

        success({
          data: {
            _id,
            firstName,
            lastName,
            fullName,
            email
          }
        })
      })
    })
  })
}

export default register
