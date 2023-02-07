import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Star from '../components/Star'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/airbnb.css";


export default function AddReview(props) {
  const navigate = useNavigate()
  const [isFilled, setIsFilled] = useState({postTitle: true, postDescription: true, postStar: true})
  console.log("filled", isFilled)
  const [reviewData, setReviewData] = useState({
      postTitle: "",
      postDescription: "",
      postPhoto: ""
  })
  const [date, setDate] = useState(new Date())
  console.log("new", date);

  // states used for star icons
  const [stars, setStars] = useState(newStar())
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)

  // inserting object in an array with its own id and ratingValue for each star
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

  // resets hover
  function resetHover() {
    setHover(null)
  }

  console.log("rating is", rating)
  console.log("hover is", hover)

  // mapping and returning <Star/> componenet
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

  // handles and stores input from the input fields 
  function handleChange(event) {
      const {name, value} = event.target
      setReviewData(prevData => ({
          ...prevData,
          [name] : value
      }))
      setIsFilled(old => ({...old, [name]: true}))
      console.log("review data", reviewData)
  }
  console.log(reviewData)

  const checkFilled = () => {
    if (reviewData.postTitle === "") {
      setIsFilled(old => ({...old, postTitle: false})) 
    } 
    if (reviewData.postDescription === "") {
      setIsFilled(old => ({...old, postDescription: false})) 
    } 
    if (rating == null) {
      setIsFilled(old => ({...old, postStar: false}))
    }
  }

  // server for posting data
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (reviewData.postTitle !== "" && reviewData.postDescription !== "" && rating != null) {
      try {
        const newDate = `{${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}}`
        console.log("newDate: ", newDate)
        navigate('/')                     // navigates back home
        const res = await axios.post('http://localhost:3000/addReview/post', {
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
      checkFilled()
      console.log("not completed")
    }
  }

  console.log("date traveled", date)
  console.log("new date: ", date)


  // body
  return (
    <div className="white-background">
    {/* <div className="background-img"> */}
      {/* <Navbar 
        username={props.username} 
        curPage={props.curPage}
      />  */}
      <h1 className="create-post-txt"> Add Review </h1>
      <div className="review-container">
          <form className="form-inputs" onSubmit={handleSubmit}>
          <div className="form-container">
            {/* Rating/star of post */}
            <div className="reviewBox">
              <h4> Select a rating <span>*</span> </h4>
              <div className="star-container"> {starElements} </div>
            </div>

            {/* Title of post */}
            <div className="reviewBox">
              <h4> Enter Title <span>*</span> </h4>
              <input
                type="text"
                id="postTitle"
                // placeholder="Enter a title"
                onChange={handleChange}
                value={reviewData.postTitle}
                name="postTitle"
                maxLength={30}
              />
            </div>


            {/* <div className="dateContainer"> */}
              {/* Date traveled of post */}
              {/* <DatePicker 
                id="date-input"
                name="postDate"
                selected={date}
                // onChange={oldDate => {
                //   setDate(oldDate)
                // }}
                dateFormate={"MM/DD/YYYY"}
                
                maxDate={new Date()}
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              /> */}
            {/* </div>  */}
          
                    
            {/* Description of post */}
            <div className="reviewBox">
              <h4> Write a Review <span>*</span> </h4>
              <textarea 
                type="text"
                id="postDescription"
                placeholder="Describe your experience"
                onChange={handleChange}
                value={reviewData.postDescription}
                name="postDescription"
                maxLength={1000}
                rows={10}
                cols={50} 
              />
            </div>

            {/* choosing photo for post */}
            <div className="reviewBox">
              <h4>Select a photo </h4>
              <input 
                className="photoUrl"
                type="text"
                placeholder="Enter url of photo"
                onChange={handleChange}
                name="postPhoto"
                value={reviewData.postPhoto}
                maxLength={100}
                rows={10}
                cols={50}
              />
            </div>
            
          <div className="post-error">
            {isFilled.postTitle && isFilled.postDescription && isFilled.postStar ? "" : <div className="post-txt-error"> *Title/description/rating not completed</div>}
          </div>

            {/* cancel and post buttons */}
            <div className="btn-container">
              <button type="submit" className="post-review-btn"> Post Review </button>
              <a className="cancel-review-btn" href={"/"}> Cancel </a>
            </div>
            </div>
          </form>
      </div>
    </div>
  )
}