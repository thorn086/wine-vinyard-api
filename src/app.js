require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV} = require('./config')
const errorHandler = require('./error-handler')
const app = express()
const wineRouter =require('./wine/wine-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const morganSetting = (NODE_ENV === 'production' 
  ? 'tiny'
  : 'common')

app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(errorHandler)
app.use('/api/wine', wineRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

module.exports = app