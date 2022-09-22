import React from 'react'
import Navbar from '../components/Navbar'
export default function Home(props) {
  // const addBodyClass = className => document.body
  // useEffect(() => {
  //   document.body.classList.add('background-img')
  // })

  return (
    <div className="background-img">
      <Navbar username={props.username} />
       {/* {useEffect(() => {
           document.body.classList.contains('login-background') ?
           document.body.classList.remove('login-background') :
           document.body.classList.add('background-img')
        },[])} */}
      
      <div id="slide-container">
        <p className="slide-intro">Here at My Journey...</p>
        <p className="slide-txt"> You can write reviews of destinations 
          you visted or restaurants you visted
        </p>
      </div>

    </div>
  )
}