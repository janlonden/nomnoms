import 'core-js/fn/promise'
import 'core-js/fn/string/includes'

import {match, Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import React from 'react'

import {clientStore} from 'common/store'
import routes from 'common/routes'

const store = clientStore(window.__PRELOADED_STATE__)
const history = syncHistoryWithStore(browserHistory, store)

match({history, routes}, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,

    document.querySelector('#app')
  )
})

if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
