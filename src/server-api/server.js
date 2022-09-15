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


// var allowCrossDomain = (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// }

// middleware functions
app.use(cors())
app.use(express.json()) // you can grab stuff from front end to back end req.body
app.use(bodyParser.urlencoded({extended: true}))



// app.configure(function() {
//   app.use(cors())
//   app.use(express.json()) // you can grab stuff from front end to back end req.body
//   app.use(bodyParser.urlencoded({extended: true}))
//   app.use(allowCrossDomain) 
// })

app.get("/profile/:username/userPost", (req, res) => {
  const usernameParam = req.params.username
  const sqlGetUserPost = "SELECT * FROM postData WHERE username = ?";
  dbPostData.query(sqlGetUserPost, [usernameParam], (err, result) => {
    console.log("user post data: ", result)
    if (err) {
      res.send({err: err})
    } 
    
    // if reviews exist, send result to front end, else send err message
    if (result.length > 0) {
      res.send(result)
    } else {
      res.send({message: "no reviews"})
    }
  })
})


app.post("/addReview/post", (req, res) => {
  const username = req.body.username
  const userId = req.body.userId
  const title = req.body.title
  const dateTraveled = req.body.postDate
  const rating = req.body.postRating
  const postDescription = req.body.postDescription
  const photo = req.body.postPhoto
  
  const sqlInsert = "INSERT INTO postData (username, userId, title, dateTraveled, rating, postDescription, photo) VALUES (?,?,?,?,?,?,?)";
  dbPostData.query(sqlInsert, [username, userId, title, dateTraveled, rating, postDescription, photo], (err, result) => {
    if (err) {
      res.send(err)
      console.log(err)
    }
    else {
      res.send(result)
      console.log(result)
    }
  })
})


// searching for words in post
app.post('/search/checkInput', (req, res) => {
  const searchValue = req.body.searchValue
  const sqlSelect = "SELECT * FROM postData WHERE username LIKE ? OR title LIKE ?"
  dbPostData.query(sqlSelect, [searchValue, searchValue], (err, result) => {
    if (err) {
      res.send({err: err})
    }
    if (result.length === 0) {
      console.log("no result found")
      res.send({message: 'no results'})
    }
    else {
      console.log(result.length)
      res.send(result)
    }
  })
})

// creating account
app.post('/createAccount/checkUsername', (req, res) => {
  const username = req.body.username
  const sqlSelect = "SELECT * FROM userData WHERE username = ?"
  dbPostData.query(sqlSelect, [username], (err, result) => {
    if (err) {
      res.send({err: err})
    }
    // username is not taken
    if (result.length === 0) {
      console.log(result.length)
      res.send(result)
    }
    else {
      console.log(result.length)
      res.send({message: 'username already used'})
    }
  })
})


app.post('/createAccount/post', (req, res) => {
  const username = req.body.username
  const userId = req.body.userId
  const userPassword = req.body.userPassword
  const userPasswordConfirm = req.body.userPasswordConfirm

  const sqlInsert = "INSERT INTO userData (username, userId, userPassword, userPasswordConfirm) VALUES (?,?,?,?)";
  dbPostData.query(sqlInsert, [username, userId, userPassword, userPasswordConfirm], (err, result) => {
    if (err) {
      res.send({err: err})
    } else {
      res.send(result)
    }
  })
})


app.post('/login/post', (req, res) => {
  const username = req.body.username
  const userPassword = req.body.userPassword
  const sqlSelect = "SELECT * FROM userData WHERE username = ? AND userPassword = ?"
  dbPostData.query(sqlSelect, [username, userPassword], (err, result) => {

    // send is like a return
    if (err) {
      res.send({err: err})
    } 
    
    // if result/user exist, send result to front end, else send err message
    if (result.length > 0) {
      res.send(result)
    } else {
      res.send({message: "wrong username/password"})
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