import react, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'

export default function LogInPage() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    userId: ""
  })

  function handleSubmit(event) {
    event.preventDefault()
  }

  const handleForm = (event) => {
    const {name, value} = event.target

    setUserInfo(oldInfo => ({
      ...oldInfo,
      [name] : value
    }))
  }

  console.log(userInfo)

  return (
    <div className="login-container">
      <div className="login-title"> <h2> MY JOURNEY </h2> </div>

      <form className="login-form">
        <div className="login-form">
          <input 
            type="text" 
            name="username" 
            id="username"
            onChange={handleForm}
            required
          />
          <span></span>
          <label htmlFor="username"> Username </label>
        </div>

        <div className="login-form"> 
          <input 
            type="password" 
            name="pasword" 
            id="password" 
            onChange={handleForm}
            required
          />
          <span></span>
          <label htmlFor="password"> Password </label>
        </div>

        <div className="login-btn-container">
          <input type="button" className="create-account-btn" value="Create Account" />
          <input type="submit" className="login-btn" value="Login" />
        </div>

        {useEffect(() => {
          document.body.classList.remove('background-img')
          // document.body.classList.add('profile-background')
          document.body.classList.add('login-background')
        },[])}

      </form>  
    </div>
  )
}

