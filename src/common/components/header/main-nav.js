import {Link, IndexLink} from 'react-router'
import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './main-nav.styl'

const MainNav = ({nav, setResponsiveNavActive}) =>
  <ul
    onClick={nav.responsive && setResponsiveNavActive(false)}
    styleName={`root ${nav.responsive ? 'responsive' : 'non-responsive'}`}
  >
    <li><IndexLink to="/" activeClassName="nav-active">Hem</IndexLink></li>
    <li><Link to="/recept" activeClassName="nav-active">Recept</Link></li>
  </ul>

MainNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  setResponsiveNavActive: PropTypes.func.isRequired
}

export default CSSModules(MainNav, styles, {allowMultiple: true})
