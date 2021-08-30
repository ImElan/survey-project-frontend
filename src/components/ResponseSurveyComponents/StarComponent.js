import { useState } from 'react';
import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Form } from 'react-bootstrap';
function StarComponent(props) {
    const [initialfb, finalfb] = useState('');

    const handleChangefb = (e) => {
        finalfb(e.target.value);
        console.log(e.target.value);
        const isValid = e.target.value === '' ? false : true;
        props.answerFeedbackHandler(props.questionId, e.target.value, isValid);
    };

    const handleClick = (value) => {
        props.answerStarSelectHandler(props.questionId, value);

        var userFeedback = document.getElementById('userFeedback');
        if (value >= props.threshold) {
            userFeedback.style = "display:none";
        } else {
            userFeedback.style = "display:block";
        }
        console.log(userFeedback.innerText);
        props.setRequiredd(-1);
    };
    return (
        <div className='mt-5'>
            <label>	{props.question}</label>
            <br />
            {props.imageData && <img src={props.imageData} alt='' id='img' className='img' />}
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
            <Form.Control
                id='userFeedback'
                style={{ display: 'none' }}
                as='textarea'
                rows={7}
                placeholder='give feedback'
                onChange={handleChangefb}
                value={initialfb}
            />
        </div>
    );
}


export default StarComponent;