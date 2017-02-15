import {match, RouterContext} from 'react-router'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
import React from 'react'

import {serverStore} from 'common/store'
import Recipe from 'server/models/recipe'
import routes from 'common/routes'
import User from 'server/models/user'

const handleRouter = (req, res, renderProps) => {
  const production = process.env.NODE_ENV === 'production'
  const store = serverStore()

  if (req.user) {
    const {_id, firstName, lastName, fullName, email, photo} = req.user

    store.dispatch({
      type: 'set_user',
      payload: {
        _id: String(_id),
        firstName,
        lastName,
        fullName,
        email,
        photo
      }
    })
  }

  store.dispatch({
    type: '@@router/LOCATION_CHANGE',
    payload: {
      action: "POP",
      hash: "",
      key: "",
      pathname: req.path,
      query: {},
      search: "",
      state: null
    }
  })

  const state = JSON.stringify(store.getState())

  const render = renderToString(
    <Provider store={store}>
      <RouterContext {... renderProps} />
    </Provider>
  )

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="uft-8">
    <title>nomnoms</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    ${production ? '<link rel="stylesheet" href="/dist/main.css">' : ''}
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
  </head>
  <body>
    <div id="app">${render}</div>
    <script>
      window.__PRELOADED_STATE__ = ${state}
      window.node_env = ${JSON.stringify(process.env.NODE_ENV)}
    </script>
    <script src="/dist/bundle${production ? '' : '-dev'}.js"></script>
  </body>
</html>`

  res.send(html)
}

const handleRedirect = (res, redirectLocation) => {
  res.redirect(redirectLocation.pathname + redirectLocation.search)
}

const handleNotFound = res => {
  res.status(204).send('Not found.')
}

const handleError = (res, err) => {
  res.status(500).send(err.message)
}

const reactRoutes = (req, res) => {
  match({routes, location: req.path}, (err, redirectLocation, renderProps) => {
    if (err) {
      handleError(res, err)
    } else if (redirectLocation) {
      handleRedirect(res, redirectLocation)
    } else if (renderProps) {
      handleRouter(req, res, renderProps)
    } else {
      handleNotFound(res)
    }
  })
}

export default reactRoutes
