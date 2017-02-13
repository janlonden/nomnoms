import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import allRecipes from './recipes/all-recipes'
import confirm from './confirm'
import input from './input'
import login from './users/login'
import nav from './nav'
import newComment from './comments/new-comment'
import newRecipe from './recipes/new-recipe'
import newUser from './users/new-user'
import popularRecipes from './recipes/popular-recipes'
import recentRecipes from './recipes/recent-recipes'
import recipe from './recipes/recipe'
import updateComment from './comments/update-comment'
import updateRecipe from './recipes/update-recipe'
import updateUser from './users/update-user'
import user from './users/user'
import userComments from './comments/user-comments'
import userRecipes from './recipes/user-recipes'

const reducers = combineReducers({
  allRecipes,
  confirm,
  input,
  login,
  nav,
  newComment,
  newRecipe,
  newUser,
  popularRecipes,
  recentRecipes,
  recipe,
  routing: routerReducer,
  updateComment,
  updateRecipe,
  updateUser,
  user,
  userComments,
  userRecipes
})

export default reducers
