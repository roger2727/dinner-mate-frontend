import React from 'react'
import './StarRating.css'
import { useState } from 'react'

const StarRating = () => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    return (
        <div className="star-rating">
            {stars.map((_, index) => (
        <span key={index} className={index < rating ? "star" : "star-outline"}>
          &#9733;
        </span>
      ))}
    </div>
    )
}


export default StarRating