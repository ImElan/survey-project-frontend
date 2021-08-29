import { useState } from 'react';
import React from 'react';
import ReactStars from "react-rating-stars-component";

function StarComponent(props) {
    const handleClick = (value) => {
        props.answerStarSelectHandler(props.questionId, value);
    };
    return (
        <div className='mt-5'>
            <label>	{props.question}</label>
            <br />
            <ReactStars
                count={props.numStars}
                onChange={(value) => handleClick(value)}
                size={48}
                isHalf={props.isHalfStarAllowed}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffc107"
            />
        </div>
    );
}


export default StarComponent;