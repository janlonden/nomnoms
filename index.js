import bodyParser from 'body-parser'
import connectMongo from 'connect-mongo'
import csshook from 'css-modules-require-hook/preset'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import favicon from 'serve-favicon'

import apiRoutes from 'server/routes/api-routes'
import passport from 'server/passport'
import reactRoutes from 'server/routes/react-routes'

mongoose.connect(
  process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://127.0.0.1:27017/nomnoms'
)

mongoose.Promise = global.Promise

const MongoStore = connectMongo(session)
const app = express()

const secret = process.env.SESSION_SECRET
  ? process.env.SESSION_SECRET
  : 'loremipsum'

const port = process.env.PORT
  ? process.env.PORT
  : 3000

app.use('/dist', express.static('dist'))
app.use(favicon('/dist/favicon.ico'))
app.use(bodyParser.json())

app.use(session({
  secret: secret,
  resave: false,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  saveUninitialized: false,

  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),

  unset: 'destroy'
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/api', apiRoutes)
app.use(reactRoutes)
app.listen(port)

console.log(`listenin'`)
