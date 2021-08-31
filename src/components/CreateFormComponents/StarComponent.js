import { useState } from 'react';
import React from 'react';
import { FaStar } from 'react-icons/fa';
// import { makeStyles } from '@material-ui/core/styles';
import {
	Form,
	ToggleButton,
	ButtonGroup,
	Dropdown,
	DropdownButton,
} from 'react-bootstrap';
// import { TextField } from "@material-ui/core";

// const colors = {
// 	purple: '#4854b4',
// 	grey: '#a9a9a9',
// };

function StarComponent(props) {
	// const [currentValue, setCurrentValue] = useState(0);
	// const [hoverValue, setHoverValue] = useState(undefined);

	// const stars = Array(5).fill(0);

	// const handleClick = (value) => {
	// 	setCurrentValue(value);
	// };

	// const handleMouseOver = (newHoverValue) => {
	// 	setHoverValue(newHoverValue);
	// };

	// const handleMouseLeave = () => {
	// 	setHoverValue(undefined);
	// };

	// const onChange = e => {
	// 	props.onChange(e.target.value);
	// };

	const [show1, formtitl] = useState(false);

	const showtext2 = () => {
		formtitl(true);
	};
	const [initial, final] = useState(props.question);

	const questionChange = (e) => {
		var x = e.target.value;
		if (x.length > (e.maxLength || 0) + 249) showtext2();
		else {
			final(e.target.value);
			const isValid = e.target.value === '' ? false : true;
			props.questionTextChangeHandler(props.questionId, e.target.value, isValid);
		}
	};

	const typeStarChange = (e) => {
		props.starTypeChangeHandler(props.questionId);
	};

	const [value, setValue] = useState('3');
	const [temp, settemp] = useState(props.threshold);
	const numStarsChange = (e) => {
		setValue(e);
		props.starNumChangeHandler(props.questionId, e);
	};
	const [threshold, setThreshold] = useState('2');

	const thresholdChange = (e) => {
		setThreshold(e);
		settemp(e);
		props.starThresholdHandler(props.questionId, e);
	};

	const options = {
		3: '3',
		4: '4',
		5: '5',
		6: '6',
		7: '7',
		8: '8',
		9: '9',
		10: '10',
	};

	// const printQuestion = () => {
	// 	return `The Content is ${value}`
	// }

	return (
		<div>
			<form>
				{console.log(props)}
				{/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label></Form.Label>
						<Form.Control
							as='textarea'
							onChange={questionChange}
							title={props.question}
							value={initial}
							placeholder='Question - Maximum 250 Characters'
							maxlength='250'
							rows='5'
						/>
						{show1 && (
							<Form.Text style={{ color: 'white' }} id='passwordHelpBlock' muted>
								<br></br>
								Question cannot exceed 250 characters
							</Form.Text>
						)}
						<br></br>
						<br></br>
						<div>Number of stars to be displayed : </div>
						<br></br>
						<DropdownButton
							alignRight
							title={options[value]}
							id='dropdown-menu-align-right'
							onSelect={numStarsChange}
							value={props.numStars}
						>
							{Object.keys(options).map((key, id) => (
								<Dropdown.Item key={id} eventKey={key}>
									{options[key]}
								</Dropdown.Item>
							))}
						</DropdownButton>
						<br></br>
						<br></br>

						{/* <div>{printQuestion(value)}</div> */}

						<ButtonGroup>
							<ToggleButton
								type='radio'
								variant={'outline-primary'}
								name='radio'
								checked={!props.isHalfStarAllowed}
								onClick={typeStarChange}
							>
								Full Star
							</ToggleButton>
							<ToggleButton
								type='radio'
								variant={'outline-primary'}
								name='radio'
								checked={props.isHalfStarAllowed}
								onClick={typeStarChange}
							>
								Half Star
							</ToggleButton>
						</ButtonGroup>

						{/* <div>{printQuestion(initial)}</div> */}
						<br />
						<br />
						{/*	<div>Enable user feedback for rating below this : </div>
						<DropdownButton
							alignRight
							title={options[threshold]}
							id='threshold-menu-align-right'
							onSelect={thresholdChange}
							value={props.threshold}

						> */}
						{/* {Object.keys(options).map((key, id) => (
							<Dropdown.Item key={id} eventKey={key}>
								{options[key]}
							</Dropdown.Item>
						))}
						</DropdownButton> */}
					</Form.Group>
				</Form>
			</form>

		</div >
	);
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	stars: {
		display: 'flex',
		flexDirection: 'row',
	},
};

export default StarComponent;
