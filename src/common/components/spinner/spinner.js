import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './spinner.styl'

const Spinner = () =>
  <div styleName="root"><div></div><div></div><div></div><div></div></div>

export default CSSModules(Spinner, styles)
