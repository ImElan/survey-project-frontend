import React, { Component, useEffect, useState } from 'react';
import EditableSwitch from './EditableSwitch/EditableSwitch';
import ReactDOM from 'react-dom';
import { Form, InputGroup, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function NameForm(props) {
	const [show1, formtit] = useState(false);
	const [show2, formdesc] = useState(false);
	const showtext1 = () => {
		formtit(true);
	};
	const showtext2 = () => {
		formdesc(true);
	};
	const showtext3 = () => {
		formtit(false);
	};
	const showtext4 = () => {
		formdesc(false);
	};
	const handleChange1 = (event) => {
		var x = event.target.value;
		if (x.length > (event.maxLength || 0) + 79) showtext1();
		else {
			showtext3();
			props.titleChangeHandler(event.target.value);
		}
	};

	const handleChange2 = (event) => {
		var x = event.target.value;
		if (x.length > (event.maxLength || 0) + 249) showtext2();
		else {
			showtext4();
			props.descriptionChangeHandler(event.target.value);
		}
	};

	return (
		<div>
			<Form.Label style={{ marginTop: '15px', color: 'white' }}>Form Name</Form.Label>
			<FormControl
				aria-label='Default'
				aria-describedby='inputGroup-sizing-default'
				placeholder='Enter form name'
				maxLength='80'
				value={props.title}
				onChange={handleChange1}
			/>
			{show1 && (
				<div>
					<Form.Text style={{ color: 'red' }} id='passwordHelpBlock' muted>
						Form title cannot exceed 80 characters
					</Form.Text>
					<br />
				</div>
			)}
			<Form.Label style={{ marginTop: '20px', color: 'white' }}>
				Form Description
			</Form.Label>
			<FormControl
				as='textarea'
				aria-label='With textarea'
				placeholder='Enter form description'
				maxLength='250'
				value={props.description}
				onChange={handleChange2}
			/>
			{show2 && (
				<Form.Text style={{ color: 'red' }} id='passwordHelpBlock' muted>
					Form description cannot exceed 250 characters
				</Form.Text>
			)}
			<EditableSwitch isEditable={props.isEditable} handleIsEditable={props.handleIsEditable}/>
		</div>
	);
}
export default NameForm;
