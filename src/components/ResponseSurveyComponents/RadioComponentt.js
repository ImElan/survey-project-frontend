import React, { useState } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
// import { BsFillTrashFill } from 'react-icons/bs';

function RadioComponentt(props) {
	
	const optionss = props.options;

	const handlechange = (e) => {
		// console.log(e.target.value);
		props.answerOptionChange(props.questionId,e.target.value);
	  }

	return (
		<div className='App'>
			<div className='mt-5'>
				<label>	{props.question}</label>
				<br />
				<br />
			</div>

			<div onChange={handlechange}>
				{optionss.map((option,i) => {
					return (
						<div  className='row' key={i}>
							<div className='col-md-8'>
								<input 
								disabled={props.readOnly}
								checked={props.answer === i}
								type="radio" 
								value={i} 
								name="allselect" /> {option}
							</div>
							<br></br>
						</div>
					);
				})}
			</div>
			<br />
			<br></br>
		</div>
	);
}

export default RadioComponentt;
