import React, {useState, useEffect } from 'react'
import { useNavigate, useParams, Outlet } from 'react-router-dom'
import axios from 'axios'
import {FaStar} from 'react-icons/fa'
import { IoMdSettings } from "react-icons/io"
import { IoIosCloseCircleOutline } from "react-icons/io"
import EditPost from '../components/EditPost'
import Star from '../components/Star'
import PostList from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/selectors'
import { addPost } from '../redux/actions'
// import { addPost } from '../redux/postReducer2'
import '../styles/Profile.css'

export default function Profile({username, userId,handleLogout }) {
  const dispatch = useDispatch()
  const postList = useSelector(getPosts)

  const navigate = useNavigate()
  const [userPostData, setUserPostData] = useState([])
  const [setting, setSetting] = useState(false)
  const [backdrop, setBackdrop] = useState(false)
  const [editOptions, setEditOptions] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false) 
  const [hasReview, setHasReview] = useState(false)
  const [isUpdated, setisUpdated] = useState(false)
  const [selectDeleted, setSelectDeleted] = useState()
  const handleSelectDeleted = (postId) => {
    setSelectDeleted(postId)
  }
  const getUrl = `http://localhost:3000/profile/${username}/getUserPost`
  console.log("==userId", userId)

  const getUserPostData = async () => {
    try {
      const res = await axios.get(getUrl, 
        { 
          params: {
            userId: userId
          }
        })
      if (res.data.message) {
        console.log(res.data.message)
        setUserPostData(res.data.message)
      } else {
        console.log("==all posts", res.data)
        res.data.forEach(post => dispatch(addPost(post)))  

        setUserPostData(res.data.reverse())
        console.log("==userpost", userPostData)
        // console.log(res.data)
        setHasReview(oldVal => true)
      }
    } catch(err) {
      console.log(err)
    }
  }


  const refreshPage = () => {
    window.location.reload()
  }

  useEffect(() => {
    getUserPostData()
  }, [])



  // changes value of setting and backdrop each time the setting icon is pressed
  const handleSetting = () => {
    setSetting(oldSetting => !oldSetting)
    setBackdrop(oldBackdrop => !oldBackdrop)
  }

  const handleBackdrop = () => {
    setBackdrop(oldBackdrop => !oldBackdrop)
  }

  const handleEditOptions = () => {
    setEditOptions(old => !old)
  }

  const handleEditForm = () => {
    setShowEditForm(old => !old)
  }

  // inserting 5 <FaStar/> component with a specific color depending on the rating
  function fillStarArr(rating) {
    const arr = []
    for (let i = 0; i < 5; i++) {
      arr.push(<FaStar key={i} className="card-star" color={i+1 <= rating ? "#FFC107" : "E4E5E9"}/>)
    }
    return arr
  }

  // edit post
  const [oldReviewData, setOldReviewData] = useState({
    postID: null,
    rating: null,
    updateTitle: "",
    updateDescription: "",
    updatePhoto: ""
  })

  console.log(oldReviewData)

  function insertReviewData(postId) {
    const post = postList.posts.find(post => post.postId === postId)
    // console.log("insert post id", post.id)
    setOldReviewData(() => ({
      postID: post.postId,
      rating: 0,
      updateTitle: post.title,
      updateDescription: post.postDescription,
      updatePhoto: post.photo
    }))
  } 

  console.log("==old review data", oldReviewData)

  function handleReviewData(event) {
    const {name, value} = event.target
    setOldReviewData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const stars = newStar()
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  // inserting object in an array with its own id and ratingValue for each star
  function newStar() {
    const starArr = []
    for (let i = 0; i < 5; i++) {
      starArr.push(generateStar(i))
    }
    return starArr
  }
  function generateStar(idx) {
    return {
      id: idx + 1,
      ratingValue: idx + 1
  }}
  // if star is click it sets rating to that star's value
  function updateRating(value) {
    setRating(value)
  }
  // if star is hovered it sets hover to that star's value
  function updateHover(value) {
    setHover(value)
  }
  // resets hover
  function resetHover() {
    setHover(null)
  }

  const updateStarElements = stars.map(star => (
    <Star 
      key={star.id} 
      ratingValue={star.ratingValue} // individual star rating
      selectedRating={rating} // rating that was clicked
      hover={hover}
      updateRating={() => updateRating(star.ratingValue)}
      updateHover={() => updateHover(star.ratingValue)}
      resetHover={() => resetHover()}
    />
  ))

  // const [isFilled, setIsFilled] = useState({
  //   updateTitle: true, 
  //   updateDescription: true, 
  //   updateStar: true
  // })

  // const checkFilled = () => {
  //   if (oldReviewData.updateTitle === "") {
  //     setIsFilled(old => ({...old, updateTitle: false})) 
  //   } 
  //   if (oldReviewData.postDescription === "") {
  //     setIsFilled(old => ({...old, updateDescription: false})) 
  //   } 
  //   if (rating == null) {
  //     setIsFilled(old => ({...old, updateStar: false}))
  //   }
  // }

  const updatePost = async(event) => {
    if (oldReviewData.updateTitle !== "" && oldReviewData.updateDescription !== "" && rating != null) {
      try {
        navigate(`/profile/${username}`)
        const updateUrl = `http://localhost:3000/profile/${username}/update`
        const res = await axios.put(updateUrl, {
          id: oldReviewData.postID,
          title: oldReviewData.updateTitle,
          rating: rating,
          postDescription: oldReviewData.updateDescription,
          photo: oldReviewData.updatePhoto
        })
        handleEditForm()
        handleBackdrop()
        refreshPage()

      } catch (err) {
        alert(err)
      }
    } else {
      // checkFilled()
      console.log("not completed")
    }
  }


  const deletePost = async() => {
    try {
      console.log("==delete post id", selectDeleted)
      const deleteUrl = `http://localhost:3000/profile/${username}/delete`
      const res = await axios.delete(deleteUrl, {
        params: {
          postId: selectDeleted
        }
      })
      handleEditForm()
      handleBackdrop()
      refreshPage()
    } catch (err) {
      console.log("==err")
    }
  }



  // uses userPostData to store <Post/> components into userpostDataElements for it to be displayed
  let userPostDataElements
  if (hasReview === true) {
    userPostDataElements = userPostData.map((val, idx) => {
      // console.log ("val:, ", val)
      // Getting rid of {} around date using subString
      const starElements = fillStarArr(val.rating)
      const getDate = val.dateTraveled
      const newDate = getDate.substring(1, getDate.length-1)
      return (
        {
          id: val.id,
          index: idx,
          username: val.username,
          title: val.title,
          dateTraveled: newDate,
          rating: starElements,
          postDescription: val.postDescription,
          photo: val.photo
        }
      )
    })
  }

  
  // console.log("all posts", userPostData)
  // console.log("old review data", oldReviewData)
  // console.log("userPostData[0]", userPostData[0])
  // console.log("userPostData[1]", userPostData[1])
  // console.log("userPostData[2]", userPostData[2])
  // console.log("post elements", userPostDataElements)

  // body
  return (
    <div className="white-background">
      <div className="profile-container">
        {/* backdrop, close setting btn and setting contents */}
        {backdrop && (<div id="modal-backdrop"></div> )}
        {setting && (
          <>   
            <div className="setting-btn-list">
              {/* <IoIosCloseCircleOutline className="close-btn" onClick={handleSetting} /> */}
              <button className="logout-btn" onClick={() => {
                navigate('/')
                handleLogout()
              }}> Log Out 
              </button>
              <button className="cancel-edit-btn" onClick={handleSetting}> Cancel </button>
            </div> 
          </> 
        )}

        {editOptions && 
          <div className="card-update-btn-list">
            <button className="delete-post-btn"
              onClick={() => { 
                deletePost()
              }}
            > 
              Delete 
            </button>
            <button className="edit-btn" 
              onClick={() => {   
                handleEditOptions() 
                handleEditForm() 
              }}
            > 
              Edit
            </button>
            <button className="cancel-update-btn" onClick={() => {{handleBackdrop()} {handleEditOptions()} }}> Cancel </button>
          </div> 
        }

        {showEditForm && 
          <EditPost 
            oldReviewData={oldReviewData} 
            handleReviewData={handleReviewData} 
            handleEditForm={handleEditForm}
            handleBackdrop={handleBackdrop}
            updateStarElements={updateStarElements}
            updatePost={updatePost}
          />}
        


        {/* profile page content */}
        <div>
          <div className="profile-header">
            <h3 className="profile-username"> {username} </h3>
            <IoMdSettings
              className="profile-setting" 
              onClick={handleSetting} 
            />
          </div>
        </div>
  

        {hasReview ? 
          <PostList 
            handleSelectDeleted={handleSelectDeleted}
            handleBackdrop={handleBackdrop}
            handleEditOptions={handleEditOptions}
            editOptions={editOptions}
            refreshPage = {refreshPage}
            handleEditForm={handleEditForm}
            insertReviewData={insertReviewData}
          />
            :
            <h3 className="no-review-txt"> You have no reviews </h3>
        }
      </div>
      {/* <Outlet /> */}
    </div>
  )
}