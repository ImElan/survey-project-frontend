import { useState } from 'react';
import React from 'react';
import ReactStars from "react-rating-stars-component";

function StarComponent(props) {
    const [currentValue, setCurrentValue] = useState(0);
    const handleClick = (value) => {
        // console.log(props.questionId);
        props.answerStarSelectHandler(props.questionId, value);
        setCurrentValue(value);
        // props.setRequiredd(-1);
    };
    return (
<<<<<<< HEAD
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
=======
        <div>
            <div className='mt-5'>
                <label>	{props.question}</label>
                <br />
                <br />
            </div>

            <Rating name="size-large"
                disabled = {props.readOnly}
                size="large"
                onChange={(event, value) => handleClick(event, value)}
                defaultValue={5}
                precision={props.isHalfStarAllowed ? 0.5 : 1}
                value={props.readOnly? props.answer: currentValue}
                max={props.numStars}
            />
            <br></br>
            <p>Your rating is:{props.readOnly? props.answer: currentValue}</p>
        </div >
>>>>>>> ViewResponse
    );
}

export default StarComponent;