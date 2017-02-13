import {Link} from 'react-router'
import React from 'react'

import Photo from 'common/components/photo/photo'
import Likes from 'common/components/recipes/likes'

import date from 'common/functions/date'

const userRecipe = (recipe, index, setInput) =>
  <article key={index} styleName="box recipe">
    <div styleName="photo">
      <Photo photo={recipe.photo} what="recipe" />
    </div>

    <div styleName="content">
      <h3 styleName="title">
        <Link to={`/recept/${recipe._id}`} styleName="link">
          {recipe.title}
        </Link>
      </h3>

      {(
        Boolean(recipe.likers.length) ||
        Boolean(recipe.comments.length)
      ) &&
        <div styleName="numbers">
          {Boolean(recipe.likers.length) &&
            <Likes
              _id={recipe._id}
              likers={recipe.likers}
              span={true}
            />
          }

          {Boolean(recipe.comments.length) &&
            <span styleName="comments">
              {recipe.comments.length}

              <span className="hidden"> Kommentarer</span>
            </span>
          }
        </div>
      }

      <p styleName="author-and-date">
        Upplagd {date(recipe.createdAt)}
      </p>

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
    </div>
  </article>

export default userRecipe
