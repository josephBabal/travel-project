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
      {/* <header>
        <Navbar />
      </header> */}
      {/* <main>
        <div className="background-img"></div>
        <div className="general-post"></div>
      </main> */}
      {/* <div className="background-img"></div> */}
    </div>
  )
}