import React, {useState, useEffect}from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Friends from './pages/Friends'
import AddReview from './pages/AddReview'
import UserPost from './pages/UserPost'
import ErrorPage from './pages/ErrorPage'
import Profile from './pages/Profile'
import LogInPage from './pages/LogInPage'
import CreateAccount from './pages/CreateAccount'
import { FaJournalWhills } from 'react-icons/fa'
import { nanoid } from 'nanoid'

export default function App() {
  // const [userPost, setUserPost] = useState([])

  const [isLoggedIn, setIsloggedIn] = useState(true)
  const [users, setUsers] = useState(makeUser())

  const handleLogIn = () => {
    setIsloggedIn(value => !value)
  }

  function makeUser() {
    return {
      username: "John",
      id: nanoid()
    }
  }

  function createUser() {
    return {
      username: "John",
      id: nanoid()
    }
  }
  
  return (
    <div>
      <Router>
          {isLoggedIn ? <Navbar /> : null }
        <Routes>
          {isLoggedIn === false ? 
            <Route path="/" element={<LogInPage 
              handleLogIn={() => handleLogIn} />} /> :
            <Route path="/" element={<Home />} />
          } 
          <Route path="/createAccout" element={<CreateAccount />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/friends" element={<Friends />} />  */}
          <Route path="/userPost" element={<UserPost />} />
          <Route path="/addReview" element={<AddReview
             username={users.username} userId={users.id} />} 
          /> 
          <Route path="/profile" element={<Profile username={users.username} userId={users.id} />} />
          {/* <Route path={`/profile/:${users.id}`}  element={<Profile />} />  */}
          {/* <Route path="/profile/:username" element={<Profile />} />  */}
          <Route path="/logIn" element={<LogInPage/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <footer></footer>
      </Router>
    </div>
  )
}