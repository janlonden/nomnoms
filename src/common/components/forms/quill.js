import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'
import ReactQuill from 'react-quill'

import styles from './quill.styl'

const defaultItems = [
  {type: 'bold', label: 'Bold'},
  {type: 'italic', label: 'Italic'},
  {type: 'strike', label: 'Strike'},
  {type: 'underline', label: 'Underline'},
  {type: 'link', label: 'Link'}
]

const Quill = ({onChange, value}) =>
  <ReactQuill onChange={onChange} value={value}>
    <ReactQuill.Toolbar key="toolbar" ref="toolbar" items={defaultItems} />
    <div key="editor" ref="editor" />
  </ReactQuill>

Quill.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default CSSModules(Quill, styles)
