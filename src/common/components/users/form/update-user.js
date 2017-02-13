import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import userFormMaker from './user-form-maker'

import styles from './user-form.styl'

const UpdateUser = userFormMaker('update')

UpdateUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  updateUser: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

export default CSSModules(UpdateUser, styles, {allowMultiple: true})
