import {Strategy} from 'passport-json'
import passport from 'passport'

import User from './models/user'

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  User.findById(_id, (err, user) => {
    done(err, user)
  })
})

const callback = (email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err)
    } else if (! user) {
      return done(null, false)
    } else if (! user.validPassword(password)) {
      return done(null, false)
    } else {
      return done(null, user)
    }
  })
}

passport.use('json', new Strategy({
  usernameProp: 'email',
  passwordProp: 'password',
}, callback))

export default passport
