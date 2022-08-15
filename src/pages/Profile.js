import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Post from '../components/Post'
import {FaStar} from 'react-icons/fa'


export default function Profile(props) {
  const navigate = useNavigate()
  const {userId} = useParams()

  const [userPostData, setUserPostData] = useState([])

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
    )}
    ).reverse()

  return (
    <div className="profile-container">
      <h3> {props.username} </h3>
     
      <div className="user-post"> {userPostDataElements} </div>

      {/* <div className="user-post-container">
        {userPostData.map((val) => {
          return (
            
            <div key={props.userId}className="card-post"> 
              <h1 className="card-username"> {val.userName} </h1>
              <h2 className="card-title"> {val.title} </h2>
              <h3 className="card-date"> {val.dateTraveled} </h3>
              <p className="card-rating"> {val.rating} </p>
              <p className="card-description"> {val.postDescription} </p>
              <div className="card-photo"> {val.photo} </div>
            </div>
          )
        })}
      </div> */}






      {/* <header>
          <Navbar />
      </header> */}

      {/* This is the profile page for {userId}! */}
      {/* <button onClick={() => {
          navigate('./userPost')
      }}> UserPost</button> */}
    </div>
  )
}