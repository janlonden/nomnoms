import {Link} from 'react-router'
import React, {PropTypes} from 'react'

import date from 'common/functions/date'

import Likes from 'common/components/recipes/likes'
import Photo from 'common/components/photo/photo'

const RecipeArticles = (recipes, userId) =>
  recipes.map(({
    _id,
    author,
    authorId,
    comments,
    createdAt,
    likers,
    photo,
    title,
  }, index) =>
    <article key={index} styleName="box recipe">
      <div styleName="photo">
        <Photo photo={photo} what="recipe" />
      </div>

      <div styleName="content">
        <h3 styleName="title">
          <Link to={`/recept/${_id}`} styleName="link">{title}</Link>
        </h3>

        <div styleName="numbers">
          <Likes
            _id={_id}
            likers={likers}
            span={! userId || userId === authorId ? true : false}
          />

          {Boolean(comments.length) &&
            <span styleName="comments">
              {comments.length}<span className="hidden"> Kommentarer</span>
            </span>
          }
        </div>

        <div styleName="author-and-date">
          Upplagd av <span styleName="author">{author}</span> {date(createdAt)}
        </div>
      </div>
    </article>
  )

export default RecipeArticles
