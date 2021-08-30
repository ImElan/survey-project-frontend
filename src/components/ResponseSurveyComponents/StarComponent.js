import { useState } from 'react';
import React from 'react';
import Rating from '@material-ui/lab/Rating';


function StarComponent(props) {
    const [currentValue, setCurrentValue] = useState(props.answer? parseInt(props.answer): 0);
    const handleClick = (event, value) => {
        console.log(props.questionId);
        props.answerStarSelectHandler(props.questionId, value);
        setCurrentValue(value);
    };
    return (
        <div>
            <div className='mt-5'>
                <label>	{props.question}</label>
                <br />
                <br />
            </div>

            <Rating name="size-large"
                disabled = {props.readOnly? props.readOnly: false}
                size="large"
                onChange={(event, value) => handleClick(event, value)}
                precision={props.isHalfStarAllowed ? 0.5 : 1}
                value={currentValue}
                max={props.numStars}
            />
            <br></br>
            <p>Your rating is:{props.readOnly? props.answer: currentValue}</p>
        </div >
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
    },
};

export default StarComponent;
