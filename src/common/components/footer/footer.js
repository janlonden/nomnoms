import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import React from 'react'

import UserInput from 'common/components/user-input/user-input'

import styles from './footer.styl'

const Footer = () => <footer><UserInput/></footer>

export default connect()(CSSModules(Footer, styles))
