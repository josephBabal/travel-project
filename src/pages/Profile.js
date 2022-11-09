import React, {useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Post from '../components/Post'
import {FaStar} from 'react-icons/fa'
import { IoMdSettings } from "react-icons/io"
import { IoIosCloseCircleOutline } from "react-icons/io"

export default function Profile(props) {
  const navigate = useNavigate()
  const [userPostData, setUserPostData] = useState([])
  const [setting, setSetting] = useState(false)
  const [backdrop, setBackdrop] = useState(false)
  const [hasReview, setHasReview] = useState(false)

  const getUrl = `http://localhost:3000/profile/${props.username}/userPost`

  // getting post data from database and storing in userPostData
  useEffect(() => {
    const getUserPostData = async () => {
      try {
        const res = await axios.get(getUrl)
        if (res.data.message) {
          console.log(res.data.message)
          setUserPostData(res.data.message)
        } else {
          setUserPostData(res.data)
          console.log(res.data)
          setHasReview(oldVal => true)
        }
      } catch(err) {
        console.log(err)
      }
    }
    getUserPostData()
  }, [getUrl])

  // changes value of setting and backdrop each time the setting icon is pressed
  const handleSetting = () => {
    setSetting(oldSetting => !oldSetting)
    setBackdrop(oldBackdrop => !oldBackdrop)
  }

  // inserting 5 <FaStar/> component with a specific color depending on the rating
  function fillStarArr(val) {
    const arr = []
    for (let i = 0; i < 5; i++) {
      arr.push(<FaStar key={i} className="card-star" color={i <= val.rating ? "#FFC107" : "E4E5E9"}/>)
    }
    return arr
  }

  // uses userPostData to store <Post/> components into userpostDataElements for it to be displayed
  let userPostDataElements
  if (hasReview === true) {
    userPostDataElements = userPostData.map((val) => {
    // Getting rid of {} around date using subString
    const getDate = val.dateTraveled
    const newDate = getDate.substring(1, getDate.length-1)
    console.log(newDate)
    console.log("proifle photo value: ", val.photo)

    const starElements = fillStarArr(val)
    return (
      <Post 
        key={val.id}
        userName={val.username}
        title={val.title}
        dateTraveled={newDate}
        rating={starElements}
        postDescription={val.postDescription}
        photo={val.photo}
      />
    )
    }).reverse()      // newest posts show at the top
  }

  // body
  return (
    <div className="search-background">
      <Navbar username={props.username} />

      <div className="profile-container">

        {/* backdrop, close setting btn and setting contents */}
        {backdrop && (<div id="modal-backdrop"></div> )}
        {setting && (
          <>   
            <div id="setting-btn-list">
              <IoIosCloseCircleOutline className="close-btn" onClick={handleSetting} />
              <button className="logout-btn" onClick={() => {
                navigate('/')
                props.handleLogout()
              }}> Log Out </button>
            </div> 
          </> 
        )}

        {/* profile page content */}
        <div className="profile-header">
          <h3 className="profile-username"> {props.username} </h3>
          <IoMdSettings
            className="profile-setting" 
            onClick={handleSetting} 
          />
        </div>

        {hasReview ? <div className="card-grid"> {userPostDataElements} </div> :
          <h3 className="no-review-txt"> You have no reviews </h3>
        }
      </div>
    </div>
  )
}