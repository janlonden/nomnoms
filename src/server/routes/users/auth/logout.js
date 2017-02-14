const logout = ({authenticated, req, error, success}) => {
  const response = {
    error: 'Inte inloggad.',
    success: 'Utloggad.'
  }

  if (authenticated) {
    req.logout()

    success({message: response.success})
  } else {
    error(response.error)
  }
}

export default logout
