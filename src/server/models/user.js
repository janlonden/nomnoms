import {compareSync} from 'bcrypt'
import mongoose from 'mongoose'

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  fullName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  photo: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

user.pre('save', function (next) {
  const {firstName, lastName} = this

  this.fullName = `${firstName} ${lastName}`

  next()
})

user.methods.validPassword = function (password) {
  return compareSync(password, this.password)
}

user.index({fullName: 'text'})

const User = mongoose.model('User', user)

export default User
