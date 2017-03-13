import striptags from 'striptags'

import sanitize from 'common/functions/sanitize'

import Comment from 'server/models/comment'
import Recipe from 'server/models/recipe'
import User from 'server/models/user'

import recipePromise from './recipes/recipe-promise'
import recipesPromise from './recipes/recipes-promise'
import responseMaker from './response-maker'

import getComment from './comments/get-comment'
import getComments from './comments/get-comments'
import getRecipe from './recipes/get-recipe'
import getRecipes from './recipes/get-recipes'
import likeRecipe from './recipes/like-recipe'
import login from './users/auth/login'
import logout from './users/auth/logout'
import newComment from './comments/new-comment'
import newRecipe from './recipes/new-recipe'
import newUser from './users/auth/new-user'
import removeComment from './comments/remove-comment'
import removeRecipe from './recipes/remove-recipe'
import resetPassword from './users/reset-password'
import updateComment from './comments/update-comment'
import updateRecipe from './recipes/update-recipe'
import updateUser from './users/update-user'

const handlers = {
  getComment,
  getComments,
  getRecipe,
  getRecipes,
  likeRecipe,
  login,
  logout,
  newComment,
  newRecipe,
  newUser,
  removeComment,
  removeRecipe,
  resetPassword,
  updateComment,
  updateRecipe,
  updateUser
}

const apiRoutes = (req, res, next) => {
  const authenticated = req.isAuthenticated()
  const handler = handlers[req.path.substring(1)]
  const userId = authenticated ? String(req.user._id) : undefined
  const error = responseMaker(res, 'error')
  const success = responseMaker(res, 'success')

  handler
    ? handler({
        authenticated,
        Comment,
        error,
        next,
        Recipe,
        recipePromise,
        recipesPromise,
        req,
        res,
        sanitize,
        striptags,
        success,
        User,
        userId
      })
    : error('Request handler not found.')
}

export default apiRoutes
