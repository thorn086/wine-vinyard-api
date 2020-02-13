const knex = require('knex')
const app = require('./app')
const { PORT,CLIENT_ORIGIN} = require('./config')

const db =knex({
  client: 'pg',
  connection: CLIENT_ORIGIN
})
app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
