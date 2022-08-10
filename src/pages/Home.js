import React from 'react'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {/* <main>
        <div className="background-img"></div>
        <div className="general-post"></div>
      </main> */}
      <div className="background-img"></div>
      <div className="general-post"></div>
    </div>
  )
}