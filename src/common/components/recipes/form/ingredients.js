import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'
import uniqid from 'uniqid'

import styles from './ingredients.styl'

const Ingredients = ({what, ingredients, errors, dispatch}) => {
  const disabled = ingredients.length === 1

  const onChange = ({target}) => {
    const {value, name} = target
    const index = Number(target.getAttribute('data-index'))

    dispatch(`set_${what}_recipe_ingredient`, {index, name, value})
  }

  const addIngredient = event => {
    event.preventDefault()

    const ingredient = {_id: uniqid(), ingredient: '', amount: ''}

    dispatch(`add_${what}_recipe_ingredient`, ingredient)
  }

  const deleteIngredient = event => {
    event.preventDefault()

    if (disabled) {
      return
    }

    const {target} = event
    const index = Number(target.getAttribute('data-index'))

    dispatch(`del_${what}_recipe_ingredient`, index)
  }

  const sort = event => {
    event.preventDefault()

    if (disabled) {
      return
    }

    const {target} = event
    const index = Number(target.getAttribute('data-index'))
    const button = target.innerText.toLowerCase()

    dispatch(`sort_${what}_recipe_ingredient`, {index, button})
  }

  return (
    <section styleName="root">
      <header styleName="header">
        <label styleName="label">Ingredienser</label>

        {errors.ingredients &&
          <p styleName="error">{errors.ingredients}</p>
        }
      </header>

      <ul styleName="ingredients">
        {ingredients.map((ingredient, index) =>
          <li key={index} styleName="ingredient">
            <label
              className="hidden"
              htmlFor={`amount-input-${index}`}
              styleName="label"
            >
              Mängd
            </label>

            <input
              data-index={index}
              id={`amount-input-${index}`}
              name="amount"
              onChange={onChange}
              placeholder="Lite"
              styleName="input-text"
              type="text"
              value={ingredient.amount}
            />

            <label className="hidden" htmlFor={`ingredient-input-${index}`}>
              Ingrediens
            </label>

            <input
              data-index={index}
              id={`ingredient-input-${index}`}
              name="ingredient"
              onChange={onChange}
              placeholder="Svartpeppar"
              styleName="input-text"
              type="text"
              value={ingredient.ingredient}
            />

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
                  onClick={deleteIngredient}
                  styleName={`remove ${disabled ? 'disabled' : ''}`}
                >
                  <span className="hidden">Ta bort ingrediens</span>
                </a>
              </li>
            </ul>
          </li>
        )}
      </ul>

      <a href="#" styleName="button add-field" onClick={addIngredient}>
        <span>Ny ingrediens</span>
      </a>
    </section>
  )
}

Ingredients.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired,
  what: PropTypes.string.isRequired
}

export default CSSModules(Ingredients, styles, {allowMultiple: true})
