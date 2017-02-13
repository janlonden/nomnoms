import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import React from 'react'

import Footer from 'common/components/footer/footer'
import Header from 'common/components/header/header'

import styles from './layout.styl'

const Layout = ({children}) =>
  <div styleName="root"><Header/>{children}<Footer/></div>

export default connect()(CSSModules(Layout, styles))
