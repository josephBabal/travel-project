import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { IoIosArrowRoundBack } from "react-icons/io"
import { classnames } from 'classnames'


export default function CreateAccount() {
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    userId: nanoid()
  })

  const [isUsernameTaken, setIsUsernameTaken] = useState(false)
  const [samePassword, setSamePassword] = useState(true)
  const [isValid, setIsValid] = useState(true)

  const navigate = useNavigate() 

  const handleForm = (event) => {
    const {name, value} = event.target

    // rest values
    setIsValid(true)
    setIsUsernameTaken(false)
    setSamePassword(true)
    setAccountInfo(oldInfo => ({
      ...oldInfo,
      [name] : value
    }))
  }


  // async function checkUsername() {
  //   const postUrl = 'http://localhost:3001/createAccount/checkUsername'
  //   try {
  //     const res = await axios.post(postUrl, {
  //       username: accountInfo.username
  //     })
  //     console.log("Res:", res)
  //     if (res.data.message) {
  //       setIsUsernameTaken(val => !val)
  //     }

  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  async function makeAccount() {
    try {
      // setSamePassword(false)
      // setIsUsernameTaken(false)
      navigate('/')
      console.log("user id is: ", accountInfo.userId)
      const postUrl = 'http://localhost:3001/createAccount/post'
      const res = await axios.post(postUrl, {
        username: accountInfo.username,
        userId: accountInfo.userId,
        userPassword: accountInfo.password,
        userPasswordConfirm: accountInfo.passwordConfirm
      })
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }

  
  const handleSubmit = async(event) => {
    event.preventDefault()
    if (accountInfo.username === "" || accountInfo.password === "" ||
      accountInfo.passwordConfirm === "") {
        setIsValid(false)
      if (accountInfo.password !== accountInfo.passwordConfirm) {
        setSamePassword(false)
      }
      return
    } else {
      const postUrl = 'http://localhost:3001/createAccount/checkUsername'
      try {
        const res = await axios.post(postUrl, {
          username: accountInfo.username
        })
        console.log("Res:", res)
        if (res.data.message) {
          setIsUsernameTaken(true)
        } else {
          if (accountInfo.password === accountInfo.passwordConfirm) {
            makeAccount()
          } else {
            setSamePassword(false)
            setIsValid(false)
            return
          }
        }
      } catch(err) {
        console.log(err)
      }
    } 
  }

  console.log(accountInfo)
  console.log(isUsernameTaken)


  return (
    <div className="account-container">
      <IoIosArrowRoundBack className="account-back-btn" onClick={() => navigate('/')} />
      <div className="account-title"> <h2> MY JOURNEY </h2> </div>

      <form onSubmit={handleSubmit}>
        <div className="account-form">
          <input 
            type="text" 
            name="username" 
            id="username"
            onChange={handleForm}
            value={accountInfo.username}
            maxLength={20}
            required
          />
          <span></span>

          {isUsernameTaken ? <label htmlFor="username" className="username-taken"> Error username taken </label> : <label htmlFor="username" className="account-user"> Username </label>}
        </div>

        <div className="account-form"> 
          <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={handleForm}
            value={accountInfo.password}
            maxLength={30}
            required
          />
          <span></span>
          {samePassword === false ? <label htmlFor="password" className="password-not-match"> Password does not match </label> : <label htmlFor="password"> Password </label> }
        
        </div>

        <div className="account-form"> 
          <input 
            type="password" 
            name="passwordConfirm" 
            id="passwordConfirm" 
            onChange={handleForm}
            value={accountInfo.passwordConfirm}
            maxLength={30}
            required
          />
          <span></span>
          {samePassword === false ? <label htmlFor="passwordConfirm" className="password-not-match"> Password does not match </label> : <label htmlFor="passwordConfirm"> Password Confirmation </label> }
        </div>

        {/* {isValid === false ? <p className="invalid-str-account"> Invalid username or passwords do not match </p> : <p></p> } */}

        <div className="account-btn-container">
          <input
            type="submit" 
            className="create-account-btn" 
            value="Create Account" 
            // onClick={handleSubmit}
          />

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

