import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'

import reducers from './reducers/reducers'

const loggerMiddleware = createLogger()

const serverStore = () => createStore(reducers)

const clientStore = preloadedState => node_env === 'production'
  ? createStore(reducers, preloadedState)
  : createStore(
      reducers,
      preloadedState,
      compose(
        applyMiddleware(loggerMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )

export {serverStore, clientStore}
