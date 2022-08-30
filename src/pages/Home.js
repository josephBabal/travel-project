import React, { useEffect } from 'react'

export default function Home() {
  // const addBodyClass = className => document.body
  // useEffect(() => {
  //   document.body.classList.add('background-img')
  // })

  return (
    <div>
       {useEffect(() => {
           document.body.classList.contains('login-background') ?
           document.body.classList.remove('login-background') :
           document.body.classList.add('background-img')
        },[])}
      
      <div id="slide-container">
        <p className="slide-txt"> You can write reviews of destinations you visted
          or resatuarts you ate at
        </p>
      </div>

    </div>
  )
}