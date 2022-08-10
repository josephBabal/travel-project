const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'joseph',
  password: 'Mbli8Okin',
  database: 'postData'
});

app.use(cors())
app.use(express.json()) // you can grab stuff from front end to back end req.body
app.use(bodyParser.urlencoded({extended: true}))


app.get('*', (req, res) => {
  res.status(404)
});

app.listen(3001, () => {
  console.log('running on port 3001')
})