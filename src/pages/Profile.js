import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Post from '../components/Post'
import {FaStar} from 'react-icons/fa'
import { IoMdSettings } from "react-icons/io";

export default function Profile(props) {
  const navigate = useNavigate()
  const {userId} = useParams()
  // const styles= {
  //   backgroundColor: "white"
  // }

  const [userPostData, setUserPostData] = useState([])
  const [setting, setSetting] = useState(false)
  const [backdrop, setBackdrop] = useState(false)

  // getting post data from database and storing in userPostData
  useEffect(() => {
    const getUserPostData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/profile/userPost')
        setUserPostData(res.data)
        console.log(res.data.photo)
      } catch(err) {
        console.log(err)
      }
    }
    getUserPostData()
  }, [])

  const handleSetting = () => {
    setSetting(oldSetting => !oldSetting)
    setBackdrop(oldBackdrop => !oldBackdrop)
  }


  // returning 
  const userPostDataElements = userPostData.map((val) => {
    // Getting rid of {} around date using subString
    const getDate = val.dateTraveled
    const newDate = getDate.substring(1, getDate.length-1)
    console.log(newDate)
    console.log("proifle photo value: ", val.photo)

    const starElements = fillStarArr()

    function fillStarArr() {
      const arr = []
      for (let i = 0; i < 5; i++) {
        arr.push(<FaStar key={i} className="card-star" color={i <= val.rating ? "#FFC107" : "E4E5E9"}/>)
      }
      return arr
    }
  
    return (
      <Post 
        key={val.id}
        userName={val.username}
        title={val.title}
        dateTraveled={newDate}
        rating={starElements}
        postDescription={val.postDescription}
        photo={val.photo}
        // photo={val.photo.urls.regular}
      />
    )
    }).reverse()

  return (
    <div className="profile-container">

      {useEffect(() => {
        document.body.classList.add('login-background')

      },[])}

      {backdrop && (
      <div id="modal-backdrop"></div> )}
      {setting && (
        <div id="setting-btn-list">
          <button className="logout-btn" onClick={() => {
            navigate('/logIn')
          }}> Log Out </button>
          <button className="delete-btn"> Delete Account </button>
        </div>
      )}

      <div className="profile-header">
        <h3 className="profile-username"> {props.username} </h3>
        <IoMdSettings
          className="profile-setting" 
          onClick={handleSetting} 
        />
        {/* <button className="profile-setting"> hello </button> */}
      </div>

      <div className="user-post"> {userPostDataElements} </div>


      {/* This is the profile page for {userId}! */}
      {/* <button onClick={() => {
          navigate('./userPost')
      }}> UserPost</button> */}
    </div>
  )
}