import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Friends from './pages/Friends'
import AddReview from './pages/AddReview'
import UserPost from './pages/UserPost'
import ErrorPage from './pages/ErrorPage'
import Profile from './pages/Profile'

export default function App() {
  const [userPost, setUserPost] = React.useState([])
  
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
          <Route path="/addReview" element={<AddReview />} /> 
          <Route path="/profile/" element={<Profile />} /> 
          <Route path="/profile/:username" element={<Profile />} /> 
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <footer></footer>
      </Router>
    </div>
  )
}