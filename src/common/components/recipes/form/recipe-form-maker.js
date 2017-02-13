import {browserHistory} from 'react-router'
import React from 'react'
import striptags from 'striptags'
import uniqid from 'uniqid'

import Description from './description'
import Ingredients from './ingredients'
import Instructions from './instructions'
import PhotoUpload from 'common/components/forms/photo-upload'
import Title from './title'

const recipeFormMaker = what =>
  ({dispatch, newRecipe, request, updateRecipe, user}) => {

  const isNew = what === 'new'
  const isUpdate = what === 'update'
  const recipe = isNew ? newRecipe : updateRecipe

  const {
    _id,
    description,
    errors,
    ingredients,
    instructions,
    photo,
    photoError,
    title,
    uploading,
    requesting
  } = recipe

  const onSubmit = event => {
    event.preventDefault()

    if (checkAndSetErrors()) {
      return
    }

    const {fullName: author, _id: authorId} = user
    const handler = isUpdate ? 'updateRecipe' : 'newRecipe'

    const payload = {
      _id,
      author,
      authorId,
      description,
      ingredients,
      instructions,
      photo,
      title
    }

    dispatch(`set_${what}_recipe_requesting`, true)

    request(handler, payload)
      .then(({status, payload }) => {
        if (status === 'success') {
          if (isUpdate) {
            dispatch('set_recipe', payload.data)
            dispatch('set_user_recipe', payload.data)
          } else {
            dispatch('set_recipe', payload.data)

            browserHistory.push(`/recept/${payload.data._id}`)
          }

          dispatch('clear_input')
          dispatch(`clear_${what}_recipe`)
        }

        if (status === 'error') {
          console.log(payload)
        }

        dispatch(`set_${what}_recipe_requesting`, false)
      })

      .catch(err => {
        console.log(err)

        dispatch(`set_${what}_recipe_requesting`, true)
      })
  }

  const checkAndSetErrors = () => {
    const errors = {
      title: ! title ? 'Titel måste fyllas i.' : '',
      description: ! striptags(description) ? 'Beskrivning måste fyllas i.' : '',

      ingredients: ingredients.every(item => ! item.ingredient)
        ? 'Åtminstone en ingrediens krävs.'
        : '',

      instructions: instructions.every(item => ! striptags(item.instruction))
        ? 'Åtminstone en instruktion krävs.'
        : ''
    }

    dispatch(`set_${what}_recipe_errors`, errors)

    return Object.keys(errors).some(error => errors[error])
  }

  return (
    <section styleName="root" className="recipe-form-maker">
      <h2 styleName="heading">
        {isUpdate ? 'Redigera recept' : 'Nytt recept'}
      </h2>

      <form styleName="form" onSubmit={onSubmit}>
        <Title
          dispatch={dispatch}
          errors={errors}
          title={title}
          what={what}
        />

        <Description
          description={description}
          dispatch={dispatch}
          errors={errors}
          what={what}
        />

        <PhotoUpload
          dispatch={dispatch}
          isUpdate={isUpdate}
          photo={photo}
          photoError={photoError}
          request={request}
          uploading={uploading}
          what="recipe"
        />

        <Ingredients
          dispatch={dispatch}
          errors={errors}
          ingredients={ingredients}
          what={what}
        />

        <Instructions
          dispatch={dispatch}
          errors={errors}
          instructions={instructions}
          what={what}
        />

        <section styleName="submit-section">
          <button styleName={
            'button'

            + (isUpdate ? ' update' : ' new')
            + (requesting ? ' requesting' : '')
          }>
            <span>
              {isUpdate
                ? requesting ? 'Sparar' : 'Spara'
                : requesting ? 'Skickar' : 'Skicka'
              }
            </span>
          </button>
        </section>
      </form>
    </section>
  )
}

export default recipeFormMaker
