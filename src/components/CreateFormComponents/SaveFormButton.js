import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import PopUpModal from './PopUpModal';
import 'tachyons';
import './save.css';

function SaveFormButton(props) {
	const { formTitle, questionList, saveFormHandler } = props;

	const [show, popup] = useState(false);
	const [err, setAlert] = useState(false);
	const [popUpTitle] = useState('Confirm Submission');


	const [loading, setLoading] = useState(false);

	

	function newLoading(){

		setLoading(true);
		setTimeout(function(){setLoading(false);popUpOpen();}, 2000);
		
	}

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
			newLoading();
		} else {
			//error found
			showError();
		}
	};

	let popUpBody = `Are you sure you want to save "${formTitle}" form?`;
	return (
		<div className='text-center'>
			<Alert show={err} variant='danger'>
				<h5>Could not save! Some empty fields found in your form.</h5>
				<Button onClick={() => setAlert(false)} variant='outline-danger'>
					Close!
				</Button>
			</Alert>

			<button className="button" onClick={() => {
				errorCheck();
				
			}} 
			disabled={loading}>
				{loading && (
					<i
						className="fa fa-refresh fa-spin"
						style={{ marginRight: "15px" }}
					/>
				)}
				{loading && <span>Loading...</span>}
				{!loading && <span>Save Form</span>}
			</button>

			{/* <Button
				variant='dark'
				className='bg-purple f3 fw5 bw1 grow pointer'
				onClick={errorCheck}
			>
				Save Form
			</Button> */}

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