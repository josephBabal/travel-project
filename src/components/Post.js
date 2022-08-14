import React from 'react'

export default function Post(props) {
  return (
    <div className="card-post">
      <div className="card-post"> 
        <h1 className="card-username"> {props.userName} </h1>
        <h2 className="card-title"> {props.title} </h2>
        <h3 className="card-date"> {props.dateTraveled} </h3>
        <p className="card-rating"> {props.rating} </p>
        <p className="card-description"> {props.postDescription} </p>
        {props.photo && <img className="card-photo" src={`profile/userPost//${props.photo}`} alt="img"/>}
        {/* {props.photo && <div className="card-photo"> {URL.createObjectURL(props.photo)} </div>} */}
      </div>
    </div>
  )
}