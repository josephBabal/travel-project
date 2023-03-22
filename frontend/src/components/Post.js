import React, {useState} from 'react'
import {BsThreeDotsVertical } from "react-icons/bs"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Post({id, username, dateTraveled, title, rating, postDescription, photo, handleEditOptions, handleBackdrop, editOptions, refreshPage, handleEditForm, insertReviewData}) {
  const navigate = useNavigate()
  console.log("photo: ", photo)

  const deletePost = async(event) => {
    // event.preventDefault()
    try {
      navigate(`/profile/${username}`)
      const deleteUrl = `http://localhost:3000/profile/${username}/delete`
      const res = await axios.delete(deleteUrl, {
        idDelete: id
      })
      handleEditForm()
      handleBackdrop()
      refreshPage()
    } catch (err) {
      alert(err)
    }
  }


  // console.log(reviewData.updateDescription, reviewData.updateTitle, reviewData.updatePhoto)
  return (
    <div>
      {editOptions && 
      <div className="card-update-btn-list">
          <button className="delete-post-btn" onClick={() => deletePost()}> Delete </button>
          <button className="edit-btn" onClick={() => {{handleEditOptions()} {handleEditForm()} {insertReviewData(id, title, postDescription, photo)}  }}> Edit</button>
          <button className="cancel-update-btn" onClick={() => {{handleBackdrop()} {handleEditOptions()} }}> Cancel </button>
      </div> }

  
      <div className="card-post"> 
        <div className="card-top">
          <div className="card-top-user-date">
            <h3 className="card-title"> {title} <p className="card-username"> By {username} </p> </h3>
            <button type="button" className="card-dots"
              onClick={() => {
                {handleBackdrop()} 
                {handleEditOptions()}
              }}
            > <BsThreeDotsVertical />
            </button>
            
          </div>
          <div className="card-date-rate">
            <div className="card-rating-container"> {rating}  </div>
            <h5 className="card-date"> {dateTraveled} </h5>
          </div>
          {/* <h5 className="card-date"> {dateTraveled} </h5>
          <div className="card-rating-container"> {rating}  </div> */}
        </div>
        
        <div className="card-bottom"> 
          <div className={photo ? "card-content" : "card-content2"}>
            <p className="card-description"> {postDescription} </p>
          </div>
          <img className="card-photo" src={photo} onError={(e)=>{e.target.style.display = 'none';}}/>
        </div>
        <div className="review-separator"></div>
      </div>
    </div>
  )
}