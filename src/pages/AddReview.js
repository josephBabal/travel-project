import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import axios from 'axios'
import {nanoid} from 'nanoid'
import Star from '../components/Star'
// date picker library
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
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
      postDescription: "",
      postPhoto: ""
  })

   // const [date, setDate] = useState('')
   const [date, setDate] = useState(new Date())

  // for button/img from computer
  // const [photo, setPhoto] = useState(null)
  // used for photo state being separte
  // const [photo, setPhoto] = useState('')
  // function handlePhoto(event) {
  //   const {value} = event.target
  //   console.log("event value: ", value)
  //   setPhoto(value)
  // }
  // console.log("test photo: ", photo)

  // function for button/choosing photo from computer
  // function uploadPhoto(selectedPhoto) {
  //   if (selectedPhoto) {
  //     setPhoto(selectedPhoto[0])
  //   }
  // }

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
      ratingValue={star.ratingValue} // individual star rating
      selectedRating={rating} // rating that was clicked
      hover={hover}
      updateRating={() => updateRating(star.ratingValue)}
      updateHover={() => updateHover(star.ratingValue)}
      resetHover={() => resetHover()}
    />
  ))

  // navigates back to home page if cancel btn is clicked
  const NavHome = () => {
    navigate('/home')
  }

  function handleChange(event) {
      const {name, value} = event.target
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

  console.log(reviewData)

  // server for posting data
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (reviewData.postTitle !== "" && 
        reviewData.postDescription !== "" && 
        rating != null) 
      {
        try {
          const newDate = `{${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}}`
          console.log("newDate: ", newDate)
          navigate('/home')
          // const url = 'https://localhost:3001/addReview/post'
          const res = await axios.post('http://localhost:3001/addReview/post', {
            username: props.username,
            userId: props.userId,
            title: reviewData.postTitle,
            postDate: newDate,
            postRating: rating,
            postDescription: reviewData.postDescription,
            postPhoto: reviewData.postPhoto
          })
        } catch(err) {
          alert(err)
        }

      } else {
        console.log("not completed")
      }
  }

  console.log("date traveled", date)
  console.log("new date: ", date)


  return (
    
    <div className="post-container"> 
      {useEffect(() => {
        document.body.classList.contains('login-background') ?
        document.body.classList.remove('login-background') :
        document.body.classList.add('background-img')
      },[])}
      {/* <header>
          <Navbar />
      </header> */}

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

            <DatePicker 
              id="date-input"
              name="postDate"
              selected={date}
              onChange={oldDate => {
                setDate(oldDate)
                
              }}
              dateFormate={"MM/DD/YYYY"}
              
              maxDate={new Date()}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            />
        
            {/* <Flatpickr
              id="postDate"
              name="postDate"
              value={date}
              // value={reviewData.postDate}
              placeholder = "Select date that you went flatpickr"
              onChange={newDate => {
                setDate(newDate)
              }}
              options={{
                // altFormat: "d M Y",
                // dateFormat: "d M Y",
                // altFormat: "M d Y",
                altFormate: "F j, Y",
                maxDate: "today",
                altInput: true,
                enableTime: false
              }} 
            /> */}

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
              <input 
                id="photoUrl"
                type="text"
                placeholder="Enter url of photo"
                onChange={handleChange}
                name="postPhoto"
                value={reviewData.postPhoto}
                maxLength={100}
                rows={10}
                cols={50}
              />
              {/* button to get photo from user comptuer
              <div className="photo-btn-container"> 
                <label htmlFor="postPhoto" className="postPhoto-label"> Choose photo </label>
                <input 
                  type="file"
                  // id="postPhoto"
                  name="postPhoto"
                  accept="image/png, .jpeg, .jpg"
                  placeholder="Choose photo"
                  onChange={(event) => uploadPhoto(event.target.files)}
                />
              </div> */}
              
              {/* Photo displayed */}
              {/* <div className="photo-display-container">
                {photo && 
                (
                  <div>
                    <img className="img-post" src={photo} alt=""/>
                    <img className="img-post" src={URL.createObjectURL(photo)} alt="not found"/>
                  </div>
                )
                }  
              </div> */}
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