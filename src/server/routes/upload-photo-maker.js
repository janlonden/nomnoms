import fs from 'fs'
import multer from 'multer'
import uniqid from 'uniqid'

const uploadPhotoMaker = what => ({
  authenticated,
  req,
  res,
  error,
  success
}) => {
  const response = {
    auth: 'Måste vara inloggad för att ladda upp bilder.',
    error: 'Kunde inte ladda upp bild.'
  }

  if (! authenticated) {
    error(response.auth)

    return
  }

  const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(
      null,
      `dist/images/${what}`
    ),

    filename: (req, file, callback) => callback(
      null,
      `${uniqid()}.${file.originalname.split('.').pop()}`
    )
  })

  const limits = {
    fileSize: 4 * 1024 * 1024
  }

  const upload = multer({storage, limits}).single('photo')

  upload(req, res, err => {
    if (err) {
      error(response.error)

      return
    }

    const {filename} = req.file

    success({data: filename})
  })
}

export default uploadPhotoMaker
