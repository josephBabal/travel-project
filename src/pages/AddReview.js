import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import axios from 'axios'
import {nanoid} from 'nanoid'
import Star from '../components/Star'
// react flatpickr
// import "flatpickr/dist/themes/material_green.css";
// theme options:
// material_green.css
// material_blue.css
// material_red.css
// material_orange.css
// dark.css
// airbnb.css
// confetti.css
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";


export default function AddReview(props) {
  const navigate = useNavigate()

  // all text data of post
  const [reviewData, setReviewData] = useState({
      postTitle: "",
      postDescription: ""
  })

  const [date, setDate] = useState('')

  const [photo, setPhoto] = useState(null)
  function uploadPhoto(selectedPhoto) {
    if (selectedPhoto) {
      setPhoto(selectedPhoto[0])
    }
  }

  // states used for star icons
  const [stars, setStars] = useState(newStar())
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)

  function newStar() {
    const starArr = []
    for (let i = 0; i < 5; i++) {
      starArr.push(generateStar(i))
      console.log(starArr[i].id)
    }
    return starArr
  }

  function generateStar(idx) {
    return {
      id: idx + 1,
      ratingValue: idx + 1
  }}

  // if star is click it sets rating to that star's value
  function updateRating(value) {
    setRating(value)
  }

  // if star is hovered it sets hover to that star's value
  function updateHover(value) {
    setHover(value)
  }

  // if star is not hovered it sets hover to null
  function resetHover() {
    setHover(null)
  }

  console.log("rating is", rating)
  console.log("hover is", hover)

  const starElements = stars.map(star => (
    <Star 
      key={star.id} 
      selectedRating={rating}
      hover={hover}
      updateRating={() => updateRating(star.ratingValue)}
      updateHover={() => updateHover(star.ratingValue)}
      resetHover={() => resetHover()}
      ratingValue={star.ratingValue}
    />
  ))

  // navigates back to home page if cancel btn is clicked
  const NavHome = () => {
    navigate('/')
  }

  function handleChange(event) {
      const {name, value, type} = event.target
      setReviewData(prevData => ({
          ...prevData,
          [name] : value
      }))
      console.log("review data", reviewData)
  }
  
  // function displayPhoto(photo) {
  //   <div>
  //     <img alt="not found" src={URL.createObjectURL(photo)}/>
  //   </div> 
  // }

  // const styles = {
  //   display: photo.hasPhoto ? "" : "none"
  // }

  // const photoName = []
  // photoName.push('')
  // const newName = photoName.map(name => (
  //   photo.postPhoto
  // ))
  // console.log("photoName: ", photoName)

  // const postData = async () => {
    
  // }


  console.log(reviewData)
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (reviewData.postTitle !== "" && 
        reviewData.postDescription !== "" && 
        rating != null) 
      {
        try {
          // const url = 'https://localhost:3001/addReview/post'
          const res = await axios.post('http://localhost:3001/addReview/post', {
            username: props.username,
            userId: props.userId,
            title: reviewData.postTitle,
            postDate: date,
            postRating: rating,
            postDescription: reviewData.postDescription,
            postPhoto: photo
          })
          console.log("submitted review: ", res.data)
        } catch(err) {
          alert(err)
        }

      } else {
        console.log("not completed")
      }
  }

  console.log("date traveled", date)


  return (
    <div className="post-container"> 
      <header>
          <Navbar />
      </header>

      <div className="review-container">
          <h1 className="create-post-txt"> Create Post</h1>
          <form className="form-inputs" onSubmit={handleSubmit}>
            {/* Title of post */}
            <input
              type="text"
              id="postTitle"
              placeholder="Enter a title"
              onChange={handleChange}
              value={reviewData.postTitle}
              name="postTitle"
            />

            {/* <input
              ref={setFp} 
              name="dateOfTravel"
              value={reviewData.dateOfTravel}
              placeholder = "Enter date"
              onChange={date => {
                setDate({date})
                console.log("printing", date)
              }}
              options={{
                altFormat: "d M Y",
                dateFormat:"d-M-Y",
                maxDate: "today",
                altInput: true
              }} 
            /> */}
        
          {/* Date traveled of post */}
            <Flatpickr
              id="postDate"
              name="postDate"
              // value={reviewData.postDate}
              placeholder = "Select date that you went"
              onChange={newDate => {
                setDate(newDate)
              }}
              options={{
                altFormat: "d M Y",
                dateFormat: "d M Y",
                maxDate: "today",
                altInput: true
              }} 
            />

            {/* Rating/star of post */}
            <div className="star-container">
              {starElements}
            </div>
                    
            {/* Description of post */}
            <textarea 
              type="text"
              id="postDescription"
              placeholder="Description of travel"
              onChange={handleChange}
              value={reviewData.postDescription}
              name="postDescription"
              maxLength={1000}
              rows={10}
              cols={50} 
            />

            {/* choosing photo for post */}
            <div className="postPhoto-container">
              <div className="photo-btn-container">
                <label htmlFor="postPhoto" className="postPhoto-label"> Choose photo </label>
                <input 
                  type="file"
                  id="postPhoto"
                  name="postPhoto"
                  accept="image/png, .jpeg, .jpg"
                  placeholder="Choose photo"
                  onChange={(event) => uploadPhoto(event.target.files)}
                />
              </div>
              
              {/* Photo displayed */}
              <div className="photo-display-container">
                {photo && 
                (
                  <div>
                    <img className="img-post" src={URL.createObjectURL(photo)} alt="not found"/>
                  </div>
                  // displayPhoto(postPhoto.value)
                )}
              </div>
            </div>
            
            {/* cancel and post buttons */}
            <div className="btn-container">
              <button className="cancel-btn" onClick={NavHome}> Cancel </button>
              <button type="submit" className="post-btn"> Post </button>
            </div>
          </form>
      </div>
    </div>
  )
}