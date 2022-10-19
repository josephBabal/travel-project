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

  const handleForm = (event) => {
    const {name, value} = event.target
    checkCriteria()

    if (metLength && hasLowercase && hasUppercase && hasSpecialChar && hasNumber) setCriteria(true)
    else setCriteria(false)

    // reset values
    setIsUsernameTaken(false)
    setSamePassword(true)
    setAccountInfo(oldInfo => ({
      ...oldInfo,
      [name] : value
    }))
  }

  
  function checkCriteria() {
    /*
    const requirments = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{7,}$/
    let found = requirments.test(accountInfo.password)
    console.log("test",found)
    if (found === true) {
      setCriteria(true)
    }
    else {
      setCriteria(false)
    }
    */

    if (accountInfo.password.length >= 8) setMetLength(true) 
    else setMetLength(false)
  
    if (accountInfo.password.search(/[A-Z]/) < 0) setHasUppercase(false)
    else setHasUppercase(true) 
    
    if (accountInfo.password.search(/[a-z]/) < 0) setHasLowercase(false)
    else setHasLowercase(true) 

    if (accountInfo.password.search(/[#$@!%&*?]/) < 0) setHasSpecialChar(false)
    else setHasSpecialChar(true)

    if (accountInfo.password.search(/[0-9]/) < 0) setHasNumber(false)
    else setHasNumber(true)
  }

  async function makeAccount() {
    try {
      // setSamePassword(false)
      // setIsUsernameTaken(false)
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

  
  const handleSubmit = async(event) => {
    event.preventDefault()
    if (accountInfo.username === "" || accountInfo.password === "" ||
      accountInfo.passwordConfirm === "") {
        setSamePassword(false)
        return
    } else if (accountInfo.password !== accountInfo.passwordConfirm) {
      setSamePassword(false)
      return
    } else if (criteria === false || accountInfo.password.length < 8) {
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
    <div className="login-background">
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
              // patten="/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&?]).{9,30}$/"
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

          {/* {criteria === false || accountInfo.password.length < 8 ? <div><p>Password requirements </p> <ul className ="password-requirements"> <li>1 uppercase letter </li> <li>1 lowercase leter </li> <li>1 special character</li> <li> Minimum length 8 characters</li> </ul> </div> : ""} */}

          <div>
            <p>Password requirements </p> 
            <ul> 
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
              // onClick={handleSubmit}
            />

          </div>

        </form>  
      </div>
    </div>
  )
}

