import React from 'react'
// import urlExist from 'url-exist'
// import Validator from 'validator'
// import {FaStar} from 'react-icons/fa'

export default function Post(props) {
  console.log("props.photo: ", props.photo)

  return (
    <div className="card-post"> 
      <div className="card-top">
        <h5 className="card-username"> {props.userName} </h5>
        <h5 className="card-date"> {props.dateTraveled} </h5>
      </div>
      
      <div className="card-bottom"> 
        <img className="card-photo" src={props.photo} onError={(e)=>{e.target.style.display = 'none';}}/>
        <div className={props.photo ? "card-content" : "card-content2"}>
          <h3 className="card-title"> {props.title} </h3>
          <div className="card-rating-container"> {props.rating}  </div>
          <p className="card-description"> {props.postDescription} </p>
        </div>
      </div>
    </div>
  )
}