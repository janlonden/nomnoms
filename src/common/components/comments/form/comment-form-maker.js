import React from 'react'
import striptags from 'striptags'

import sanitize from '../../../functions/sanitize'

import Quill from 'common/components/forms/quill'

const commentFormMaker = what => ({
  recipeId, dispatch, comments, newComment, request, updateComment, user
}) => {
  const isNew = what === 'new'
  const isUpdate = what === 'update'
  const comment = isNew ? newComment : updateComment
  const {_id, text, error, requesting} = comment

  const onChange = value => {
    dispatch(`set_${what}_comment_text`, sanitize(value))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (requesting) {
      return
    }

    if (! striptags(text)) {
      dispatch(`set_${what}_comment_error`, 'Kommentar måste fyllas i.')

      return
    }

    const {fullName: author, _id: authorId, photo: authorPhoto} = user
    const handler = isUpdate ? 'updateComment' : 'newComment'

    const newCommentPayload = {
      author,
      authorId,
      authorPhoto,
      recipeId,
      text
    }

    const updateCommentPayload = {
      _id,
      text,
      authorId
    }

    dispatch(`set_${what}_comment_requesting`, true)

    const commentPayload = isUpdate ? updateCommentPayload : newCommentPayload

    request(handler, commentPayload)
      .then(({status, payload}) => {
        if (updateComment) {
          if (status === 'success') {
            console.log(payload.message)

            dispatch('set_recipe_comment', commentPayload)
            dispatch('set_user_comment', commentPayload)
            dispatch('clear_input')
          }

          if (status === 'error') {
            console.log(payload)
          }
        } else {
          if (status === 'success') {
            dispatch('set_recipe', payload.data)
          }

          if (status === 'error') {
            console.log(payload)
          }
        }

        dispatch(`set_${what}_comment_requesting`, false)
        dispatch(`clear_${what}_comment`)
      })

      .catch(err => {
        console.log(err)

        dispatch(`set_${what}_comment_requesting`, false)
      })
  }

  return (
    <section
      styleName={isNew ? 'new-comment-form' : 'update-comment-form'}
      className={isNew ? 'new-comment-form' : 'update-comment-form'}
    >
      <div styleName={`comment-form ${! comments ? 'no-comments' : ''}`}>
        {isNew &&
          <div
            styleName="comment-heading"
            className={comments ? 'hidden' : ''}
          >
            <h3>Kommentera</h3>
          </div>
        }

        {isUpdate && <h2 styleName="heading">Redigera kommentar</h2>}
        {Boolean(error) && <p styleName="error">{error}</p>}

        <form onSubmit={onSubmit} styleName="comment-form-element">
          <section styleName={`text ${striptags(text) ? '' : 'placeholder'}`}>
            <Quill value={text} onChange={onChange} />
          </section>

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
      </div>
    </section>
  )
}

export default commentFormMaker
