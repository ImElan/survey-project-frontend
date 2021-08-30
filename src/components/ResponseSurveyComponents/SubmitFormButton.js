import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import PopUpModal from '../CreateFormComponents/PopUpModal';
import 'tachyons';

function SubmitFormButton(props) {
	const { answerList, submitFormHandler, setRequiredd } = props;

	const [show, popup] = useState(false);
	const [err, setAlert] = useState(false);
	const [popUpTitle] = useState('Confirm Submission');

	const popUpOpen = () => {
		popup(true);
	};
	const popUpClose = () => {
		popup(false);
	};

	const showError = () => {
		setAlert(true);
	};

	const errorCheck = async () => {
		let flag = true;
		var idx = -1;
		console.log(answerList);
		answerList.forEach(function (answer, index) {
			if (answer.questions.required === true) {
				if (answer.questions.questionType == 'SINGLE'
					|| answer.questions.questionType == 'MULTIPLE') {
					if (answer.answer.length == 0) {
						flag = false;
						if (idx == -1) idx = index;
					}
				} else {
					if (answer.answer == '') {
						flag = false;
						if (idx == -1) idx = index;
					}
				}
			}
		});

		if (flag) {
			//no error
			popUpOpen();
		} else {
			//error found
			showError();
			setRequiredd(idx);
		}
	};

	let popUpBody = `Are you sure you want to submit the form?`;
	return (
		<div className='text-center'>
			<Alert show={err} variant='danger'>
				<h5>Could not submit! Some empty fields found in your form.</h5>
				<Button onClick={() => setAlert(false)} variant='outline-danger'>
					Close!
				</Button>
			</Alert>
			<Button
				className='bg-purple f3 fw5 bw1 grow pointer'
				onClick={errorCheck}
			>
				Submit Form
			</Button>

			<PopUpModal
				show={show}
				popUpClose={popUpClose}
				popUpTitle={popUpTitle}
				popUpBody={popUpBody}
				confirmHandler={submitFormHandler}
			/>
		</div>
	);
}
export default SubmitFormButton;