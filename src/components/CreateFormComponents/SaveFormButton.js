import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import PopUpModal from './PopUpModal';
import 'tachyons';

function SaveFormButton(props) {
	const { formTitle, questionList, saveFormHandler } = props;

	const [show, popup] = useState(false);
	const [err, setAlert] = useState(false);
	const [popUpTitle] = useState('Confirm Submission');

	const [loading, setLoading] = useState(false);
	const changeLoading = () => {
		console.log("call hua")
		setLoading(false);
	}

	const fetchData = () => {
		setLoading(true);

		//Faking API call here
		// setTimeout(() => {
		// 	setLoading(false);
		// }, 3000);
	};

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

	let popUpBody = `Are you sure you want to save "${formTitle}" form?`;
	return (
		<div className='text-center'>
			<Alert show={err} variant='danger'>
				<h5>Could not save! Some empty fields found in your form.</h5>
				<Button onClick={() => { changeLoading(); setAlert(false); }} variant='outline-danger'>
					Close!
				</Button>
			</Alert>
			{/* <Button
				variant='dark'
				className='bg-purple f3 fw5 bw1 grow pointer'
				onClick={errorCheck}
			>
				Save Form
			</Button> */}

			<div style={{ marginTop: "60px" }}>
				<Button variant="dark" className="bg-purple f3 fw5 bw1 grow pointer"
					onClick={() => { errorCheck(); fetchData(); }}
					disabled={loading}>
					{loading && (
						<i
							className="fa fa-refresh fa-spin"
							style={{ marginRight: "5px" }}
						/>
					)}
					{loading && <span>Loading...</span>}
					{!loading && <span style={{ color: "#2080df" }} >Save Form</span>}
				</Button>
			</div>

			<PopUpModal
				show={show}
				popUpClose={popUpClose}
				popUpTitle={popUpTitle}
				popUpBody={popUpBody}
				confirmHandler={saveFormHandler}
				afterClick={changeLoading}
			/>
		</div>
	);
}
export default SaveFormButton;