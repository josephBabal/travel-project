import React from 'react'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/selectors'

export default function PostList({handleBackdrop, handleEditOptions, editOptions, refreshPage, handleEditForm, insertReviewData, handleSelectDeleted}) {
  const postList = useSelector(getPosts)
  console.log("==postList", postList)
  
  return (
    <div className="profile-review-container"> 
      <h3 className="myReview-title"> My Reviews </h3>
      <div className="card-grid"> 
        {postList.posts.map((item,idx) => {
          return (
            <Post 
              key={idx}
              post={item}
              handleSelectDeleted={handleSelectDeleted}
              handleBackdrop={handleBackdrop}
              handleEditOptions={handleEditOptions}
              editOptions={editOptions}
              refreshPage = {refreshPage}
              handleEditForm={handleEditForm}
              insertReviewData={insertReviewData}
            />
          )})}
      </div>  
    </div>
  )
}
