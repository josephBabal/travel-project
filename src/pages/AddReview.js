import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import Axios from 'axios'
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

  const [reviewData, setReviewData] = useState({
      postTitle: "",
      // postDate: "",
      postDescription: "",
  })
  const [date, setDate] = useState('')
  const [photo, setPhoto] = useState({
    postPhoto: null,
    hasPhoto: false
  })

  const [stars, setStars] = useState(newStar())

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
      isSelected: false,
      id: idx + 1,
      isMouseOver: false,
      notHovered: true
  }}


  function clickStar(id) {
    setStars(oldStar => oldStar.map(star => (
        {...star, isSelected: false}
        
    )))
    setStars(oldStar => oldStar.map(star => {
      return star.id <= id ? 
        { ...star, isSelected: !star.isSelected} : star
    })) 
  }


  function unhoveredStar() {
    setStars(oldStar => oldStar.map(star => {
      return {...star, isSelected: false}
    }))
  }

  const starElements = stars.map(star => (
    <Star 
      key={star.id} 
      clickStar={() => clickStar(star.id)}
      isSelected={star.isSelected} 
      unhoveredStar={() => unhoveredStar()}

    />
  ))

  const cancelNavHome = () => {
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

 

    
  return (
    <div className="post-container"> 
      <header>
          <Navbar />
      </header>

      <div className="review-container">
          <h1 className="create-post-txt"> Create Post</h1>
          <form className="form-inputs">
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
        
          {/* main for date of travle */}
            <Flatpickr
              id="postDate"
              name="postDate"
              // value={reviewData.postDate}
              placeholder = "Select date that you went"
              onChange={date => {
                setDate({date})
                console.log("printing", date)
              }}
              options={{
                altFormat: "d M Y",
                dateFormat: "d M Y",
                maxDate: "today",
                altInput: true
              }} 
            />

            <div className="star-container">
              {starElements}
            </div>
                    
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

            <div className="postPhoto-container">
              <div className="photo-btn-container">
                <label htmlFor="postPhoto" className="postPhoto-label"> Choose photo </label>
                {/* <div> {newName} </div> */}
                <input 
                  type="file"
                  id="postPhoto"
                  name="postPhoto"
                  accept="image/png, .jpeg, .jpg, image/gif"
                  placeholder="Choose photo"
                  // style={styles}
                  onChange={event => {
                    console.log("photo:", event.target.files[0])
                    setPhoto(oldPhoto => ({
                      ...oldPhoto,
                      postPhoto: event.target.files[0],
                      hasPhoto: true
                    }))
                  }}
                />
              </div>

              <div className="photo-display-container">
                {photo.hasPhoto && 
                (
                  <div>
                    <img className="img-post" src={URL.createObjectURL(photo.postPhoto)} alt="not found"/>
                  </div>
                  // displayPhoto(postPhoto.value)
                )}
              </div>
            </div>

            {/* {photo.hasPhoto && 
            (
              <div>
                <img className="post-photo" src={URL.createObjectURL(photo.postPhoto)} alt="not found"/>
              </div>
              // displayPhoto(postPhoto.value)
            )} */}
            
          
            <div className="btn-container">
              <button className="cancel-btn" onClick={cancelNavHome}> Cancel </button>
              <button className="post-btn"> Post </button>
            </div>
          </form>
      </div>
    </div>
  )
}