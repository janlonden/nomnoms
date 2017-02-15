import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import functional from 'react-functional'
import React, {PropTypes} from 'react'

import request from 'common/functions/request'

import Avatar from 'common/components/avatar/avatar'
import GuestNav from './guest-nav'
import MainNav from './main-nav'
import Search from './search'
import UserNav from './user-nav'

import styles from './header.styl'

const Header = ({dispatch, isSearching, pathname, query, nav, user}) => {
  const {responsive, responsiveNavActive} = nav

  const setResponsiveNavActive = what => event => {
    event.preventDefault()

    dispatch('set_nav_responsive_active', what)
  }

  return (
    <header styleName="root">
      <h1 styleName="logo">NOMNOMS</h1>

      <Search
        dispatch={dispatch}
        isSearching={isSearching}
        pathname={pathname}
        query={query}
        user={user}
      />

      <nav styleName={
        'nav'
        + (responsive ? ' responsive' : '')
        + (responsiveNavActive ? ' active' : '')
      }>
        <div styleName="inner">
          <MainNav
            dispatch={dispatch}
            nav={nav}
            setResponsiveNavActive={setResponsiveNavActive}
          />

          {! user._id &&
            <GuestNav
              dispatch={dispatch}
              nav={nav}
              setResponsiveNavActive={setResponsiveNavActive}
            />
          }

          {Boolean(user._id) &&
            <div styleName="avatar">
              <div>
                <Avatar
                  classes={responsive ? 'medium' : ''}
                  name={user.fullName}
                  photo={user.photo}
                />
              </div>
            </div>
          }

          {Boolean(user._id) &&
            <UserNav
              dispatch={dispatch}
              nav={nav}
              pathname={pathname}
              request={request}
              setResponsiveNavActive={setResponsiveNavActive}
              user={user}
            />
          }
        </div>
      </nav>

      <a
        href="#"
        onClick={setResponsiveNavActive(! responsiveNavActive)}
        styleName={
          'open-responsive'
          + (responsive ? ' visible' : '')
          + (responsiveNavActive ? ' close' : '')
        }
      >
        <span className="hidden">Meny</span>
      </a>

      {responsive && <span></span>}
    </header>
  )
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

const stateToProps = state => ({
  isSearching: state.allRecipes.isSearching,
  nav: state.nav,
  pathname: state.routing.locationBeforeTransitions.pathname,
  query: state.allRecipes.query,
  user: state.user
})

const dispatchToProps = dispatch => ({
  dispatch (type, payload) {
    dispatch({type, payload})
  }
})

const lifeCycleMethods = {
  componentDidMount ({dispatch, nav}) {
    let timeout

    const addClass = () => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        dispatch('set_nav_responsive', window.innerWidth < 1023)
      }, 100)
    }

    addClass()

    window.addEventListener('resize', addClass)

    window.addEventListener('keydown', event => {
      if (nav.responsiveNavActive && event.keyCode === 27) {
        dispatch('set_nav_responsive_active', false)
      }
    })
  }
}

export default connect(stateToProps, dispatchToProps)(functional(
  CSSModules(Header, styles, {allowMultiple: true}), lifeCycleMethods
))
