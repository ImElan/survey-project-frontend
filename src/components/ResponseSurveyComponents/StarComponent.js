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
            <br />
            {props.imageData && <img src={props.imageData} alt='' id='img' className='img' />}
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


// import { useState } from 'react';
// import React from 'react';
// import Rating from '@material-ui/lab/Rating';


// function StarComponent(props) {
//     const [currentValue, setCurrentValue] = useState(props.answer ? parseInt(props.answer) : 0);
//     const handleClick = (event, value) => {
//         console.log(props.questionId);
//         props.answerStarSelectHandler(props.questionId, value);
//         setCurrentValue(value);
//     };
//     return (
//         <div>
//             <div className='mt-5'>
//                 <label>	{props.question}</label>
//                 <br />
//                 <br />
//             </div>

//             <Rating name="size-large"
//                 disabled={props.readOnly ? props.readOnly : false}
//                 size="large"
//                 onChange={(event, value) => handleClick(event, value)}
//                 precision={props.isHalfStarAllowed ? 0.5 : 1}
//                 value={currentValue}
//                 max={props.numStars}
//             />
//             <br></br>
//             <p>Your rating is:{props.readOnly ? props.answer : currentValue}</p>
//         </div >
//     );
// }

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     stars: {
//         display: 'flex',
//         flexDirection: 'row',
//     },
// };

// export default StarComponent;