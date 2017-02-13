import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './guest-nav.styl'

const GuestNav = ({dispatch, nav, setResponsiveNavActive}) => {
  const {responsive} = nav

  const setInput = input => event => {
    event.preventDefault()

    dispatch('set_input', input)
  }

  return (
    <ul
      onClick={responsive && setResponsiveNavActive(false)}
      styleName={`root ${responsive ? 'responsive' : 'non-responsive'}`}
    >
      <li>
        <a href="#" onClick={setInput('login')} styleName="button login">
          <span>Logga in</span>
        </a>
      </li>

      <li>
        <a href="#" onClick={setInput('newUser')} styleName="button register">
          <span>Registrera</span>
        </a>
      </li>
    </ul>
  )
}

GuestNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  setResponsiveNavActive: PropTypes.func.isRequired
}

export default CSSModules(GuestNav, styles, {allowMultiple: true})
