import { useState } from 'react';
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-bootstrap';
// import { TextField } from "@material-ui/core";

function DescComponentt(props) {
	const [initial2, final2] = useState('');

	const handleChange2 = (e) => {
		final2(e.target.value);
		// console.log(e.target.value);
		const isValid = e.target.value === '' ? false : true;
		props.answerParagraphHandler(props.questionId, e.target.value, isValid);
	};

	return (
		<div>
			<form>
				{/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label	style={{ height: 35 }}>
							{props.question}
						</Form.Label>
						<br />

						<Form.Control
							as='textarea'
							rows={7}
							placeholder='Paragraph - Maximum 500 Characters'
							onChange={handleChange2}
							value={initial2}
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

export default DescComponentt;
