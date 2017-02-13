import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import recipeFormMaker from './recipe-form-maker'

import styles from './recipe-form.styl'

const UpdateRecipe = recipeFormMaker('update')

UpdateRecipe.propTypes = {
  dispatch: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  updateRecipe: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default CSSModules(UpdateRecipe, styles, {allowMultiple: true})
