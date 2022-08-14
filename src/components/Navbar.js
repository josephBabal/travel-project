import React from 'react'
import {Link} from 'react-router-dom'



export default function Navbar() {

  return (
    <div className="navbar-container">
      <h1 className="title-site"> My Journey</h1>
      <nav>
        <ul className="nav-items">
          {/* home - all/general feed */}
          <li> <Link to="/" className="nav-home" > Home </Link> </li>
          {/* friends - friends posts */}
          <li> <Link to="/friends" className="nav-friends"> Friends </Link></li>
          {/* adding a review */}
          <li> <Link to="/addReview" className="nav-addReview"> Add Review </Link></li>
          {/* your posts, bio, settings, add friend, etc */}
          <div className="profile-dropDown-container"> 
            <li> <Link to="/profile" className="nav-profile"> Profile</Link> </li>
              <div className="profile-dropDown-menu ">
                <ul className="profile-nav-list">
                  <li> <Link to="/logIn" className="logOut"> Log Out </Link></li>
                </ul>
              </div>
          </div>
          
          
          
          {/* <div className="active"></div> */}
        </ul>
        </nav>
    </div>
  )
}
