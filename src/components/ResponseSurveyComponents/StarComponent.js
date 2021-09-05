import { useState, useRef } from 'react';
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Form } from 'react-bootstrap';
function StarComponent(props) {
	const [initialfb, finalfb] = useState('');

	const ref = useRef(props.questionId);
	if (!props.readOnly) {
		props.refCallback(ref);
	}

	const handleChangefb = (e) => {
		finalfb(e.target.value);
		console.log(e.target.value);
		// props.answerFeedbackHandler(props.questionId, e.target.value, isValid);
	};

	const handleClick = (value) => {
		if (props.answerStarSelectHandler) {
			props.answerStarSelectHandler(props.questionId, value);
			props.setRequiredd(-1);
		}

		// var userFeedback = document.getElementById('userFeedback');
		// if (value >= props.threshold) {
		//     userFeedback.style = "display:none";
		// } else {
		//     userFeedback.style = "display:block";
		// }
		// console.log(userFeedback.innerText);
		// props.setRequiredd(-1);
	};
	return (
		<div ref={ref} className='mt-3'>
			<label style={{ fontSize: 20 }}> {props.question}</label>
			{props.required && <span style={{ color: 'red', fontSize: '25px' }}> * </span>}
			<br />
			<br />
			{props.imageData && <img src={props.imageData} alt='' id='img' className='img' />}

			<ReactStars
				count={props.numStars}
				onChange={(value) => handleClick(value)}
				size={48}
				isHalf={props.isHalfStarAllowed}
				emptyIcon={<i className='far fa-star'></i>}
				halfIcon={<i className='fa fa-star-half-alt'></i>}
				fullIcon={<i className='fa fa-star'></i>}
				activeColor='#ffc107'
				value={props.answer ? props.answer : 0}
				disabled={props.readOnly ? props.readOnly : false}
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
