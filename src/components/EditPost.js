import React from 'react'

export default function EditPost({oldReviewData, handleReviewData, handleEditForm, handleBackdrop, updateStarElements, updatePost}) {
  return (    
    <div className="updateFormContainer">
      <div className="reviewBox">
        <h4> Update rating <span>*</span> </h4>
        <div className="star-container"> {updateStarElements} </div>
      </div>

      <div className="reviewBox">
        <h4> Update Title <span>*</span> </h4>
        <input 
          type="text"
          id="updateTitle"
          name="updateTitle"
          onChange={handleReviewData}
          value={oldReviewData.updateTitle}
          maxLength={30}
        />
      </div>

      <div className="reviewBox">
        <h4> Update Review <span>*</span> </h4>
        <textarea 
          type="text"
          id="updateDescription"
          onChange={handleReviewData}
          value={oldReviewData.updateDescription}
          name="updateDescription"
          maxLength={1000}
          rows={10}
          cols={50} 
        />
      </div>
      <div className="reviewBox">
        <h4>Update photo </h4>
        <input 
          className="photoUrl"
          type="text"
          placeholder="Enter url of photo"
          onChange={handleReviewData}
          name="updatePhoto"
          value={oldReviewData.updatePhoto}
          maxLength={100}
          rows={10}
          cols={50}
        />
      </div>

      <div className="post-error">
          {/* {isFilled.updateTitle && isFilled.updateDescription && isFilled.updateStar ? "" : <div className="post-txt-error"> *Title/description/rating not completed</div>} */}
      </div>

      <div className="update-btn-container">
        <button type="submit" className="update-btn" onClick={updatePost}> Update </button>
        <button className="cancel-update-btn" onClick={() => {{handleEditForm()} {handleBackdrop()} }}> Cancel </button>
      </div>

    </div> 
  )
}