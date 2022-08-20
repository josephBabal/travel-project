import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LogInPage(props) {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  })

  const [loginStatus, setLoginStatus] = useState('')

  const navigate = useNavigate() 



  const handleForm = (event) => {
    const {name, value} = event.target

    setLoginInfo(oldInfo => ({
      ...oldInfo,
      [name] : value
    }))
  }

  // const handleLoginSubmit = async(event) => {
  //   event.preventDefault()
  //   if (loginInfo.username === "" || loginInfo.password === "") {
  //     console.log("login fields not filled")
  //   } else {
  //     try {
  //       const res = axios.post('http://localhost:3001/login/post', {
  //         username: loginInfo.username,
  //         userPassword: loginInfo.password
  //       })
  //       if (res.message) {
  //         setLoginStatus(res.message)
  //       } else {
  //         console.log("you are logged in", res)
  //         // props.updateUser(response.data[0].password)
  //         props.handleLogIn()
  //         setLoginStatus(res)
  //         navigate('/')
  //       }
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   }
  // }

  

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    const postUrl = 'http://localhost:3001/login/post'
    axios.post(postUrl, {
      username: loginInfo.username,
      userPassword: loginInfo.password,
    }).then((response) => {
      console.log(response)
      // sets the message if it returns a message
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        // sets it as password if there is a user
        // setLoginStatus(response.data[0].userPassword)    

        const {username, userId} = response.data[0]
        // props.updateUser(username, userId)
        console.log("username and userId:", username, userId)

  
        props.updateUser(response.data[0])

        props.handleLogin()
        navigate('/')
        document.body.classList.remove('login-background') 
        console.log(loginStatus)
      }
    })
  }


  return (
    <div className="login-container">
      <div className="login-title"> <h2> MY JOURNEY </h2> </div>

      <form /*onSubmit={handleLoginSubmit}*/ onSubmit={handleLoginSubmit}>
        <div className="login-form">
          <input 
            type="text" 
            name="username" 
            id="username"
            value={loginInfo.username}
            onChange={handleForm}
            required
          />
          <span></span>
          <label htmlFor="username"> Username </label>
        </div>

        <div className="login-form"> 
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={loginInfo.password}
            onChange={handleForm}
            required
          />
          <span></span>
          <label htmlFor="password"> Password </label>
        </div>

        <div className="login-btn-container">
          <input
            type="button" 
            className="login-create-account-btn"
            value="Create Account" 
            onClick={() => {
              navigate('/createAccount')
            }}
          />
          <input type="submit" className="login-btn" value="Login"/>
        </div>

        {useEffect(() => {
          document.body.classList.remove('background-img')
          // document.body.classList.add('profile-background')
          document.body.classList.add('login-background')
        },[])}

      </form> 
      <h2> {loginStatus} </h2>
    </div>
  )
}

