import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import PopUpModal from './PopUpModal';

function SaveFormButton(props) {
	const {
		formTitle,
		formDescription,
		questionList,
		saveFormHandler,
		triedToSaveHandler,
	} = props;

	const [show, popup] = useState(false);
	const [err, setAlert] = useState(false);
	const [alertBody, setAlertBody] = useState('');
	const [popUpTitle] = useState('Confirm Submission');
	// const [popUpBody] = useState(`Are you sure you want to save "${formTitle}" form?`);

	const popUpOpen = () => {
		popup(true);
	};
	const popUpClose = () => {
		popup(false);
	};

	const showError = (msg) => {
		setAlertBody(msg);
		setAlert(true);
	};

	const hideError = () => {
		setAlertBody('');
		setAlert(false);
	};

	const errorCheck = () => {
		triedToSaveHandler();
		let flag1 = true;
		let questionArr = [];

		questionList.forEach(function (question) {
			if (question.isValid === false || question.options.isOptionsValid === false) {
				flag1 = false;
			}
			questionArr.push(question.question);
		});

		const questionSet = new Set(questionArr);
		const duplicateArr = questionArr.filter((item) => {
			if (questionSet.has(item)) questionSet.delete(item);
			else return item;
		});

		if (!flag1) {
			showError('Could not save form! Empty fields or Duplicate options found.');
		} else if (duplicateArr.length) {
			showError('Could not save form! Duplicate questions found.');
		} else if (formTitle.trim().length === 0) {
			showError('Could not save form! Form Title Cannot be empty.');
		} else if (formDescription.trim().length === 0) {
			showError('Could not save formr! Form Description Cannot be empty.');
		} else {
			hideError();
			popUpOpen();
		}
	};

	let popUpBody = `Are you sure you want to save "${formTitle}" form?`;
	return (
		<div className='text-center'>
			<Alert show={err} variant='danger'>
				<h5>{alertBody}</h5>
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
