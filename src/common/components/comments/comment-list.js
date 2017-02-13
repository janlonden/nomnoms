import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'
import renderHTML from 'react-render-html'

import date from 'common/functions/date'

import styles from './comment-list.styl'

import Avatar from 'common/components/avatar/avatar'

const CommentList = ({comments, setInput, userId}) =>
  <section styleName="root">
    <div styleName="comment-heading"><h3>Kommentarer</h3></div>

    {comments.map((comment, index) =>
      <article key={index} styleName="comment">
        <div styleName="text">
          <div styleName="content">
            {renderHTML(comment.text)}
          </div>

          <div styleName="arrow"></div>

          {userId && userId === comment.authorId &&
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
          }
        </div>

        <footer styleName="meta">
          <div styleName="photo">
            <Avatar
              classes="medium"
              name={comment.author}
              photo={comment.authorPhoto}
            />
          </div>

          <div styleName="author-and-date">
            <span styleName="author">{comment.author} </span>
            <span>{date(comment.createdAt)}</span>
          </div>
        </footer>
      </article>
    )}
  </section>

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  setInput: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

export default CSSModules(CommentList, styles, {allowMultiple: true})
