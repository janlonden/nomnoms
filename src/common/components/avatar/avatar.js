import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import Photo from 'common/components/photo/photo'

import styles from './avatar.styl'

const Avatar = ({photo, classes = '', name}) => photo
  ? <div styleName={`root ${classes}`}>
      <Photo photo={photo} what="user" />
    </div>
  : <div styleName={`root no-photo ${classes}`}>{name.substring(0, 1)}</div>

Avatar.propTypes = {
  classes: PropTypes.string,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string
}

export default CSSModules(Avatar, styles, {allowMultiple: true})
