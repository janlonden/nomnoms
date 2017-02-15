import {browserHistory} from 'react-router'
import {Link, IndexLink} from 'react-router'
import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'

import styles from './user-nav.styl'

const UserNav = ({
  user, dispatch, pathname, request, nav, setResponsiveNavActive
}) => {
  const {userNavActive, responsive} = nav

  let timeout

  const setUserNavActive = what => event => {
    event.preventDefault()

    clearTimeout(timeout)

    if (! userNavActive) {
      dispatch('set_nav_user_active', what)
    }
  }

  const userNavTimeout = () => {
    timeout = setTimeout(() => {
      dispatch('set_nav_user_active', false)
    }, 500)
  }

  const setInput = input => event => {
    event.preventDefault()

    dispatch('set_input', input)
  }

  const logout = event => {
    event.preventDefault()

    request('logout')
      .then(({status, payload}) => {
        if (status === 'success') {
          if (pathname === '/jag') {
            browserHistory.push('/')
          }

          location.reload()
        }

        if (status === 'error') {
          console.log(payload)
        }
      })

      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div
      onClick={responsive && setResponsiveNavActive(false)}
      styleName={`root ${responsive ? 'responsive' : 'non-responsive'}`}
    >
      <a
        href="#"
        onClick={setUserNavActive(true)}
        onMouseOut={! responsive && userNavTimeout}
        onMouseOver={! responsive && setUserNavActive(true)}
        styleName="button open"
      >
        <span>{user.fullName}</span>
      </a>

      <ul
        className={`user-nav ${userNavActive ? 'active' : ''}`}
        onClick={! responsive && setUserNavActive(false)}
        onMouseOut={! responsive && userNavTimeout}
        onMouseOver={! responsive && setUserNavActive(true)}
        styleName="nav"
      >
        <li>
          <a
            href="#"
            onClick={setInput('newRecipe')}
            styleName="button compose"
          >
            <span>Nytt recept</span>
          </a>
        </li>

        <li>
          <Link to='/jag' styleName="button dashboard">
            <span>Min sida</span>
          </Link>
        </li>

        <li>
          <a href="#" styleName="button logout" onClick={logout}>
            <span>Logga ut</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

UserNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  setResponsiveNavActive: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default CSSModules(UserNav, styles, {allowMultiple: true})
