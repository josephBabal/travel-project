import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { IoIosArrowRoundBack } from "react-icons/io"
// import { classnames } from 'classnames'


export default function CreateAccount() {
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    userId: nanoid()
  })


  const [isUsernameTaken, setIsUsernameTaken] = useState(false)
  const [samePassword, setSamePassword] = useState(true)
  const [criteria, setCriteria] = useState(false)
  const [metLength, setMetLength] = useState(false)
  const [hasLowercase, setHasLowercase] = useState(false)
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasSpecialChar, setHasSpecialChar] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)

  const navigate = useNavigate() 

  // stores input and checks if the requirements of the password has been met
  const handleForm = (event) => {
    const {name, value} = event.target
    checkCriteria()

    if (metLength && hasLowercase && hasUppercase && hasSpecialChar && hasNumber) setCriteria(true)
    else setCriteria(false)

    // reset values
    setIsUsernameTaken(false)
    setSamePassword(true)

    // storing input
    setAccountInfo(oldInfo => ({
      ...oldInfo,
      [name] : value
    }))
  }

  // sets values of criteria to true/false depending if the criteria has been met or not
  function checkCriteria() {
    // length  of 8 criteria
    if (accountInfo.password.length >= 8) setMetLength(true) 
    else setMetLength(false)
    
    // at least 1 uppercase letter criteria
    if (accountInfo.password.search(/[A-Z]/) < 0) setHasUppercase(false)
    else setHasUppercase(true) 
    
    // at least 1 owercase letter criteria
    if (accountInfo.password.search(/[a-z]/) < 0) setHasLowercase(false)
    else setHasLowercase(true) 

    // at least 1 special character criteria
    if (accountInfo.password.search(/[#$@!%&*?]/) < 0) setHasSpecialChar(false)
    else setHasSpecialChar(true)

    // at least 1 number criteria
    if (accountInfo.password.search(/[0-9]/) < 0) setHasNumber(false)
    else setHasNumber(true)
  }

  // 
  async function makeAccount() {
    try {
      navigate('/')
      console.log("user id is: ", accountInfo.userId)
      const postUrl = 'http://localhost:3000/createAccount/post'
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

  // form submit function
  const handleSubmit = async(event) => {
    event.preventDefault()
    if (accountInfo.username === "" || accountInfo.password === "" ||
      accountInfo.passwordConfirm === "") {
        setSamePassword(false)
        return
    } else if (accountInfo.password !== accountInfo.passwordConfirm) {
      setSamePassword(false)
      return
    } else if (criteria === false) {
      return
    } else {
      const postUrl = 'http://localhost:3000/createAccount/checkUsername'
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

  // body
  return (
    <div className="login-background">
      <h2 className="website-title-account"> MY JOURNEY </h2>
      <div className="account-container">
        <IoIosArrowRoundBack className="account-back-btn" onClick={() => navigate('/')} />
        <div className="account-title"> <h2> Create Account </h2> </div>

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

          <div>
            <p className="password-requirment-txt">Password requirements: </p> 
            <ul id="password-requirements"> 
              <li className={accountInfo.password.search(/[A-Z]/) < 0 ? "red" : "green"} > 1 uppercase letter </li> 
              <li className={accountInfo.password.search(/[a-z]/) < 0 ? "red" : "green"} > 1 lowercase leter </li> 
              <li className={accountInfo.password.search(/[#$@!%&*?]/) < 0 ? "red" : "green"} > 1 special character</li> 
              <li className={accountInfo.password.search(/[0-9]/) < 0 ? "red" : "green"} > 1 number </li>
              <li className={accountInfo.password.length >= 8 ? "green" : "red"}> Minimum length 8 characters </li> 
            </ul> 
          </div>

          <div className="account-btn-container">
            <input
              type="submit" 
              id="create-account-btn" 
              value="Create Account" 
            />
          </div>
        </form>  
      </div>
    </div>
  )
}

