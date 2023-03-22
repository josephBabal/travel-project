import React from 'react'
import Post from './Post'


export default function PostList({posts, handleBackdrop, handleEditOptions, editOptions, refreshPage, handleEditForm, insertReviewData}) {

  
  return (
    <div className="profile-review-container"> 
      <h3 className="myReview-title"> My Reviews </h3>
      <div className="card-grid"> 
        {posts.map((item,idx) => {
          return (
            <Post 
              key={idx}
              id={item.id}
              username={item.username}
              title={item.title}
              dateTraveled={item.dateTraveled}
              rating={item.rating}
              postDescription={item.postDescription}
              photo={item.photo}
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
