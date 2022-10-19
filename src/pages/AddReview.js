import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Star from '../components/Star'
// date picker library
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/airbnb.css";
// import Flatpickr from "react-flatpickr";


export default function AddReview(props) {
  const navigate = useNavigate()
  const [isFilled, setIsFilled] = useState({postTitle: true, postDescription: true})
  console.log("filled", isFilled)
  // all text data of post
  const [reviewData, setReviewData] = useState({
      postTitle: "",
      postDescription: "",
      postPhoto: ""
  })

   // const [date, setDate] = useState('')
   const [date, setDate] = useState(new Date())


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

  function handleChange(event) {
      const {name, value} = event.target
      setReviewData(prevData => ({
          ...prevData,
          [name] : value
      }))
      setIsFilled(old => ({...old, [name]: true}))
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
    if (reviewData.postTitle !== "" && reviewData.postDescription !== "") 
      {
        try {
          const newDate = `{${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}}`
          console.log("newDate: ", newDate)
          navigate('/')
          // const url = 'https://localhost:3001/addReview/post'
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
        if (reviewData.postTitle === "") {
          setIsFilled(old => ({...old, postTitle: false})) 
        } 

        if (reviewData.postDescription === "") {
          setIsFilled(old => ({...old, postDescription: false})) 
        } 

        console.log("not completed")
      }
  }

  console.log("date traveled", date)
  console.log("new date: ", date)


  return (
    <div className="background-img">
      <Navbar username={props.username} />
   
    
      <div className="post-container">     
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
                maxLength={30}
              />
             
            {/* Date traveled of post */}
              <label htmlFor="date-input" className="date-label"> Enter date traveled </label>
              <DatePicker 
                id="date-input"
                name="postDate"
                selected={date}e
                onChange={oldDate => {
                  setDate(oldDate)
                  
                }}
                dateFormate={"MM/DD/YYYY"}
                
                maxDate={new Date()}
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
              />

              {/* Rating/star of post */}
              <div className="star-container">
                {starElements}
              </div>
                      
              {/* Description of post */}
              <textarea 
                type="text"
                id="postDescription"
                placeholder="Description/thoughts of destination/restaurant "
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
              </div>
              
            <div className="post-error">
              {isFilled.postTitle && isFilled.postDescription ? "" : <div className="post-txt-error"> *Title/description not filled</div>}
            </div>

              {/* cancel and post buttons */}
              <div className="btn-container">
                <button className="cancel-btn" onClick={() => navigate('/')}> Cancel </button>
                <button type="submit" className="post-btn"> Post </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}