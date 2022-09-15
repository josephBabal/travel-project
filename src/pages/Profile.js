import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Post from '../components/Post'
import {FaStar} from 'react-icons/fa'
import { IoMdSettings } from "react-icons/io"
import { IoIosCloseCircleOutline } from "react-icons/io"

export default function Profile(props) {
  const navigate = useNavigate()
  const {username} = useParams()

  const [userPostData, setUserPostData] = useState([])
  const [setting, setSetting] = useState(false)
  const [backdrop, setBackdrop] = useState(false)
  const [hasReview, setHasReview] = useState(false)

  const getUrl = `http://localhost:3001/profile/${props.username}/userPost`

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


  const handleSetting = () => {
    setSetting(oldSetting => !oldSetting)
    setBackdrop(oldBackdrop => !oldBackdrop)
  }

  let userPostDataElements
  if (hasReview === true) {
    userPostDataElements = userPostData.map((val) => {
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
      />
    )
    }).reverse()
  }

  return (
    <div className="profile-container">
      {useEffect(() => {
        document.body.classList.add('login-background')
        // document.body.classList.add('white-background')
      },[])}

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
            {/* <button className="delete-btn"> Delete Account </button> */}
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
        {/* <button className="profile-setting"> hello </button> */}
      </div>

      {hasReview ? <div className="card-grid"> {userPostDataElements} </div> :
        <h3 className="no-review-txt"> You have no reviews </h3>
      }

    </div>
  )
}