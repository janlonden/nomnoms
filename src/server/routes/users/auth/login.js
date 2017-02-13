import passport from 'server/passport'

const login = ({authenticated, req, res, next, error, success, User}) => {
  const {email} = req.body

  const response = {
    auth: 'Redan inloggad.',
    credentials: 'Ogiltigt användarnamn eller lösenord.',
    error: 'Kunde inte logga in.'
  }

  if (authenticated) {
    error(response.auth)

    return
  }

  passport.authenticate('json', (err, user) => {
    if (err) {
      error(response.error)

      return
    }

    if (! user) {
      error(response.credentials)

      return
    }

    User.findOne({email}, (err, user) => {
      if (err) {
        error(response.error)

        return
      }

      const {_id, firstName, lastName, fullName, email, photo} = user

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
            email,
            photo
          }
        })
      })
    })
  })(req, res, next)
}

export default login
