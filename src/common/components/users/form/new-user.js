import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import userFormMaker from './user-form-maker'

import styles from './user-form.styl'

const NewUser = userFormMaker('new')

NewUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newUser: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

export default CSSModules(NewUser, styles, {allowMultiple: true})
