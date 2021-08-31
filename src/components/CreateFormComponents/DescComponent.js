import { useState } from 'react';
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-bootstrap';
// import { TextField } from "@material-ui/core";

function DescComponent(props) {
	const [show1, formtit] = useState(false);
	const showtext1 = () => {
		formtit(true);
	};

	const [initial, final] = useState(props.question);
	const [initial2, final2] = useState('');

	const handleChange = (e) => {
		var x = e.target.value;
		if (x.length > (e.maxLength || 0) + 249) showtext1();
		else {
			final(e.target.value);
			const isValid = e.target.value === '' ? false : true;
			props.questionTextChangeHandler(props.questionId, e.target.value, isValid);
		}
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
							as='textarea'
							multiline={true}
							onChange={handleChange}
							title={props.question}
							placeholder='Question - Maximum 250 Characters'
							value={initial}
							maxlength='250'
							rows='5'
						/>
						{show1 && (
							<div>
								<Form.Text style={{ color: 'white' }} id='passwordHelpBlock' muted>
									<br></br>
									Question cannot exceed 250 characters
								</Form.Text>
								<br />
							</div>
						)}
						<br />

						{/* <Form.Control
							as='textarea'
							rows={7}
							readOnly={true}
							placeholder='Paragraph - Maximum 500 Characters'
							onChange={handleChange2}
							value={initial2}
							maxlength='500'
						/> */}

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
