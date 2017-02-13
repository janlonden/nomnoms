import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import recipeFormMaker from './recipe-form-maker'

import styles from './recipe-form.styl'

const NewRecipe = recipeFormMaker('new')

NewRecipe.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newRecipe: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default CSSModules(NewRecipe, styles, {allowMultiple: true})
