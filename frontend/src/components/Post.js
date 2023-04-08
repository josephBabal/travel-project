import React, {useState} from 'react'
import {BsThreeDotsVertical } from "react-icons/bs"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/selectors'

export default function Post({id, post, handleEditOptions, handleBackdrop, editOptions, refreshPage, handleEditForm, insertReviewData}) {
  // const postList = useSelector(getPosts)
  // const post = postList.find(post => post.id === id)
  const newId = post.id
  const navigate = useNavigate()
  // console.log("photo: ", photo)
  console.log("==post id", post.id)
  const deletePost = async(event) => {
    // event.preventDefault()
    try {
      navigate(`/profile/${post.username}`)
      const deleteUrl = `http://localhost:3000/profile/${post.username}/delete`
      const res = await axios.delete(deleteUrl, {
        params: {
          idDelete: post.id
        }
      })
      handleEditForm()
      handleBackdrop()
      refreshPage()
    } catch (err) {
      alert(err)
    }
  }

  function fillStarArr(rating) {
    const arr = []
    for (let i = 0; i < 5; i++) {
      arr.push(<FaStar key={i} className="card-star" color={i+1 <= rating ? "#FFC107" : "E4E5E9"}/>)
    }
    return arr
  }

  const starRating = fillStarArr(post.rating)
  // const getDate = dateTraveled
  const newDate = post.dateTraveled.substring(1, post.dateTraveled.length-1)

  // console.log(reviewData.updateDescription, reviewData.updateTitle, reviewData.updatePhoto)
  return (
    <div>
      {editOptions && 
      <div className="card-update-btn-list">
        <button className="delete-post-btn" onClick={() => { {console.log("==deletee post id", newId)} {deletePost()} }}> Delete </button>
        <button className="edit-btn" onClick={() => { {console.log("==edit post id", newId)} {insertReviewData(newId)} {handleEditOptions()} {handleEditForm()} }}> Edit</button>
        <button className="cancel-update-btn" onClick={() => {{handleBackdrop()} {handleEditOptions()} }}> Cancel </button>
      </div> }

  
      <div className="card-post"> 
        <div className="card-top">
          <div className="card-top-user-date">
            <h3 className="card-title"> {post.title} <p className="card-username"> By {post.username} </p> </h3>
            <button type="button" className="card-dots"
              onClick={() => {
                {console.log("==pressed post id", newId)}
                {handleBackdrop()} 
                {handleEditOptions()}
              }}
            > <BsThreeDotsVertical />
            </button>
            
          </div>
          <div className="card-date-rate">
            <div className="card-rating-container"> {starRating}  </div>
            <h5 className="card-date"> {newDate} </h5>
          </div>
          {/* <h5 className="card-date"> {dateTraveled} </h5>
          <div className="card-rating-container"> {rating}  </div> */}
        </div>
        
        <div className="card-bottom"> 
          <div className={post.photo ? "card-content" : "card-content2"}>
            <p className="card-description"> {post.postDescription} </p>
          </div>
          <img className="card-photo" src={post.photo} onError={(e)=>{e.target.style.display = 'none';}}/>
        </div>
        <div className="review-separator"></div>
      </div>
    </div>
  )
}