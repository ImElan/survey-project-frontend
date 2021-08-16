import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import PopUpModal from './PopUpModal';
import 'tachyons';

function SaveFormButton(props) {
	const { formTitle, questionList, saveFormHandler } = props;

	const [show, popup] = useState(false);
	const [err, setAlert] = useState(false);
	const [popUpTitle] = useState('Confirm Submission');
	const [popUpBody] = useState(`Are you sure you want to save "${formTitle}" form?`);

	const popUpOpen = () => {
		popup(true);
	};
	const popUpClose = () => {
		popup(false);
	};

	const showError = () => {
		setAlert(true);
	};

	const errorCheck = () => {
		let flag = true;
		questionList.forEach(function (question) {
			if (question.isValid === false) {
				flag = false;
			}
		});

		if (flag) {
			//no error
			popUpOpen();
		} else {
			//error found
			showError();
		}
	};

	return (
		<div className='text-center'>
			<Alert show={err} variant='danger'>
				<h5>Could not save! Some empty fields found in your form.</h5>
				<Button onClick={() => setAlert(false)} variant='outline-danger'>
					Close!
				</Button>
			</Alert>
			<Button
				variant='dark'
				className='bg-purple f3 fw5 bw1 grow pointer'
				onClick={errorCheck}
			>
				Save Form
			</Button>

			<PopUpModal
				show={show}
				popUpClose={popUpClose}
				popUpTitle={popUpTitle}
				popUpBody={popUpBody}
				confirmHandler={saveFormHandler}
			/>
		</div>
	);
}
export default SaveFormButton;
