import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'
import striptags from 'striptags'
import uniqid from 'uniqid'

import Quill from 'common/components/forms/quill'

import sanitize from 'common/functions/sanitize'

import styles from './instructions.styl'

const Instructions = ({what, instructions, errors, dispatch}) => {
  const disabled = instructions.length === 1

  const onChange = index => value => {
    const name = 'instruction'

    dispatch(`set_${what}_recipe_instruction`, {
      index,
      name,
      value: sanitize(value)
    })
  }

  const addInstruction = event => {
    event.preventDefault()

    const instruction = {_id: uniqid(), instruction: ''}

    dispatch(`add_${what}_recipe_instruction`, instruction)
  }

  const deleteInstruction = event => {
    event.preventDefault()

    if (disabled) {
      return
    }

    const {target} = event
    const index = Number(target.getAttribute('data-index'))

    dispatch(`del_${what}_recipe_instruction`, index)
  }

  const sort = event => {
    event.preventDefault()

    if (disabled) {
      return
    }

    const {target} = event
    const index = Number(target.getAttribute('data-index'))
    const button = target.innerText.toLowerCase()

    dispatch(`sort_${what}_recipe_instruction`, {index, button})
  }

  return (
    <section styleName="root">
      <header styleName="header">
        <label styleName="label">Instruktioner</label>

        {errors.instructions &&
          <p styleName="error">{errors.instructions}</p>
        }
      </header>

      <ol styleName="instructions">
        {instructions.map((instruction, index) =>
          <li
            key={index}

            styleName={
              `instruction ${striptags(instruction.instruction)
                ? ''
                : 'placeholder'
              }`
            }
          >
            <label className="hidden">Instruktion</label>

            <div styleName="input">
              <Quill
                onChange={onChange(index)}
                value={instruction.instruction}
              />
            </div>

            <ul styleName="edit-nav">
              <li>
                <a
                  data-index={index}
                  href="#"
                  onClick={sort}
                  styleName={`sort-up ${disabled ? 'disabled' : ''}`}
                >
                  <span className="hidden">Upp</span>
                </a>
              </li>

              <li>
                <a
                  data-index={index}
                  href="#"
                  onClick={sort}
                  styleName={`sort-down ${disabled ? 'disabled' : ''}`}
                >
                  <span className="hidden">Ner</span>
                </a>
              </li>

              <li>
                <a
                  data-index={index}
                  href="#"
                  onClick={deleteInstruction}
                  styleName={`remove ${disabled ? 'disabled' : ''}`}
                >
                  <span className="hidden">Ta bort instruktion</span>
                </a>
              </li>
            </ul>
          </li>
        )}
      </ol>

      <a href="#" onClick={addInstruction} styleName="button add-field">
        <span>Ny instruktion</span>
      </a>
    </section>
  )
}

Instructions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  instructions: PropTypes.array.isRequired,
  what: PropTypes.string.isRequired
}

export default CSSModules(Instructions, styles, {allowMultiple: true})
