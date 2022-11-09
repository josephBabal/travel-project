import React from 'react'
import {Link} from 'react-router-dom'
import { IoIosMenu } from "react-icons/io";



export default function Navbar(props) {
  console.log("props username:", props.username)
  
  return (
    <div className="navbar-page-container">
      <div className="navbar-container">
        <h1 className="title-site"> My Journey</h1>       
        <nav className="main-nav">
          <ul className="nav-items">
            {/* home - all/general feed */}
            <li> <Link to="/" className="nav-home" > Home </Link> </li>
            <li> <Link to="/addReview" className="nav-addReview"> Add Review </Link></li>
            <li> <Link to="/search" > Search </Link> </li>
            <li><Link to={`/profile/${props.username}`} className="nav-profile"> Profile</Link> </li>
          </ul>
        </nav>
      </div>

      <div className="resize-nav-container">
        <h1 className="title-site"> My Journey</h1>
        <div className="dropdown">
          <input type="checkbox" id="dropdown-checkbox"/>
          <label htmlFor="dropdown-checkbox"><IoIosMenu className="dropdown-icon"/></label>
          
            <nav className="resize-nav">
                <ul className="dropdown-items">
                  <li> <Link to="/" className="dropdown-home" > Home </Link> </li>
                  <li> <Link to="/addReview" className="dropdown-addReview"> Add Review </Link></li>
                  <li> <Link to="/search" > Search </Link> </li>
                  <li><Link to={`/profile/${props.username}`} className="dropdown-profile"> Profile</Link> </li>
                </ul>
            </nav>
          </div>
        </div>

    </div>
  )
}
