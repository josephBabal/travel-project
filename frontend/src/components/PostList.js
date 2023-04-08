import React from 'react'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/selectors'

export default function PostList({handleBackdrop, handleEditOptions, editOptions, refreshPage, handleEditForm, insertReviewData}) {
  const postList = useSelector(getPosts)

  
  return (
    <div className="profile-review-container"> 
      <h3 className="myReview-title"> My Reviews </h3>
      <div className="card-grid"> 
        {postList.map((item,idx) => {
          return (
            <Post 
              key={item.id}
              post={item}
              handleBackdrop={handleBackdrop}
              handleEditOptions={handleEditOptions}
              editOptions={editOptions}
              refreshPage = {refreshPage}
              handleEditForm={handleEditForm}
              insertReviewData={insertReviewData}
              // isFilled={isFilled}
            />
          )})}
      </div>  
    </div>
  )
}
