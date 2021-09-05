// import React, { useState } from 'react';
// import { FormControl, FormLabel } from 'react-bootstrap';
// // import { BsFillTrashFill } from 'react-icons/bs';

// function CheckBoxComponentt(props) {

// 	const optionss = props.options;

// 	const handlechange = (e) => {
// 		// var optionid = e.target.value;
// 		props.answeroptionadd(props.questionId, e.target.value);
// 		props.setRequiredd(-1);
// 	}

// 	return (
// 		<div className='App'>
// 			<div className='mt-5'>
// 				<label>	{props.question}</label>
// 				<br />
// 				{props.imageData && <img src={props.imageData} alt='' id='img' className='img' />}
// 				<br />
// 			</div>

// 			{<div>
// 				{optionss.map((option) => {
// 					return (
// 						<div className='row' key={option.optionId}>
// 							<div className='col-md-8'>
// 								<input
// 									disabled={props.readOnly ? props.readOnly : false}
// 									type="checkbox"
// 									defaultChecked={props.answer ? props.answer.includes(option.option) : false}
// 									value={option.option}
// 									onChange={handlechange} /> {option.option}
// 							</div>
// 							<br></br>
// 							{/* {i} */}
// 						</div>
// 					);
// 				})}
// 			</div>}

// 			<br />
// 			<br></br>
// 		</div>
// 	);
// }

// export default CheckBoxComponentt;

import React, { useState, useEffect, useRef } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
// import { BsFillTrashFill } from 'react-icons/bs';

function CheckBoxComponentt(props) {
	const optionss = props.options;

	const ref = useRef(props.questionId);
	if (!props.readOnly) {
		props.refCallback(ref);
	}

	console.log('in checkbox', props.answer ? props.answer.includes(optionss[2]) : false);
	// const [temp, setTemp] = useState(1);
	const handlechange = (e) => {
		// var optionid = e.target.value;
		props.answeroptionadd(props.questionId, e.target.value);
		props.setRequiredd(-1);
	};
	// useEffect(() => {
	// 	setTemp(temp + 1);
	// }, [props.answer])
	return (
		<div ref={ref} className='App mb-2'>
			<div className='mt-3'>
				<label style={{ fontSize: 20 }}> {props.question}</label>
				{props.required && <span style={{ color: 'red', fontSize: '25px' }}> * </span>}
				<br />
				<br />
				{props.imageData && <img src={props.imageData} alt='' id='img' className='img' />}
				<br></br>
			</div>
			<br></br>
			{props.readOnly ? (
				<div>
					{optionss.map((option, i) => {
						return (
							<div className='row' key={i}>
								<div className='col-md-8 mb-2'>
									<input
										disabled={true}
										type='checkbox'
										checked={props.answer ? props.answer.includes(option) : false}
										value={option}
										onChange={handlechange}
									/>{' '}
									<span style={{ fontSize: 20 }}>{option}</span>
								</div>
								<br></br>
								{/* {i} */}
							</div>
						);
					})}
				</div>
			) : (
				<div>
					{optionss.map((option, i) => {
						return (
							<div className='row' key={i}>
								<div className='col-md-8 mb-2'>
									<input
										type='checkbox'
										defaultChecked={props.answer ? props.answer.includes(option) : false}
										value={option}
										onChange={handlechange}
									/>{' '}
									<span style={{ fontSize: 20 }}>{option}</span>
								</div>
								<br></br>
								{/* {i} */}
							</div>
						);
					})}
				</div>
			)}
			{/* <br /> */}
		</div>
	);
}

export default CheckBoxComponentt;
