import React from 'react'
import {Link} from 'react-router-dom'
import LogInPage from './LogInPage'
import CreateAccount from './CreateAccount'
import { useNavigate } from "react-router-dom"
import '../styles/Landing.css'
import '../styles/LoginAndAccount.css' 

export default function StartPage() {
  const navigate = useNavigate()
  return ( 
    <div className="login-background">
      <nav className="startPage-nav">
      <h2 className="website-title-account"> My Journey </h2>
        <ul className="startPage-nav-items"> 
          <li className="startPage-nav-login"><Link to ="/login"> Login </Link> </li>
        </ul>
      </nav>

      <div className="startPage-content">
          <h2 className="startPage-info"> Write reviews of destinations 
            or restaurants you visted
          </h2>
          <div> 
            <input 
              className="get-started-btn"
              type="submit" 
              value="Get Started"
              onClick={() => navigate('/createAccount')}
          /> 
          </div>
        </div>
      
    </div>
  )
}