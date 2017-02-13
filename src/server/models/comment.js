import mongoose from 'mongoose'

const comment = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  authorId: {
    type: String,
    required: true
  },

  authorPhoto: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

comment.index({text: 'text'})

const Comment = mongoose.model('Comment', comment)

export default Comment
