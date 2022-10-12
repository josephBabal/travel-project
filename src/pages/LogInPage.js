import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LogInPage(props) {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  })

  const [loginStatus, setLoginStatus] = useState('')
  const [wrongInfo, setWrongInfo] = useState(false)
  const navigate = useNavigate() 

  const handleForm = (event) => {
    setWrongInfo(false)
    const {name, value} = event.target

    setLoginInfo(oldInfo => ({
      ...oldInfo,
      [name] : value
    }))
  }

  const handleLoginSubmit = async(event) => {
    event.preventDefault()
    const postUrl = 'http://localhost:3000/login/post'
    if (loginInfo.username === "" || loginInfo.password === "") {
      console.log("login fields not filled")
    } else {
      try {
        const res = await axios.post(postUrl, {
          username: loginInfo.username,
          userPassword: loginInfo.password
        })
        console.log(res)
        if (res.data.message) {
          setLoginStatus(res.data.message)
          setWrongInfo(true)
        } else {
          const {username, userId} = res.data[0]
          console.log("username and userId:", username, userId)
  
          // setting user
          props.updateUser(res.data[0])
          // setting login to true
          props.handleLogin()

          // store the user in localStorage when user refreshes or leaves/comes back
          // stringify res.data[0] since it's an object and not a string since local storage stores strings
          localStorage.setItem('user', JSON.stringify(res.data[0]))
          console.log(res.data)

          navigate('/')
          document.body.classList.remove('login-background') 
          console.log("login status",loginStatus)
        }
      } catch(err) {
        console.log(err)
      }
    }
  }

  

  // const handleLoginSubmit = (event) => {
  //   event.preventDefault()
  //   const postUrl = 'http://localhost:3001/login/post'
  //   axios.post(postUrl, {
  //     username: loginInfo.username,
  //     userPassword: loginInfo.password,
  //   }).then((response) => {
  //     console.log(response)
  //     // sets the message if it returns a message
  //     if (response.data.message) {
  //       setLoginStatus(response.data.message)
  //     } else {
  //       // sets it as password if there is a user
  //       // setLoginStatus(response.data[0].userPassword)    

  //       const {username, userId} = response.data[0]
  //       // props.updateUser(username, userId)
  //       console.log("username and userId:", username, userId)

  
  //       props.updateUser(response.data[0])

  //       props.handleLogin()
  //       navigate('/')
  //       document.body.classList.remove('login-background') 
  //       console.log(loginStatus)
  //     }
  //   })
  // }


  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-title"> <h2> MY JOURNEY </h2> </div>

        <form onSubmit={handleLoginSubmit}>
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
            {wrongInfo ? <label htmlFor="username" className="wrong-login"> Incorrect Username </label> : <label htmlFor="username"> Username </label> }
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
            {wrongInfo ? <label htmlFor="username" className="wrong-login"> Incorrect Password </label> : <label htmlFor="password"> Password </label>}
          </div>

          <div className="login-btn-container">
            <input
              type="button" 
              id="login-create-account-btn"
              value="Create Account" 
              onClick={() => {
                navigate('/createAccount')
              }}
            />
            <input type="submit" id="login-btn" value="Login"/>
          </div>
        </form> 
      </div>
    </div>
  )
}

