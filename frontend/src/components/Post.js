import React, {useState} from 'react'
import {BsThreeDotsVertical } from "react-icons/bs"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Post(props) {
  const navigate = useNavigate()
  console.log("props.photo: ", props.photo)

  const deletePost = async(event) => {
    // event.preventDefault()
    try {
      navigate(`/profile/${props.username}`)
      const deleteUrl = `http://localhost:3000/profile/${props.username}/delete`
      const res = await axios.delete(deleteUrl, {
        idDelete: props.id
      })
      props.handleEditForm()
      props.handleBackdrop()
      props.refreshPage()
    } catch (err) {
      alert(err)
    }
  }

  console.log("index", props.index)

  // console.log(reviewData.updateDescription, reviewData.updateTitle, reviewData.updatePhoto)
  return (
    <div>
      {props.editOptions && 
      <div className="card-update-btn-list">
          <button className="delete-post-btn" onClick={() => deletePost()}> Delete </button>
          <button className="edit-btn" onClick={() => {{props.handleEditOptions()} {props.handleEditForm()} {props.insertReviewData()}  }}> Edit</button>
          <button className="cancel-update-btn" onClick={() => {{props.handleBackdrop()} {props.handleEditOptions()} }}> Cancel </button>
      </div> }

  
      <div className="card-post"> 
        <div className="card-top">
          <div className="card-top-user-date">
            <h3 className="card-title"> {props.title} <p className="card-username"> By {props.userName} </p> </h3>
            <button type="button" className="card-dots"
              onClick={() => {
                {props.handleBackdrop()} 
                {props.handleEditOptions()}
              }}
            > <BsThreeDotsVertical />
            </button>
            
          </div>
          <div className="card-date-rate">
            <div className="card-rating-container"> {props.rating}  </div>
            <h5 className="card-date"> {props.dateTraveled} </h5>
          </div>
          {/* <h5 className="card-date"> {props.dateTraveled} </h5>
          <div className="card-rating-container"> {props.rating}  </div> */}
        </div>
        
        <div className="card-bottom"> 
          <div className={props.photo ? "card-content" : "card-content2"}>
            <p className="card-description"> {props.postDescription} </p>
          </div>
          <img className="card-photo" src={props.photo} onError={(e)=>{e.target.style.display = 'none';}}/>
        </div>
        <div className="review-separator"></div>
      </div>
    </div>
  )
}