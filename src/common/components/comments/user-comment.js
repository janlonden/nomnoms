import {Link} from 'react-router'
import React from 'react'
import striptags from 'striptags'

import date from 'common/functions/date'

const userComment = (comment, index, setInput) =>
  <article key={index} styleName="box comment">
    <p styleName="text">
      {striptags(comment.text).length > 80
        ? `${striptags(comment.text).substring(0, 80)} ...`
        : `${striptags(comment.text)}`
      }
    </p>

    <p styleName="date">
      Inlagd i <Link to={`/recept/${comment.recipeId}`}>{comment.recipe}</Link>

      <span> {date(comment.createdAt)}</span>
    </p>

    <ul styleName="edit-nav">
      <li>
        <a
          href="#"
          onClick={setInput('updateComment', comment._id)}
          styleName="edit"
          title="Redigera"
        >
          <span className="hidden">Redigera</span>
        </a>
      </li>

      <li>
        <a
          href="#"
          onClick={setInput('removeComment', comment._id)}
          styleName="remove"
          title="Ta bort"
        >
          <span className="hidden">Ta bort</span>
        </a>
      </li>
    </ul>
  </article>

export default userComment
