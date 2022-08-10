import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Profile(props) {
  let navigate = useNavigate()
  let {username} = useParams()

  return (
    <div>
      <header>
          <Navbar />
      </header>
        This is the profile page for {username}!
      <button onClick={() => {
          navigate('./userPost')
      }}> UserPost</button>
    </div>
  )
}