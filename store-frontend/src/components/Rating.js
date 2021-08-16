import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

function Rating({ value, text, color }) {
  const ratings = [];
  for (let index = 0; index < 5; index++) {
    ratings.push(
      <i key={index}>
          {value >= index + 1 ? (
            <FaStar key={index} />
          ) : value >= index + 0.5 ? (
            <FaStarHalfAlt key={index}/>
          ) : (
            <FaRegStar key={index} />
          )}
          <span />
      </i>
    );
  }
  return (
    <div className="rating">
      {ratings.map((rating) => rating)}
      <br/>
      {text ? text : null}
    </div>
  );
}

export default Rating;
