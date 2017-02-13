import CSSModules from 'react-css-modules'
import React from 'react'

import userItemsMaker from '../users/user-items-maker'

import styles from './user-recipes.styl'

const UserRecipes = userItemsMaker('recipes')

export default CSSModules(UserRecipes, styles, {allowMultiple: true})
