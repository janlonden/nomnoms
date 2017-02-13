import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './title.styl'

const Title = ({what, title, errors, dispatch}) => {
  const onChange = ({target}) => {
    const {value} = target

    dispatch(`set_${what}_recipe_title`, value)
  }

  return (
    <section styleName="root">
      <header styleName="header">
        <label styleName="label" htmlFor="title-input">Titel</label>

        {errors.title &&
          <p styleName="error">{errors.title}</p>
        }
      </header>

      <input
        id="title-input"
        name='title'
        onChange={onChange}
        placeholder="En riktigt god recept"
        styleName="input-text"
        type="text"
        value={title}
      />
    </section>
  )
}

Title.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  what: PropTypes.string.isRequired
}

export default CSSModules(Title, styles, {allowMultiple: true})
