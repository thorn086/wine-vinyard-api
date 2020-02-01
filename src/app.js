require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const errorHandler = require('./error-handler')
const app = express()

const morganSetting = (NODE_ENV === 'production' 
  ? 'tiny'
  : 'common')

app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors({
  origin:CLIENT_ORIGIN
}))

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app