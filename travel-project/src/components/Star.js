import React from 'react'
import {FaStar} from 'react-icons/fa'

export default function Star(props) {
  return (
    <label>
      <input
        type="radio" 
        name="ratingValue" 
        value={props.ratingValue}
        onClick={props.updateRating}
      />
      <FaStar 
        className="post-star" 
        // checks if props.hover is >= the star rating value first, then the selectedRating
        // if the first case is true then sets to yellow color, then checks second case
        color={props.ratingValue <= (props.hover || props.selectedRating) ? "#FFC107" : "E4E5E9"}
        onMouseEnter={props.updateHover}
        onMouseLeave={props.resetHover}
    />
    </label>
  )
}