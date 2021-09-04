import React, { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { Form, Alert } from 'react-bootstrap';
function RadioComponent(props) {
	const [isEdit, setIsEdit] = useState([false, false]); //Options state
	const { options } = props;
	const [optionMax, isOptionMax] = useState(false); // Options Char Length
	const [questionMax, isQuestionMax] = useState(false); // Question Max Length
	const [optionNull, isOptionNull] = useState(false); //Options Null
	const [optionArr, isOptionArr] = useState(false); // Number of Options
	const [sameOption, isSameOption] = useState(false); // Is two Options Same
	const [show, setShow] = useState(true); // Alert

	//QuestionChange
	const handleChange = (e) => {
		var x = e.target.value;
		if (x.length > (e.maxLength || 0) + 249) isQuestionMax(true);
		else isQuestionMax(false);
		const isValid = e.target.value === '' ? false : true;
		props.questionTextChangeHandler(props.questionId, e.target.value, isValid);
	};

	// ADD option
	const handleOptionAdd = () => {
		let newOption = `Option ${props.options.optionsArray.length + 1}`;
		setShow(false);
		if (options.optionsArray.length === 10) {
			setShow(true);
			isOptionArr(true);
			isSameOption(false);
			isOptionNull(false);
			isOptionMax(false);
			return;
		} else {
			isOptionArr(false);
			props.questionOptionAddHandler(props.questionId, newOption);

			let newo = [...isEdit];
			newo.push(false);
			setIsEdit(newo);
		}
	};

	//After entering new Option in TextBox
	const updateOption = (index) => {
		if (options.optionsArray[index].option === '') {
			setShow(true);
			isOptionNull(true);
			isOptionArr(false);
			isSameOption(false);
			isOptionMax(false);
			// return;
		} else {
			let newo = [...isEdit];
			newo.splice(index, 1, false);
			setIsEdit(newo);
			isOptionNull(false);
		}
	};

	// Remove Option
	const handleRemove = (index) => {
		isOptionArr(false);

		function checkIfDuplicateExists(w) {
			return new Set(w).size !== w.length;
		}

		const isValid = !checkIfDuplicateExists(options.optionsArray);

		props.questionOptionRemoveHandler(
			props.questionId,
			props.options.optionsArray[index].optionId,
			isValid
		);
	};

	//OnCLickingLabel
	const addOption = (index) => {
		let newo = [...isEdit];
		newo.splice(index, 1, true);

		setIsEdit(newo);
	};

	// Updated Text from TextBox
	const updateValue = (e, i) => {
		setShow(false);
		let x = e.target.value;
		if (x === '') {
			setShow(true);
			isSameOption(false);
			isOptionNull(true);
			isOptionArr(false);
			isOptionMax(false);
			// return;
		} else isOptionNull(false);
		if (x.length > (e.maxLength || 0) + 249) {
			setShow(true);
			isOptionMax(true);
			isOptionNull(false);
			isSameOption(false);
			isOptionArr(false);
		} else isOptionMax(false);

		let isSame;

		props.options.optionsArray.map((value) => {
			if (x === value.option) {
				setShow(false);
				isSame = true;
				// return;
			}
		});
		if (isSame) {
			setShow(true);
			isSameOption(true);
			isOptionNull(false);
			isOptionArr(false);
			isOptionMax(false);
		}

		let valid = false;

		props.options.optionsArray.map((value) => {
			props.options.optionsArray.map((value1) => {
				if (value.option === value1.option && value.optionId != value1.optionId) {
					valid = true;
				}
			});
		});
		props.options.optionsArray.map((value) => {
			if (x === value.option || x === '' || value.option === '') {
				valid = true;
			}
		});

		if (valid) {
			console.log('false');
			props.questionOptionChangeHandler(
				props.questionId,
				props.options.optionsArray[i].optionId,
				e.target.value,
				false
			);
		} else {
			console.log('true');
			props.questionOptionChangeHandler(
				props.questionId,
				props.options.optionsArray[i].optionId,
				e.target.value,
				true
			);
		}
	};

	return (
		<div className='App'>
			<div className='mt-4'>
				<textarea
					className='form-control'
					value={props.question}
					type='text'
					placeholder='Question - Maximum 250 Characters'
					size='50'
					multiline={true}
					rows='5'
					maxLength='250'
					onChange={handleChange}
				/>
				{questionMax && (
					<Form.Text style={{ color: 'white' }} id='passwordHelpBlock' muted>
						Question Text cannot exceed 250 characters
					</Form.Text>
				)}
				<br />
				<br />
			</div>
			<div>
				{options.optionsArray.map((choice, i) => {
					return (
						<div key={i} className='row'>
							<div className='col-md-8'>
								<span>
									<input type='radio' value={choice.value} name='opt' />
								</span>
								{isEdit[i] === false ? (
									<label
										style={{ display: 'inline', marginLeft: '10px' }}
										onClick={() => addOption(i)}
									>
										{choice.option}
									</label>
								) : (
									<div style={{ display: 'inline', marginLeft: '15px' }}>
										<textarea
											type='text'
											value={options.optionsArray[i].option}
											className='form-control'
											maxLength='250'
											autoFocus='autofocus'
											onBlur={() => updateOption(i)}
											onChange={(e) => updateValue(e, i)}
											multiline={true}
										/>
									</div>
								)}
							</div>

							{options.optionsArray.length > 2 ? (
								<div className='col-md-4'>
									<BsFillTrashFill
										className='float-end'
										onClick={() => handleRemove(i)}
									/>
								</div>
							) : (
								<></>
							)}
						</div>
					);
				})}
			</div>

			<br></br>
			{optionMax && show && (
				<Alert variant='danger' onClose={() => setShow(false)} dismissible>
					OptionText cannot exceed 250 characters
				</Alert>
				// <div class="alert alert-warning" role="alert">
				// 	OptionText cannot exceed 250 characters
				// </div>
				// <Form.Text style={{ color: 'white' }} id='passwordHelpBlock' muted>

				// </Form.Text>
			)}
			<br></br>
			{optionNull && show && (
				<Alert variant='danger' onClose={() => setShow(false)} dismissible>
					OptionText cannot be empty
				</Alert>
				// <div class="alert alert-warning" role="alert">
				// 	OptionText cannot be empty
				// </div>
				// <Form.Text  style={{ color: 'white' }} id='passwordHelpBlock' muted>
				// 	Option cannot be empty
				// </Form.Text>
			)}

			<div>
				<button className='btn btn-primary' onClick={handleOptionAdd}>
					Add Option
				</button>
				<br></br>
				<br></br>
				{/* {x&&<label>Cannot have same name</label>} */}
				{optionArr && show && (
					// 	<div class="alert alert-warning alert-dismissible fade show" role="alert">
					// 	Maximum 10 options allowed
					//
					//   </div>
					<Alert variant='danger' onClose={() => setShow(false)} dismissible>
						Maximum 10 options allowed
					</Alert>
					// <Form.Text style={{ color: 'white' }} id='passwordHelpBlock' muted>
					// 	Maximum 10 options allowed
					// </Form.Text>
				)}

				{sameOption && show && (
					// 	<Form.Text  style={{ color: 'white' }} id='passwordHelpBlock' muted>
					// 	No two options can have same value
					// </Form.Text>
					// <div class="alert alert-warning" role="alert">
					// 	No two options can have same value
					// </div>
					<Alert variant='danger' onClose={() => setShow(false)} dismissible>
						No two options can have same value
					</Alert>
				)}
			</div>
			<br></br>
		</div>
	);
}

export default RadioComponent;
