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
				<br />
			</div>

			<div>
				{optionss.map((option,i) => {
					return (
						<div  className='row' key={i}>
							<div className='col-md-8'>
								<input 
								disabled={props.readOnly}
                                type="checkbox" 
								checked={props.answer?.includes(i)}
                                value={i}
                                onChange={handlechange}/> {option}
							</div>
							<br></br>
							{/* {i} */}
						</div>
					);
				})}
			</div>
			<br />
			<br></br>
		</div>
	);
}

export default CheckBoxComponentt;
