import { useState } from 'react';
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-bootstrap';
// import { TextField } from "@material-ui/core";

function DescComponent(props) {
	const [initial, final] = useState('');
	const [initial2, final2] = useState('');

	const handleChange = (e) => {
		final(e.target.value);
		const isValid = e.target.value === '' ? false : true;
		props.questionTextChangeHandler(props.questionId, e.target.value, isValid);
	};
	const handleChange2 = (e) => {
		final2(e.target.value);
	};

	return (
		<div>
			<form>
				{/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label></Form.Label>
						<br />

						<Form.Control
							style={{ height: 35 }}
							size='lg'
							type='text'
							onChange={handleChange}
							title={props.question}
							placeholder='Question - Maximum 250 Characters'
							value={initial}
							maxlength='250'
						/>
						<br />

						<Form.Control
							as='textarea'
							rows={7}
							readOnly={true}
							placeholder='Paragraph - Maximum 500 Characters'
							onChange={handleChange2}
							value={initial2}
							maxlength='500'
						/>

						<br />
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

export default DescComponent;
