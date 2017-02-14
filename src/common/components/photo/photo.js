import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './photo.styl'

const Photo = ({photo, what}) => photo
  ? <div styleName="root" style={{
      backgroundImage: `url('https://londen.se/nomnoms/photos/medium_${photo}')`
    }}>
    </div>
  : <div styleName="root no-photo"></div>

Photo.propTypes = {
  photo: PropTypes.string,
  what: PropTypes.string.isRequired
}

export default CSSModules(Photo, styles, {allowMultiple: true})
