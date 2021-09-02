// import React, { useState } from 'react';
// import { FormControl, FormLabel } from 'react-bootstrap';
// // import { BsFillTrashFill } from 'react-icons/bs';

// function RadioComponentt(props) {

// 	const optionss = props.options;

// 	const handlechange = (e) => {
// 		console.log(e.target.value);
// 		props.answerOptionChange(props.questionId,e.target.value);
// 	  }

// 	return (
// 		<div className='App'>
// 			<div className='mt-5'>
// 				<label>	{props.question}</label>
// 				<br />
// 				<br />
// 			</div>

// 			{props.readOnly?
// 			<div>
// 				{optionss.map((option,i) => {
// 					return (
// 						<div  className='row' key={i}>
// 							<div className='col-md-8'>
// 								<input
// 								disabled={props.readOnly}
// 								checked={props.answer === i}
// 								type="radio"
// 								value={option}
// 								name="allselect" /> {option}
// 							</div>
// 							<br></br>
// 						</div>
// 					);
// 				})}
// 			</div>
// 			: <div onChange={handlechange} >
// 				{optionss.map((option,i) => {
// 					return (
// 						<div  className='row' key={i}>
// 							<div className='col-md-8'>
// 								<input
// 								defaultChecked={props.answer? props.answer === option: false}
// 								type="radio"
// 								value={option}
// 								name="allselect" /> {option}
// 							</div>
// 							<br></br>
// 						</div>
// 					);
// 				})}
// 			</div>}
// 			<br />
// 			<br></br>
// 		</div>
// 	);
// }

// export default RadioComponentt;

import React, { useState } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
// import { BsFillTrashFill } from 'react-icons/bs';

import { v4 as uuidv4 } from 'uuid';
function RadioComponentt(props) {
	const optionss = props.options;

	const handlechange = (e) => {
		console.log(e.target.value);
		props.answerOptionChange(props.questionId, e.target.value);
	};

	return (
		<div className='App'>
			<div className='mt-5'>
				<label> {props.question}</label>
				<br />
				<br />
			</div>
			{props.imageData && <img src={props.imageData} alt='' id='img' className='img' />}
			<br></br>
			{props.readOnly ? (
				<div>
					{optionss.map((option, i) => {
						return (
							<div className='row' key={i}>
								<div className='col-md-8'>
									<input
										disabled={props.readOnly}
										checked={props.answer === i}
										type='radio'
										value={option}
										name='allselect'
									/>{' '}
									{option}
								</div>
								<br></br>
							</div>
						);
					})}
				</div>
			) : (
				<div onChange={handlechange}>
					{optionss.map((option, i) => {
						return (
							<div className='row' key={i}>
								<div className='col-md-8'>
									<input
										defaultChecked={props.answer ? props.answer === option : false}
										type='radio'
										value={option}
										name='allselect'
									/>{' '}
									{option}
								</div>
								<br></br>
							</div>
						);
					})}
				</div>
			)}
			<br />
			<br></br>
		</div>
	);
}

export default RadioComponentt;
