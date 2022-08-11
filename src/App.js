import React, {useState}from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Friends from './pages/Friends'
import AddReview from './pages/AddReview'
import UserPost from './pages/UserPost'
import ErrorPage from './pages/ErrorPage'
import Profile from './pages/Profile'
import { FaJournalWhills } from 'react-icons/fa'
import { nanoid } from 'nanoid'

export default function App() {
  const [userPost, setUserPost] = useState([])

  const [users, setUsers] = useState(makeUser())

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
          {/* <Navbar /> */}
        <main>
          {/* <div className="background-img"></div>
          <div className="general-post"></div> */}
        </main>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/friends" element={<Friends />} /> 
          <Route path="/userPost" element={<UserPost />} />
          <Route path="/addReview" element={<AddReview
             username={users.username} userId={users.id} />} 
          /> 
          <Route path="/profile/" element={<Profile />} /> 
          <Route path="/profile/:username" element={<Profile />} /> 
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <footer></footer>
      </Router>
    </div>
  )
}