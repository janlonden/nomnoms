import CSSModules from 'react-css-modules'
import React, {PropTypes} from 'react'
import req from 'axios'

import Photo from 'common/components/photo/photo'

import styles from './photo-upload.styl'

const PhotoUpload = ({
  dispatch, isUpdate = false, photo, photoError, request, uploading, what
}) => {
  const newOrUpdate = isUpdate ? 'update' : 'new'

  const onChange = ({target}) => {
    const photo = target.files[0]

    if (! photo || uploading) {
      return
    }

    const isValidFileFormat =
      photo.name.split('.').pop().toLowerCase() === 'jpg'

    if (! isValidFileFormat) {
      dispatch(
        `set_${newOrUpdate}_${what}_photo_error`,
        'Filformatet måste vara jpg.'
      )

      return
    } else if (photo.size > (4 * 1024 * 1024)) {
      dispatch(
        `set_${newOrUpdate}_${what}_photo_error`,
        'Filstorleken får inte överstiga 4 MB.'
      )

      return
    }

    const payload = new FormData()

    payload.append('photo', photo)

    const section = what === 'recipe' ? 'recipes' : 'users'

    dispatch(`set_${newOrUpdate}_${what}_uploading`, true)

    req.post(`https://londen.se/nomnoms/photos/${section}/upload.php`, payload)
      .then(res => {
        dispatch(`set_${newOrUpdate}_${what}_photo`, res.data)
        dispatch(`set_${newOrUpdate}_${what}_uploading`, false)
      })

      .catch(err => {
        dispatch(`set_${newOrUpdate}_${what}_uploading`, false)

        dispatch(
          `set_${newOrUpdate}_${what}_photo_error`,
          'Fotot kunde inte laddas upp. ' +
          'För att ladda upp bilder måste du använda ' +
          'säkra versionen av nomnoms: https://nomnoms.herokuapp.com/'
        )
      })
  }

  if (uploading && photoError) {
    dispatch(`set_${newOrUpdate}_${what}_photo_error`, '')
  }

  return (
    <section styleName={`root ${what === 'user' ? 'user-photo': ''}`}>
      <div styleName="photo">
        <Photo photo={photo} what={what} />
      </div>

      <label
        styleName={`button label ${uploading ? 'uploading' : ''}`}
        htmlFor="input-file"
      >
        <span>{uploading ? 'Laddar upp' : 'Välj foto'}</span>
      </label>

      {Boolean(photoError) && <p styleName="error">{photoError}</p>}

      <input
        id="input-file"
        name="photo"
        onChange={onChange}
        styleName="input-file"
        type="file"
      />
    </section>
  )
}

PhotoUpload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool.isRequired,
  photo: PropTypes.string.isRequired,
  photoError: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  what: PropTypes.string.isRequired
}

export default CSSModules(PhotoUpload, styles, {allowMultiple: true})
