// import { useState } from 'react';
// import React from 'react';
// // import { makeStyles } from '@material-ui/core/styles';
// import { Form } from 'react-bootstrap';
// // import { TextField } from "@material-ui/core";
// // import { Control, Form, Errors, actions } from 'react-redux-form';

// function DescComponentt(props) {

// 	// const required = (val) => val && val.length;
// 	// it receivers len and val as parameter
// 	// const maxLength = (len) => (val) => !(val) || (val.length <= len)
// 	// const minLength = (len) => (val) => (val) && (val.length >=len);

// 	const [initial2, final2] = useState('');

// 	const handleChange2 = (e) => {
// 		final2(e.target.value);
// 		// console.log(e.target.value);
// 		const isValid = e.target.value === '' ? false : true;
// 		props.answerParagraphHandler(props.questionId, e.target.value, isValid);
// 		props.setRequiredd(-1);
// 	};

// 	return (
// 		<div>
// 			{/* <form> */}
// 			{/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
// 			<Form>
// 				<Form.Group className='mb-3' controlId='formBasicEmail'>
// 					<Form.Label style={{ height: 35 }}>
// 						{props.question}
// 					</Form.Label>
// 					<br />
// 					{props.imageData && <img src={props.imageData} alt='' id='img' className='img' />}

// 					<Form.Control
// 						disabled={props.readOnly ? props.readOnly : false}
// 						as='textarea'
// 						rows={7}
// 						placeholder='Paragraph - Maximum 500 Characters'
// 						onChange={handleChange2}
// 						defaultValue={props.answer ? props.answer : initial2}
// 					// validators = {{
// 					// 	required, minLength: minLength(3), maxLength: maxLength(15)
// 					// }}
// 					/>

// 					<br />
// 				</Form.Group>
// 			</Form>
// 			{/* </form> */}
// 		</div>
// 	);
// }

// const styles = {
// 	container: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// 	stars: {
// 		display: 'flex',
// 		flexDirection: 'row',
// 	},
// };

// export default DescComponentt;

import { useState } from 'react';
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-bootstrap';
// import { TextField } from "@material-ui/core";
// import { Control, Form, Errors, actions } from 'react-redux-form';

function DescComponentt(props) {
	const required = (val) => val && val.length;
	// it receivers len and val as parameter
	const maxLength = (len) => (val) => !val || val.length <= len;
	const minLength = (len) => (val) => val && val.length >= len;

	const [initial2, final2] = useState('');

	const handleChange2 = (e) => {
		final2(e.target.value);
		// console.log(e.target.value);
		const isValid = e.target.value === '' ? false : true;
		props.answerParagraphHandler(props.questionId, e.target.value, isValid);
	};

	const handleKeyDown = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
		// In case you have a limitation
		// var limitt = 20
		// e.target.style.height = `${Math.min(e.target.scrollHeight, limitt)}px`;
	};

	return (
		<div>
			{/* <form> */}
			{/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
			<Form>
				<Form.Group className='mt-3 mb-3' controlId='formBasicEmail'>
					<Form.Label className='mb-3' style={{ fontSize: 20 }}>
						{props.question}
					</Form.Label>
					{props.imageData && (
						<div>
							<img src={props.imageData} alt='' id='img' className='img' />
							<br></br>
						</div>
					)}
					<br></br>
					<br />
					<Form.Control
						disabled={props.readOnly ? true : false}
						as='textarea'
						rows={3}
						style={{ fontSize: 20 }}
						placeholder='Paragraph - Maximum 500 Characters'
						onChange={handleChange2}
						onKeyDown={handleKeyDown}
						defaultValue={props.answer ? props.answer : initial2}
						// validators = {{
						// 	required, minLength: minLength(3), maxLength: maxLength(15)
						// }}
					/>

					{/* <br /> */}
				</Form.Group>
			</Form>
			{/* </form> */}
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
