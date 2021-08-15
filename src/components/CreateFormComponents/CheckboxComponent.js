import React, { useState } from 'react';
import { BsX } from 'react-icons/bs';

function CheckboxComponent(props) {
	const [isEdit, setIsEdit] = useState([false, false, false]);

	const { options } = props;

	//QuestionChange
	const handleChange = (e) => {
		const isValid = e.target.value === '' ? false : true;
		props.questionTextChangeHandler(props.questionId, e.target.value, isValid);
	};

	// ADD option
	const handleOptionAdd = () => {
		let newOption = 'option';
		if (options.length === 10) {
			window.alert('Maximum  limit(10) reached for adding');
			return;
		}
		// setOptions([...options, newOption]);
		props.questionOptionAddHandler(props.questionId, newOption);

		let newo = [...isEdit];
		newo.push(false);
		setIsEdit(newo);
	};

	//After entering new Option in TextBox
	const updateOption = (index) => {
		if (options[index].option === '') {
			window.alert('Option cannot be empty');
			return;
		}

		let newo = [...isEdit];
		newo.splice(index, 1, false);
		setIsEdit(newo);
	};

	// Remove Option
	const handleRemove = (index) => {
		props.questionOptionRemoveHandler(props.questionId, props.options[index].optionId);
	};

	//OnCLickingLabel
	const addOption = (index) => {
		let newo = [...isEdit];
		newo.splice(index, 1, true);

		setIsEdit(newo);
	};

	// Updated Text from TextBox
	const updateValue = (e, i) => {
		// let op = options[index];
		// op.option = e.target.value;
		// let newo = [...options];
		// newo.splice(index, 1, op);

		// setOptions(newo);
		props.questionOptionChangeHandler(
			props.questionId,
			props.options[i].optionId,
			e.target.value
		);
	};

	return (
		<div className='App'>
			<div className='mt-5'>
				<input
					className='form-control'
					value={props.question}
					type='text'
					placeholder='Question'
					size='50'
					maxLength='100'
					onChange={handleChange}
				/>
				<br />
				<br />
			</div>
			<div>
				{options.map((choice, i) => {
					return (
						<div key={i}>
							<input type='checkbox' value={choice.value} />
							{isEdit[i] === false ? (
								<label onClick={() => addOption(i)}>{choice.option}</label>
							) : (
								<input
									type='text'
									value={options[i].option}
									maxLength='100'
									onBlur={() => updateOption(i)}
									onChange={(e) => updateValue(e, i)}
								/>
							)}

							{options.length > 3 ? (
								<button onClick={() => handleRemove(i)}>
									<BsX />
								</button>
							) : (
								<p></p>
							)}
						</div>
					);
				})}
			</div>
			<br />
			<div>
				<button className='btn btn-primary' onClick={handleOptionAdd}>
					Add Option
				</button>
			</div>
		</div>
	);
}

export default CheckboxComponent;
