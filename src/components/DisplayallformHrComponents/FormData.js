import Modal from 'react-bootstrap/Modal';
import '../../styles/displayforms.css';
import SendEmailComponent from './SendEmailComponent';
import { useState, useEffect } from 'react';
import Preview from '../CreateFormComponents/Preview';
import { Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SendReminderComponent from './SendReminderComponent';
import axios from 'axios';
function FormData(props) {
	const { push } = useHistory();
	const [show, setShow] = useState({
		title: '',
		description: '',
		questions: [],
	});
	const [reminderModalShow, setReminderModalShow] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {}, []);
	const setFormData = () => {
		// show.title = props.form.formTitle;
		// show.description = props.form.formDescription;
		// // show.questions = props.questionList;
		// show.questions = props.form.surveyQuestions.map((question) => {
		// 	return {
		// 		...question,
		// 		imageData: question.image,
		// 	};
		// });

		const newQuestions = props.form.surveyQuestions.map((question) => {
			let optionsArr = null;
			if (question.questionType === 'SINGLE' || question.questionType === 'MULTIPLE') {
				optionsArr = question.options.optionsArray.map((option) => option.option);
			}
			return {
				...question,
				image: null,
				imageData: question.image,
				numStars: question.noOfStars,
				isHalfStarAllowed: question.halfStarAllowed,
				options: optionsArr,
			};
		});

		let show = {
			title: props.form.formTitle,
			description: props.form.formDescription,
			questions: newQuestions,
			totalQuestions: props.form.surveyQuestions.length,
			questionsPerPage: 5,
		};
		setLoading(true);
		try {
			console.log('preview data body', show);
			const response = axios.post('http://localhost:8080/post/preview', show, {
				headers: {
					Authorization: `Bearer ${idToken}`,
					'Content-type': 'application/json; charset=UTF-8',
				},
			});

			response.then((res) => {
				setLoading(false);
				window.localStorage.setItem('objectid', JSON.stringify(res.data));
				window.open('/preview', '_blank');
				// push('/preview');
			});
		} catch (error) {
			setLoading(false);
			console.log(error);
			console.log(error.response);
		}
		// window.localStorage.setItem('formstate', JSON.stringify(show));
		// push('/preview');
	};

	const idToken = localStorage.getItem('accessToken');
	const getAllUsersToRemind = async () => {
		try {
			// const response = await axios.get(
			// 	`http://localhost:8080/accolite/senddetails/${props.formId}`,
			// 	{
			// 		headers: {
			// 			Authorization: `Bearer ${idToken}`,
			// 		},
			// 	}
			// );
			const response = await fetch(
				`http://localhost:8080/accolite/senddetails/${props.formId}`,
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
						'Content-type': 'application/json; charset=UTF-8',
					},
					method: 'GET',
				}
			);
			const dataemp = await response.json();
			// added by me below
			console.log('here', dataemp);
			dataemp.sort(function (a, b) {
				if (a['Employee Name'] < b['Employee Name']) {
					return -1;
				}
				if (a['Employee Name'] > b['Employee Name']) {
					return 1;
				}
				return 0;
			});
			setEmployees(dataemp);
			setReminderModalShow(true);
		} catch (error) {
			console.log(error.data);
		}
	};

	const closeModal = () => {
		setModalShow(false);
	};
	const closeReminderModal = () => {
		setReminderModalShow(false);
	};

	console.log(props.form);
	return (
		<div className='formdata-wrapper'>
			{loading && (
				<div className='d-flex justify-content-center my-3'>
					<h4 style={{ marginRight: '15px' }}>Please wait...</h4>
					<Spinner animation='border' variant='primary' />
				</div>
			)}
			<div className='row'>
				<div className='col-md-7 col-sm-12 col-xs-12'>
					<h2 style={{ padding: 0 }}>{props.form.formTitle}</h2>
					<p>{props.form.formDescription}</p>
				</div>
				<div className='col-md-5 col-sm-12 col-xs-12 btns'>
					<div className='flex-left'>
						<button
							className='btn btn-primary'
							onClick={() =>
								props.history.push('/viewresponses', {
									id: props.form.id,
									title: props.form.formTitle,
								})
							}
						>
							Responses
						</button>
					</div>
					<div className='flex-left'>
						<button className='btn btn-primary ' onClick={setFormData}>
							Preview
						</button>
					</div>
					<div className='flex-left'>
						<button
							className='btn btn-primary btn-xs'
							onClick={() => props.history.push(`/forms/${props.form.id}/edit`)}
						>
							Edit
						</button>
					</div>
					<div className='flex-left'>
						<Button variant='primary' onClick={() => setModalShow(true)}>
							Send
						</Button>

						<SendEmailComponent
							show={modalShow}
							handleModalClose={closeModal}
							handleAlertState={props.handleAlertState}
							formId={props.formId}
							onHide={() => setModalShow(false)}
						/>
					</div>
					<div className='flex-left'>
						<button className='btn btn-primary' onClick={getAllUsersToRemind}>
							Reminder
						</button>
						<SendReminderComponent
							show={reminderModalShow}
							handleModalClose={closeReminderModal}
							handleAlertState={props.handleAlertState}
							formId={props.formId}
							formTitle={props.form.formTitle}
							onHide={() => setReminderModalShow(false)}
							employees={employees}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default FormData;
