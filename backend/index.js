const connectToMongo = require('./db')
const express = require('express')

connectToMongo();
const app = express()
const port = 5000
// Middelware
app.use (express.json());

//Avaible Routes
app.use ('/api/auth',require('./routes/auth'))
app.use ('/api/notes',require('./routes/note'))

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`)
})
