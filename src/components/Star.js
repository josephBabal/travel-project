import React from 'react'

export default function Star(props) {
  const styles = {
    color: props.isSelected ? "#C3C500" : ""
  }
  return (
    <div 
      className="post-star" 
      onClick={props.clickStar}
      onMouseOver={props.clickStar}
      onMouseOut={props.unhoveredStar}
      style={styles} 
    >
      {props.isSelected ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>} 
    </div>
  )
}