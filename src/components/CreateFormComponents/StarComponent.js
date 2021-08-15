import { useState } from 'react';
import React from 'react';
import { FaStar } from 'react-icons/fa';
// import { makeStyles } from '@material-ui/core/styles';
import { Form, ToggleButton, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
// import { TextField } from "@material-ui/core";

// const colors = {
// 	purple: '#4854b4',
// 	grey: '#a9a9a9',
// };

function StarComponent(props) {
	// const [currentValue, setCurrentValue] = useState(0);
	// const [hoverValue, setHoverValue] = useState(undefined);
	const [radioValue, setRadioValue] = useState('fullStarPointType');


	const radios = [
		{ name: 'Full Star Points', value: 'fullStarPointType' },
		{ name: 'Half Star Points', value: 'halfStarPointType' }];

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
		props.questionTextChangeHandler(props.questionId, e.target.value,isValid);
	};

	const typeStarChange = (e) => {
		setRadioValue(e.currentTarget.value);
		const isValid = e.target.value === '' ? false : true;
		//props.starTypechangeHandler(props.questionId, e.currentTarget.value,isValid);
	};

	const [value, setValue] = useState('');

	const numStarsChange = (e) => {
		setValue(e)
		const isValid = e.target.value === '' ? false : true;
		//props.starTypechangeHandler(props.questionId,e,isValid);

	}

	const options = {
		3: '3',
		4: '4',
		5: '5',
		6: '6',
		7: '7',
		8: '8',
		9: '9',
		10: '10'
	};

	// const printQuestion = () => {
	// 	return `The Content is ${value}`
	// }


	return (
		<div >
			<form>
				{/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label></Form.Label>
						<Form.Control
							style={{ height: 35 }}
							size='lg'
							type='text'
							onChange={questionChange}
							title={props.question}
							value={initial}
							placeholder='Question - Maximum 250 Characters'
							maxlength="250"
						/>
						<br></br>
						<div >Number of stars required : </div>
						<DropdownButton
							alignRight
							title={options[value]}
							id="dropdown-menu-align-right"
							onSelect={numStarsChange}
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
							{radios.map((radio, idx) => (
								<ToggleButton
									key={idx}
									id={`radio-${idx}`}
									type="radio"
									variant={idx % 2 ? 'outline-success' : 'outline-danger'}
									name="radio"
									value={radio.value}
									checked={radioValue === radio.value}
									onChange={typeStarChange}
								>
									{radio.name}
								</ToggleButton>
							))}
						</ButtonGroup>

						{/* <div>{printQuestion(initial)}</div> */}
						<br />
						<br />
					</Form.Group>
				</Form>
			</form>
			{/* <div style={styles.stars}>
				{stars.map((_, index) => {
					return (
						<FaStar
							key={index}
							size={25}
							onClick={() => handleClick(index + 1)}
							onMouseOver={() => handleMouseOver(index + 1)}
							onMouseLeave={handleMouseLeave}
							color={(hoverValue || currentValue) > index ? colors.purple : colors.grey}
							style={{
								marginRight: 10,
								cursor: 'pointer',
							}}
						/>
					);
				})}
			</div> */}

			{/* Display the Rating */}

			{/* <p>Your Rating Is : {hoverValue || currentValue}</p> */}

			{/* currentValue holds the RATING FINAL VALUE */}
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
