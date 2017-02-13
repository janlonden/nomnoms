import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import commentFormMaker from './comment-form-maker'

import styles from './comment-form.styl'

const UpdateComment = commentFormMaker('update')

UpdateComment.propTypes = {
  dispatch: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  updateComment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default CSSModules(UpdateComment, styles, {allowMultiple: true})
