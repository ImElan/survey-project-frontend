import React, { useState } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
// import { BsFillTrashFill } from 'react-icons/bs';

function CheckBoxComponentt(props) {

	const optionss = props.options;


	const handlechange = (e) => {
		// var optionid = e.target.value;
		props.answeroptionadd(props.questionId, e.target.value);
	}

	return (
		<div className='App'>
			<div className='mt-5'>
				<label>	{props.question}</label>
				<br />
				{props.imageData && <img src={props.imageData} alt='' id='img' className='img' />}
				<br />
			</div>

			{<div>
				{optionss.map((option) => {
					return (
						<div className='row' key={option.optionId}>
							<div className='col-md-8'>
								<input
									disabled={props.readOnly ? props.readOnly : false}
									type="checkbox"
									defaultChecked={props.answer ? props.answer.includes(option.option) : false}
									value={option.option}
									onChange={handlechange} /> {option.option}
							</div>
							<br></br>
							{/* {i} */}
						</div>
					);
				})}
			</div>}

			<br />
			<br></br>
		</div>
	);
}

export default CheckBoxComponentt;
