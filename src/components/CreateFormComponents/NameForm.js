import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

function NameForm(props) {
	const handleChange1 = (event) => {
		props.titleChangeHandler(event.target.value);
	};

	const handleChange2 = (event) => {
		props.descriptionChangeHandler(event.target.value);
	};

	return (
		<div>
			<br />
			<InputGroup className='mb-3'>
				<FormControl
					aria-label='Default'
					aria-describedby='inputGroup-sizing-default'
					placeholder='Enter form name'
					value={props.title}
					onChange={handleChange1}
				/>
			</InputGroup>
			<InputGroup classname='mb-3'>
				<FormControl
					as='textarea'
					aria-label='With textarea'
					placeholder='Enter form description'
					value={props.description}
					onChange={handleChange2}
				/>
			</InputGroup>
		</div>
	);
}
export default NameForm;
