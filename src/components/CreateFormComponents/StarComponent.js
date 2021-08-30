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

	const [initial, final] = useState('');

	const questionChange = (e) => {
		final(e.target.value);
		const isValid = e.target.value === '' ? false : true;
		props.questionTextChangeHandler(props.questionId, e.target.value, isValid);
	};

	const typeStarChange = (e) => {
		props.starTypeChangeHandler(props.questionId);
	};

	const [value, setValue] = useState('3');

	const numStarsChange = (e) => {
		setValue(e);
		props.starNumChangeHandler(props.questionId, e);
	};
	const [threshold, setThreshold] = useState('2');

	const thresholdChange = (e) => {
		setThreshold(e);
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
				{/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label></Form.Label>
						<Form.Control
							style={{ height: 35 }}
							type='text'
							onChange={questionChange}
							title={props.question}
							value={initial}
							placeholder='Question - Maximum 250 Characters'
							maxlength='250'
						/>
						<br></br>
						<div>Number of stars required : </div>
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

						{/* <div>{printQuestion(value)}</div> */}

						<ButtonGroup>
							<ToggleButton
								type='radio'
								variant={'outline-success'}
								name='radio'
								checked={!props.isHalfStarAllowed}
								onClick={typeStarChange}
							>
								Full Star
							</ToggleButton>
							<ToggleButton
								type='radio'
								variant={'outline-danger'}
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
						<div>Enable user feedback for rating below this : </div>
						<DropdownButton
							alignRight
							title={options[value]}
							id='threshold-menu-align-right'
							onSelect={thresholdChange}
							value={props.threshold}
						>
							{Object.keys(options).map((key, id) => (
								<Dropdown.Item key={id} eventKey={key}>
									{options[key]}
								</Dropdown.Item>
							))}
						</DropdownButton>
					</Form.Group>
				</Form>
			</form>

		</div>
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
