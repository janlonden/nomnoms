import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import commentFormMaker from './comment-form-maker'

import styles from './comment-form.styl'

const NewComment = commentFormMaker('new')

NewComment.propTypes = {
  comments: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  newComment: PropTypes.object.isRequired,
  recipeId: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default CSSModules(NewComment, styles, {allowMultiple: true})
