import React, {useEffect, useState} from 'react'
import Post from '../components/Post'
import axios from 'axios'
import { IoIosSearch } from "react-icons/io";
import {FaStar} from 'react-icons/fa'
import Navbar from '../components/Navbar'


export default function SearchPage(props) {
  const [searchInput, setSearchInput] = useState('')
  const [validResult, setValidResult] = useState(true)
  const [matchingData, setMatchingData] = useState([])


  // returns any post(s) with username/title that matches the input and stores the data in matchingData
  const getSearchResult = async () => {
    if (searchInput !== '') {
      const postUrl = "http://localhost:3000/search/checkInput"
      try {
        const res = await axios.post(postUrl, {searchValue: searchInput})
        console.log("res: ", res)
        if (res.data.message) {
          setValidResult(false)
        } else {
          setMatchingData(res.data)
          setValidResult(true)
          console.log(res.data)
        }
      }
      catch(err) {
        console.log(err)
      }
    }
    return
  }
  console.log("search input: ", searchInput)
  console.log(matchingData)


  // inserting 5 <FaStar/> component with a specific color depending on the rating
  function fillStarArr(val) {
    const arr = []
    for (let i = 0; i < 5; i++) {
      arr.push(<FaStar key={i} className="card-star" color={i <= val.rating ? "#FFC107" : "E4E5E9"}/>)
    }
    return arr
  }

  // uses matchingData to store <Post/> components into matchingPostData for it to be displayed
  let matchingPostData
  if (validResult === true) {
    matchingPostData = matchingData.map((val) => {
    // Getting rid of {} around date using subString
    const getDate = val.dateTraveled
    const newDate = getDate.substring(1, getDate.length-1)
    console.log(newDate)
    console.log("search page photo value: ", val.photo)

    const starElements = fillStarArr(val)
    return (
      <Post 
        key={val.id}
        userName={val.username}
        title={val.title}
        dateTraveled={newDate}
        rating={starElements}
        postDescription={val.postDescription}
        photo={val.photo}
      />
    )
    })
  }

  // body
  return (
    <div className="white-background">
      {/* <Navbar 
        username={props.username}
        curPage={props.curPage}
      /> */}
      <div className="search-page-container">
        <div className="search-container">
          <input 
            type="text"
            id="searchbar"
            placeholder="Search"
            name="search"
            value={searchInput}
            onChange={event => {
              const value = event.target.value
              setSearchInput(value)
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                getSearchResult()
              }
            }}
          />
          <IoIosSearch className="search-icon" onClick={getSearchResult}/>
        </div>

        <div className="search-result">
          {matchingPostData && <div className="card-grid"> {matchingPostData} </div> }
          {validResult ? "" :
            <h3 className="no-result-txt"> No results found </h3>
          }
        </div>
      </div>
    </div>
  )
}