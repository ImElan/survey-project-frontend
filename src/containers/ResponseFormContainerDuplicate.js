import { useEffect, useReducer, useRef, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
	Form,
	InputGroup,
	FormGroup,
	FormControl,
	ControlLabel,
	Spinner,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { responseFormReducer } from './reducers/responseFormReducer';
import isDeepEqual from 'fast-deep-equal/react';
// import { useCallback } from 'react';
import DescComponentt from '../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../components/ResponseSurveyComponents/CheckBoxComponentt';
import StarComponent from '../components/ResponseSurveyComponents/StarComponent';
import SubmitFormButton from '../components/ResponseSurveyComponents/SubmitFormButton';
import Paging from '../components/CreateFormComponents/Paging';

function ResponseFormContainerDuplicate(props) {
	// const formstate = JSON.parse(window.localStorage.getItem('formstate'));
	// console.log(formstate);
	console.log(props.isEditable + ' at top');
	const [isEdit, setIsEdit] = useState(false);

	const [loading, setLoading] = useState(false);

	// const formstate = JSON.parse(window.localStorage.getItem('formstate'));
	// console.log(props)
	// var questions = props.questions;
	var { sendCopy } = props;

	const [currentPage, setCurrentPage] = useState(1);
	const [questionsPerPage, setquestionsPerPage] = useState(props.questionsPerPage);
	const pagechangerequesthandler = (number) => {
		setCurrentPage(number);
	};
	const questionsPerPageHandler = (option) => {
		setquestionsPerPage(option);
	};

	console.log(props.totalQuestions);
	console.log(props.questionsPerPage);
	console.log(currentPage);
	console.log(questionsPerPage);
	// useEffect(() => {
	// 	setCurrentPage(Math.ceil(props.totalQuestions / props.questionsPerPage));
	// }, [props.totalQuestions, props.questionsPerPage]);

	let paginationStartIndex;
	paginationStartIndex = (currentPage - 1) * questionsPerPage;
	if (paginationStartIndex > props.totalQuestions) {
		paginationStartIndex = 0;
	}

	function checkHandler() {
		if (sendCopy === 0) sendCopy = 1;
		else sendCopy = 0;
		//console.log(sendCopy);
		props.handleSendCopy(sendCopy);
	}
	console.log(props.questions);
	const [requiredd, setRequiredd] = useState(-1);
	const scrollFeature = useRef(null);
	var refArray = [];
	// for (var i = 0; i < props.questions.length; i++) {
	// 	refArray.push(useRef(i));
	// }

	const refCallback = (ref) => {
		refArray.push(ref);
	};

	const [responseState, dispatch] = useReducer(responseFormReducer, {
		userid: '',
		answerss: [],
	});

	useEffect(() => {
		var initialAnswers = [];
		for (var i = 0; i < props.questions.length; i++) {
			initialAnswers.push({
				questions: props.questions[i],
				answerarr: props.answers ? props.answers[i].split(',') : [],
				answer: props.answers ? props.answers[i] : '',
				isvalid: false,
			});
		}
		console.log('initial answerss', initialAnswers);
		dispatch({ type: 'SET_INITIAL_ANSWERS', initialAnswers });
	}, [props.answers, props.questions]);
	console.log('After update', responseState.answerss);

	const handleoptionchange = (questionId, option) => {
		dispatch({ type: 'OPTION_SINGLE_SELECT', questionId, option });
	};

	// Method to handle question text change in answer of descriptive component
	const handleAnswerParaChange = (questionId, newParaText, isvalid) => {
		dispatch({ type: 'ANSWER_TEXT_CHANGE', questionId, newParaText, isvalid });
	};

	const handleaddremoveoption = (questionId, option) => {
		dispatch({ type: 'OPTION_ADD_REMOVE', questionId, option });
	};
	const handleAnswerStarChange = (questionId, value) => {
		dispatch({ type: 'CHANGE-RATING', questionId, value });
	};
	// const handleremoveoption = (questionId, optionId) => {
	// 	dispatch({type: 'OPTION_REMOVE',questionId, optionId});
	// 	console.log(responseState.answerss);
	// }
	const handleSubmitForm = async () => {
		const idToken = localStorage.getItem('accessToken');
		const userId = localStorage.getItem('userId');
		// send Post request to backend with the input state as body
		console.log(responseState);
		let questionType = [];
		let questionText = [];
		let answerText = [];
		responseState.answerss.map((answer) => {
			questionType.push(answer.questions.questionType);
			questionText.push(answer.questions.question);
			answerText.push(answer.answer);
		});

		const requestBody = {
			// surveyAnswers: answersToSendToBackend,
			formId: props.formId,
			userId: userId,
			questiontypes: questionType,
			questions: questionText,
			answers: answerText,
			sendCopy: sendCopy,
		};

		console.log(requestBody);

		try {
			let response;
			setLoading(true);
			if (props.isEdit) {
				// response = await axios.put('http://localhost:8080/response/updateresponse',
				//     {
				//         headers: {
				//             "Authorization": `Bearer ${idToken}`,
				//             "Content-type": "application/json; charset=UTF-8"
				//         }
				//     }, requestBody);

				response = await fetch('http://localhost:8080/response/updateresponse', {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${idToken}`,
						'Content-type': 'application/json; charset=UTF-8',
					},
					body: JSON.stringify(requestBody),
				});
				//     const response = await fetch(`http://localhost:8080/response/updateresponse`, {
				// 	headers: {
				// 		"Authorization": `Bearer ${idToken}`,
				// 		"Content-type": "application/json; charset=UTF-8"
				// 	},
				//     requestBody
				// });
				console.log('edit here....', response.data);
				setLoading(false);
			} else {
				try {
					response = await fetch('http://localhost:8080/response', {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${idToken}`,
							'Content-type': 'application/json; charset=UTF-8',
						},
						body: JSON.stringify(requestBody),
					});
					console.log(requestBody);
					console.log('save here....', response.data);
					setLoading(false);
				} catch (error) {
					console.log(error.response);
					setLoading(false);
				}
			}
			console.log(props.isEditable + ' dup');
			props.history.push('/form/thankyou', {
				title: props.title,
				description: props.description,
				isFormEditable: props.isFormEditable,
				formId: props.formId,
				userId: userId,
			});
			// props.setSubmitted(true);
		} catch (error) {
			console.log(error);
			console.log(error.response);
		}
	};
	// Method to render different question component in the UI based on question type.
	const renderQuestionComponent = (question, i) => {
		switch (question.questionType) {
			case 'STAR':
				console.log('Star', responseState.answerss[i]?.answer);
				return (
					<StarComponent
						key={uuidv4()}
						answer={responseState.answerss[i]?.answer}
						question={question.question}
						questionId={question.questionId}
						numStars={question.noOfStars}
						imageData={question.imageData}
						isHalfStarAllowed={question.halfStarAllowed}
						answerStarSelectHandler={handleAnswerStarChange}
						threshold={question.threshold}
						answerFeedbackHandler={handleAnswerParaChange}
						setRequiredd={setRequiredd}
						requiredd={requiredd}
						required={question.required}
						refCallback={refCallback}
						// preview={props.readOnly}
					/>
				);
			case 'DESCRIPTIVE':
				console.log('Descriptive', responseState.answerss[i]?.answer);
				return (
					<DescComponentt
						question={question.question}
						questionId={question.questionId}
						answerParagraphHandler={handleAnswerParaChange}
						answer={responseState.answerss[i]?.answer}
						imageData={question.imageData}
						setRequiredd={setRequiredd}
						requiredd={requiredd}
						required={question.required}
						refCallback={refCallback}
						// preview={props.readOnly}
					/>
				);
			case 'MULTIPLE':
				console.log('multiple', responseState.answerss[i]?.answer);
				return (
					<CheckBoxComponentt
						key={uuidv4()}
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						answeroptionadd={handleaddremoveoption}
						answer={responseState.answerss[i]?.answer}
						imageData={question.imageData}
						setRequiredd={setRequiredd}
						requiredd={requiredd}
						required={question.required}
						refCallback={refCallback}
						// preview={props.readOnly}
					/>
				);
			case 'SINGLE':
				console.log('Single...', responseState.answerss[i]?.answer);
				console.log(question.questionId);
				return (
					<RadioComponentt
						key={uuidv4()}
						answer={responseState.answerss[i]?.answer}
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						answerOptionChange={handleoptionchange}
						imageData={question.imageData}
						setRequiredd={setRequiredd}
						requiredd={requiredd}
						required={question.required}
						refCallback={refCallback}
						// preview={props.readOnly}
					/>
				);
			default:
				break;
		}
	};

	return (
		<Container fluid>
			<Row
				className='justify-content-md-center'
				style={{
					paddingTop: '0px',
					paddingBottom: '15px',
				}}
			>
				<Card
					style={{
						backgroundColor: '#4B0082',
						color: '#FFFFFF',
						padding: '10px',
						borderRadius: '0',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Card.Body>
						<h3 className='text-center'>{props.title}</h3>
						<Card.Text className='text-center'>{props.description}</Card.Text>
					</Card.Body>
				</Card>
			</Row>

			<Row
				className='justify-content-md-center'
				style={{
					paddingTop: '0px',
					paddingBottom: '25px',
				}}
			></Row>

			{props.questions &&
				props.questions
					.slice(
						paginationStartIndex,
						(currentPage - 1) * questionsPerPage + questionsPerPage
					)
					.map((question, i) => (
						<Row
							className='justify-content-md-center'
							key={question.questionId}
							style={{
								paddingTop: '0px',
								paddingBottom: '20px',
								marginTop: '20px',
							}}
						>
							<Col
								sm={9}
								style={{
									padding: '10px 25px',
									borderRadius: '8px',
									backgroundColor: '#F0F0F0', //7866B2
									border: requiredd == i ? 'solid red 2px' : 'solid black 1px',
									//#e6e6e6
								}}
								ref={requiredd == i ? { scrollFeature } : null}
							>
								<Row
									sm='auto'
									style={{
										marginTop: '10px',
									}}
								>
									<Col md='6'>
										<p style={{ fontSize: '25px', fontWeight: 'bold' }}>
											Question {(currentPage - 1) * questionsPerPage + i + 1}
										</p>
									</Col>
								</Row>

								{/* <Row
										sm='auto'
										className='justify-content-end'
										style={{
											marginBottom: '0px',
											//padding: '12px',
										}}
									>
										<Col>
											<Dropdown
												questionId={question.questionId}
												questionType={question.questionType}
												questionTypeChangeHandler={handleQuestionTypeChange}
											/>
										</Col>
										<Col style={{ marginTop: '10px' }}>
											<DeleteButton
												questionId={question.questionId}
												disabled={formState.questions.length <= minQuestionAllowed}
												minQuestions={minQuestionAllowed}
												deleteQuestionHandler={handleRemoveQuestion}
											/>
										</Col>
									</Row> */}

								{/* BASED ON QUESTION TYPE RENDER APPROPRIATE COMPONENT AND PASS IN THE PROPS */}
								{renderQuestionComponent(
									question,
									(currentPage - 1) * questionsPerPage + i
								)}
								{/* <RequiredButton
										rounded={true}
										questionId={answer.questions.questionId}
										required={answer.questions.required}
										requiredChangeHandler={handleRequiredChange}
									/> */}
							</Col>
						</Row>
					))}
			<Row
				className='justify-content-start'
				style={{
					paddingTop: '0px',
					paddingBottom: '20px',
					marginTop: '20px',
					marginLeft: '210px',
				}}
			>
				<Col md={4}>
					<input
						type='checkbox'
						onChange={checkHandler}
						style={{ marginRight: '6px', width: '15px', height: '15px' }}
						disabled={props.preview ? true : false}
					/>
					<label style={{ fontSize: '20px', marginLeft: '10px' }}>
						Do you want a copy of your response?
					</label>
				</Col>
			</Row>

			<Row
				style={{
					marginTop: '10px',
					marginBottom: '10px',
					marginLeft: '15px',
				}}
			>
				<Paging
					totalQuestions={props.totalQuestions}
					questionsPerPage={questionsPerPage}
					pageChangeRequestHandler={pagechangerequesthandler}
					currentPage={currentPage}
				/>
			</Row>
			{loading && (
				<div className='d-flex justify-content-center my-3'>
					<h4 style={{ marginRight: '15px' }}>Submitting the form. Please wait...</h4>
					<Spinner animation='border' variant='primary' />
				</div>
			)}
			{!props.preview && (
				<SubmitFormButton
					answerList={responseState.answerss}
					sendCopy={sendCopy}
					refArray={refArray}
					submitFormHandler={handleSubmitForm}
					setRequiredd={setRequiredd}
					disabled={props.preview ? true : false}
				/>
			)}
		</Container>
	);
}

export default ResponseFormContainerDuplicate;
