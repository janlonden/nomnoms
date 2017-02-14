import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './photo.styl'

const Photo = ({photo, what, size = 'medium'}) => photo
  ? <div styleName="root">
      <div styleName="photo" style={{
        backgroundImage: `url('https://londen.se/nomnoms/photos/${
          what === 'recipe' ? 'recipes/' : 'users/'
        }${size}_${photo}')`
      }}>
      </div>
    </div>
  : <div styleName="root no-photo"></div>

Photo.propTypes = {
  photo: PropTypes.string,
  what: PropTypes.string.isRequired
}

export default CSSModules(Photo, styles, {allowMultiple: true})
