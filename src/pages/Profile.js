import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Post from '../components/Post'


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

    return (
      <Post 
        key={val.id}
        userName={val.userName}
        title={val.title}
        dateTraveled={newDate}
        rating={val.rating}
        postDescription={val.postDescription}
        // photo={val.photo.urls.regular}
      />
    )}
    )

  return (
    <div className="profile-container">
      <div> <p> profile </p> </div>

      <div> {userPostDataElements} </div>

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