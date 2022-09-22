import React, {useState, useEffect}from 'react'
// import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Link, useSearchParams} from 'react-router-dom'
import Home from './pages/Home'
// import Friends from './pages/Friends'
import AddReview from './pages/AddReview'
import ErrorPage from './pages/ErrorPage'
import Profile from './pages/Profile'
import LogInPage from './pages/LogInPage'
import CreateAccount from './pages/CreateAccount'
import SearchPage from './pages/SearchPage'
// import { FaJournalWhills } from 'react-icons/fa'
// import axios from 'axios'

export default function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const [user, setUser] = useState({
    username: '',
    userId: ''
  })
  console.log(user)

  function updateUser(value) {
    // destructuring object (response.data[0]) and getting username and userId from it
    const {username, userId} = value
    setUser(old => (
      {...old, 
      username: username,
      userId: userId
    }))
  }

  function handleLogin() {
    setIsloggedIn(true)
    console.log(isLoggedIn)
  }

  function handleLogout() {
    setUser(old => ({
      ...old,
      username: '',
      userId: ''
    }))
    localStorage.clear()
    setIsloggedIn(false)
  }

  useEffect(() => {
    // document.body.classList.add('background-img')

    // getting user from local storage
    const loggedInUser = localStorage.getItem("user");
    console.log("logged in user:" , loggedInUser)

    // if there is a user, parse the array/object and set username and useId
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setUser(old => ({
        ...old,
        username: foundUser.username,
        userId: foundUser.userId
      }))
      setIsloggedIn(true)
      console.log("found user", foundUser)
    }
  }, [])

  console.log("user is:", user.username)

  return (
    <div>
      <Router>
        {/* {isLoggedIn ? <Navbar username={user.username} /> : null } */}

        {isLoggedIn === false ? 
          <Routes>
            <Route path="/" 
              element={<LogInPage 
                updateUser={updateUser} 
                handleLogin={handleLogin} />} 
            /> 
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Home username={user.username}/>} />
            {/* <Route path="/home" element={<Home />} /> */}
            {/* <Route path="/friends" element={<Friends />} />  */}
            {/* <Route path="/userPost" element={<UserPost />} /> */}
            <Route path="/addReview" 
              element={<AddReview
                username={user.username} 
                userId={user.userId} />} 
            /> 
            {/* <Route path="/profile" element={<Profile username={user.username} userId={user.userId} />} /> */}
            <Route path={`/profile/${user.username}`}  
              element={<Profile 
                username={user.username} 
                userId={user.userId} 
                handleLogout={handleLogout} />}
            /> 

            <Route path={'/search'} element={<SearchPage username={user.username}/>} />

            {/* <Route path="/profile/:username" element={<Profile />} />  */}
            {/* <Route path="/login" element={<LogInPage/>} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        }
      </Router>
      
    </div>
  )
}