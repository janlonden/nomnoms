import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'
import striptags from 'striptags'

import Quill from 'common/components/forms/quill'

import sanitize from 'common/functions/sanitize'

import styles from './description.styl'

const Description = ({what, description, errors, dispatch}) => {
  const onChange = value => {
    dispatch(`set_${what}_recipe_description`, sanitize(value))
  }

  return (
    <section styleName="root">
      <header styleName="header">
        <label styleName="label">Beskrivning</label>

        {errors.description &&
          <p styleName="error">{errors.description}</p>
        }
      </header>

      <div styleName={`input ${striptags(description) ? '' : 'placeholder'}`}>
        <Quill onChange={onChange} value={description} />
      </div>
    </section>
  )
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  what: PropTypes.string.isRequired
}

export default CSSModules(Description, styles, {allowMultiple: true})
