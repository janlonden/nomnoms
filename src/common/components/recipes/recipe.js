import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import CSSModules from 'react-css-modules'
import functional from 'react-functional'
import React, {PropTypes} from 'react'
import renderHTML from 'react-render-html'

import date from 'common/functions/date'
import request from 'common/functions/request'

import styles from './recipe.styl'

import Avatar from 'common/components/avatar/avatar'
import CommentList from 'common/components/comments/comment-list'
import Likes from 'common/components/recipes/likes'
import NewComment from 'common/components/comments/form/new-comment'
import Photo from 'common/components/photo/photo'
import Spinner from 'common/components/spinner/spinner'

const Recipe =
  ({input, user, params, recipe, dispatch, newComment, updateComment}) => {

  const {_id} = params
  const {_id: userId} = user

  const setInput = (input, _id) => event => {
    event.preventDefault()

    const {target} = event

    if (input === 'updateRecipe') {
      dispatch('set_update_recipe', recipe)
    }

    if (input === 'updateComment') {
      const comment = recipe.comments.find(comment => comment._id === _id)

      dispatch('set_update_comment', comment)
    }

    if (input === 'removeRecipe') {
      dispatch('set_confirm', {
        item: 'recipe',
        _id,
        authorId: userId
      })
    }

    if (input === 'removeComment') {
      dispatch('set_confirm', {
        item: 'comment',
        _id,
        authorId: userId
      })
    }

    dispatch('set_input', input)
  }

  return ! recipe.title || recipe._id !== _id
    ? <main styleName="center"><Spinner/></main>
    : <main>
        <article styleName="recipe">
          <header styleName="header">
            <section styleName="title center section">
              <h2 styleName="heading">{recipe.title}</h2>

              <Likes
                classes="recipe"
                _id={recipe._id}
                likers={recipe.likers}
                span={! userId || userId === recipe.authorId ? true : false}
              />
            </section>

            <section styleName="meta center section">
              <div styleName="author-photo">
                <Avatar
                  classes="large"
                  name={recipe.author}
                  photo={recipe.authorPhoto}
                />
              </div>

              <div styleName="author-and-date">
                Upplagd av <span styleName="author">{recipe.author} </span>
                {date(recipe.createdAt)}
              </div>

              {userId && userId === recipe.authorId &&
                <ul styleName="edit-nav">
                  <li>
                    <a
                      href="#"
                      onClick={setInput('updateRecipe', recipe._id)}
                      styleName="edit"
                      title="Redigera"
                    >
                      <span className="hidden">Redigera</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      onClick={setInput('removeRecipe', recipe._id)}
                      styleName="remove"
                      title="Ta bort"
                    >
                      <span className="hidden">Ta bort</span>
                    </a>
                  </li>
                </ul>
              }
            </section>

            <section styleName="recipe-photo section">
              <Photo photo={recipe.photo} what="recipe" />
            </section>
          </header>

          <section styleName="description section">
            <h3 styleName="sub-heading">Beskrivning</h3>

            {renderHTML(recipe.description)}
          </section>

          <section styleName="ingredients section">
            <h3 styleName="sub-heading">Ingredienser</h3>

            <ul>
              {recipe.ingredients.map((ingredient, index) =>
                <li key={index}>
                  <b>{ingredient.amount}</b>

                  <span> {ingredient.ingredient}</span>
                </li>
              )}
            </ul>
          </section>

          <section styleName="instructions section">
            <h3 styleName="sub-heading">Instruktioner</h3>

            <ol>
              {recipe.instructions.map((instruction, index) =>
                <li key={index}>{renderHTML(instruction.instruction)}</li>
              )}
            </ol>
          </section>
        </article>

        {Boolean(recipe.comments.length) &&
          <CommentList
            comments={recipe.comments}
            setInput={setInput}
            userId={userId}
          />
        }

        {Boolean(userId) &&
          <NewComment
            comments={recipe.comments.length}
            dispatch={dispatch}
            input={input}
            newComment={newComment}
            recipeId={recipe._id}
            request={request}
            user={user}
          />
        }
      </main>
}

const getRecipe = ({dispatch, params}) => {
  const {_id} = params

  request('getRecipe', {_id})
    .then(({status, payload}) => {
      if (status === 'success') {
        dispatch('set_recipe', payload.data)
      }

      if (status === 'error') {
        console.log(payload)
      }
    })

    .catch(err => {
      console.log(err)
    })
}

Recipe.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newComment: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const stateToProps = state => ({
  input: state.input,
  newComment: state.newComment,
  recipe: state.recipe,
  user: state.user
})

const dispatchToProps = dispatch => ({
  dispatch (type, payload) {
    dispatch({type, payload})
  }
})

const lifeCycleMethods = {
  componentDidMount (props) {
    getRecipe(props)
  },

  componentWillUnmount (props) {
    const {dispatch} = props

    // dispatch('clear_new_comment')
  }
}

export default connect(stateToProps, dispatchToProps)(functional(
  CSSModules(Recipe, styles, {allowMultiple: true}), lifeCycleMethods
))
