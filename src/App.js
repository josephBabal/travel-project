import React, {useState, useEffect}from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Link, useSearchParams} from 'react-router-dom'
import Home from './pages/Home'
import Friends from './pages/Friends'
import AddReview from './pages/AddReview'
import UserPost from './pages/UserPost'
import ErrorPage from './pages/ErrorPage'
import Profile from './pages/Profile'
import LogInPage from './pages/LogInPage'
import CreateAccount from './pages/CreateAccount'
// import { FaJournalWhills } from 'react-icons/fa'
import { nanoid } from 'nanoid'
// import axios from 'axios'

export default function App() {
  // const [userPost, setUserPost] = useState([])

  const [isLoggedIn, setIsloggedIn] = useState(false)

  const [user, setUser] = useState({
    username: '',
    userId: ''
  })

  console.log(user)


  // function updateUser(value1, value2) {
  //   console.log("value is: ", value1)
  //   setUser(old => (
  //     {...old, 
  //     username: value1, 
  //     userId: value2
  //   })
  //   )
  // }

  function updateUser(value) {
    // destructuring object (response.data[0]) and getting username and userId from it
    const {username, userId} = value
    setUser(old => (
      {...old, 
      username: username,
      userId: userId
    })
    )
  }


  function handleLogin() {
    setIsloggedIn(value => !value)
    console.log(isLoggedIn)
  }

  return (
    <div>
      <Router>
          {isLoggedIn ? <Navbar username={user.username} /> : null }

          {isLoggedIn === false ? 
            <Routes>
              <Route path="/" element={<LogInPage updateUser={updateUser} handleLogin={handleLogin} />} /> 
              <Route path="/createAccount" element={<CreateAccount />} />
            </Routes>
            :
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/friends" element={<Friends />} />  */}
              <Route path="/userPost" element={<UserPost />} />
              <Route path="/addReview" element={<AddReview
                username={user.username} userId={user.userId} />} 
              /> 
              {/* <Route path="/profile" element={<Profile username={user.username} userId={user.userId} />} /> */}
              <Route path={`/profile/${user.username}`}  element={<Profile username={user.username} userId={user.userId}/>} /> 
              {/* <Route path="/profile/:username" element={<Profile />} />  */}
              {/* <Route path="/login" element={<LogInPage/>} /> */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          }
      </Router>
      
    </div>
  )
}