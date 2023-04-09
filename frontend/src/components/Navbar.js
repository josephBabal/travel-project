import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import { IoIosMenu } from "react-icons/io";
import '../styles/Navbar.css'


export default function Navbar({username}) {
  console.log("props username:", username)

  const [isDropDownClick, setIsDropDownClicked] = useState(false)
  const handleDropDown = () => {
    setIsDropDownClicked(old => !old)
  }

  
  return (
    <div id="navbar-page-container">
      <div className="normal-navbar-container">
        <h1 className="title-site"> My Journey</h1>       
        <nav className="main-nav">
          <ul className="nav-items">
            {/* home - all/general feed */}
            <li> <NavLink to="/"> Home </NavLink> </li>
            <li> <NavLink to="/addReview"> Add Review </NavLink></li>
            <li> <NavLink to="/search"> Search </NavLink> </li>
            <li> <NavLink to={`/profile/${username}`}> Profile</NavLink> </li>
          </ul>
        </nav>
      </div>

      <div className="resize-nav-container" style={isDropDownClick ? {backgroundColor: "rgb(63, 63, 81)", transform: "translateY(0px)"}: {}}>
        <div className="dropdown">
          <input type="checkbox" id="dropdown-checkbox" onClick={() => handleDropDown()}/>
          <label htmlFor="dropdown-checkbox"><IoIosMenu className="dropdown-icon"/></label>
          <nav className="resize-nav">
            <ul className="dropdown-items">
              <div className="nav-top-separator"></div>
              <li> <NavLink to="/" className="dropdown-home" > Home </NavLink> </li>
              <div className="nav-separator"></div>
              <li> <NavLink to="/addReview" className="dropdown-addReview"> Add Review </NavLink></li>
              <div className="nav-separator"></div>
              <li> <NavLink to="/search" > Search </NavLink> </li>
              <div className="nav-separator"></div>
              <li><NavLink to={`/profile/${username}`} className="dropdown-profile"> Profile</NavLink> </li>
            </ul>
          </nav>
        </div>
        <h1 className="title-site"> My Journey</h1>
        
      </div>
    </div>
  )
}
