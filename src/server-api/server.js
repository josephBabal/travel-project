const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

// postData sql database
const dbPostData = mysql.createPool({
  host: 'localhost',
  user: 'joseph',
  password: 'Mbli8Okin',
  database: 'postData'
});

// middleware functions
app.use(cors())
app.use(express.json()) // you can grab stuff from front end to back end req.body
app.use(bodyParser.urlencoded({extended: true}))



app.post("/addReview/post", (req, res) => {
  const username = req.body.username
  const userId = req.body.userId
  const title = req.body.title
  const dateTraveled = req.body.postDate
  const rating = req.body.postRating
  const postDescription = req.body.postDescription
  const photo = req.body.postPhoto
  
  const sqlInsert = "INSERT INTO postData (username, userId, title, dateTraveled, rating, postDescription, photo) VALUES (?,?,?,?,?,?,?)";
  dbPostData.query(sqlInsert, [username, userId, title, dateTraveled, rating, postDescription, ' + photo+ '], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
    }
  })
})
 
// Testing database
// app.get('/', (req, res) => {
//   // sql insert statment
//   const sqlInsert = (
//     "INSERT INTO postData (username, userId, postTitle, postDate, postRating, postDescription, postPhoto) VALUES('John', 0 , 'paris', '12/2/22', 5, cool);"
//   )
//   dbPostData.query(sqlInsert, (err, result) => {
//     res.send('hello world');
//   })
// })


app.get('*', (req, res) => {
  res.status(404).send("Error page")
});

app.listen(3001, () => {
  console.log('running on port 3001')
})