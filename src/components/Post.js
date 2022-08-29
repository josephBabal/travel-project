import React from 'react'
// import urlExist from 'url-exist'
// import Validator from 'validator'
// import {FaStar} from 'react-icons/fa'

export default function Post(props) {
  console.log("props.photo: ", props.photo)
  const fallbackSrc= "https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg"

  // const checkUrl = (url) => {
  //   var request = new XMLHttpRequest()
  //   request.open("GET", url, true)
  //   request.send()
  //   request.onload = (() => {
  //     if (request.status === 200) {
  //       console.log("valid url")
  //       return true
  //     } else {
  //       console.log("not valid url")
  //       return false
  //     }
  //   })
  // }

  // CHECK IF IMAGE EXISTS
  // function checkIfImageExists(url, callback) {
  //   const img = new Image();
  //   img.src = url;
    
  //   if (img.complete) {
  //     callback(true);
  //   } else {
  //     img.onload = () => {
  //       callback(true);
  //     };
      
  //     img.onerror = () => {
  //       callback(false);
  //     };
  //   }
  // }

  // // USAGE
  // checkIfImageExists(props.photo, (exists) => {
  //   if (exists) {
  //     console.log('Image exists. ')
  //   } else {
  //     console.error('Image does not exists.')
  //   }
  // });

  // const starElements = useState(fillStarArr())

  // function fillStarArr() {
  //   const arr = []
  //   for (let i = 0; i < 5; i++) {
  //     arr.push(<FaStar key={i} className="card-star" color={i <= props.rating ? "#FFC107" : "E4E5E9"}/>)
  //   }
  //   return arr
  // }

  // console.log("arr: ", starElements)


  return (
    <div className="card-post"> 

      <div className="card-top">
        <h5 className="card-username"> {props.userName} </h5>
        <h5 className="card-date"> {props.dateTraveled} </h5>
      </div>
    {/* <div>

      </div> */}
      <div className="card-content"> 
        <h3 className="card-title"> {props.title} </h3>
        <div className="card-rating-container"> {props.rating}  </div>
        <p className="card-description"> {props.postDescription} </p>
        <div className="card-photo-container">
          <img className="card-photo" src={props.photo} onError={(e)=>{e.target.style.display = 'none';}}/>
        </div> 
      </div>
        {/* <img className="card-photo" src={props.photo} /> */}
        {/* {props.photo && <img className="card-photo" src={`profile/userPost//${props.photo}`} alt="img"/>} */}
        {/* {props.photo && <div className="card-photo"> {URL.createObjectURL(props.photo)} </div>} */}
    </div>
  )
}