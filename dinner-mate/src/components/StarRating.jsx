import React from "react";
import "./StarRating.css";


const StarRating = ({ rating }) => {
  const stars = Array(5).fill(0);
  return (
    <div className="star-box">
      {stars.map((_, index) => (
        <span key={index} className={index < rating ? "star" : "star-outline"}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
