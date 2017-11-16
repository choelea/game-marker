const express = require('express')
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` })
const bodyParser = require('body-parser')
const route = require('./routes')
const logger = require('./utils/logger')
const accessLogger = require('./middlewares/accessLogger')
const respond = require('./middlewares/respond')

// starting express
const app = express()

app.use(accessLogger)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', route)

app.use(respond)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.code = '404'
  err.message = 'Request resource doesn\'t exist'
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // render the error page
  if (err) { logger.error(err) }
  res.status(err.status || 500)
  res.json({ code: err.code || 500, message: err.message })
})

module.exports = app
