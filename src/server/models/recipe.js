import mongoose from 'mongoose'

const recipe = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  ingredients: {
    type: Array,
    required: true,
    default: []
  },

  instructions: {
    type: Array,
    required: true,
    default: []
  },

  likes: {
    type: Number,
    default: 0
  },

  likers: {
    type: Array,
    default: []
  },

  author: {
    type: String,
    required: true
  },

  authorId: {
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

recipe.index({
  title: 'text',
  description: 'text',
  ingredients: 'text',
  author: 'text',
  authorId: 'text'
})

const Recipe = mongoose.model('Recipe', recipe)

export default Recipe
