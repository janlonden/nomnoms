import CSSModules from 'react-css-modules'
import React from 'react'

import userItemsMaker from '../users/user-items-maker'

import styles from './user-comments.styl'

const UserComments = userItemsMaker('comments')

export default CSSModules(UserComments, styles, {allowMultiple: true})
