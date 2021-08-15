import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function NameForm(props) {
	const handleChange1 = (event) => {
		props.titleChangeHandler(event.target.value);
	};

	const handleChange2 = (event) => {
		props.descriptionChangeHandler(event.target.value);
	};

	return (
		<div>
			<FormControl
				maxLength={40}
				aria-label='Default'
				aria-describedby='inputGroup-sizing-default'
				placeholder='Enter form name'
				value={props.title}
				onChange={handleChange1}
			/>
			<Form.Text id='passwordHelpBlock' muted>
				Form Title cannot exceed 40 characters.
			</Form.Text>
			<FormControl
				maxLength={100}
				as='textarea'
				aria-label='With textarea'
				placeholder='Enter form description'
				value={props.description}
				onChange={handleChange2}
			/>
			<Form.Text id='passwordHelpBlock' muted style={{ display: 'block' }}>
				Form Description cannot exceed 100 characters.
			</Form.Text>
		</div>
	);
}
export default NameForm;
