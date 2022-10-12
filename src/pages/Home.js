import React from 'react'
import Navbar from '../components/Navbar'
export default function Home(props) {
  return (
    <div className="background-img">
      <Navbar username={props.username}/>
    
      <div id="slide-container">
        <p className="slide-intro">Here at My Journey...</p>
        <p className="slide-txt"> You can write reviews of destinations 
          you visted or restaurants you visted
        </p>
      </div>

    </div>
  )
}
   
