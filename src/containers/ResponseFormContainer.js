import { useEffect, useReducer, useRef, useState } from 'react';
import React from 'react';
import SubmitFormButton from '../components/ResponseSurveyComponents/SubmitFormButton';
import { Container, Row, Col } from 'react-bootstrap';
import { responseFormReducer } from './reducers/responseFormReducer';
import isDeepEqual from 'fast-deep-equal/react'
// import { useCallback } from 'react';
import DescComponentt from '../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../components/ResponseSurveyComponents/CheckBoxComponentt';
import StarComponent from '../components/ResponseSurveyComponents/StarComponent';
import axios from 'axios';

function ResponseFormContainer(props) {
	let { sendCopy } = props;

	function checkHandler() {
		if (sendCopy === 0)
			sendCopy = 1;
		else
			sendCopy = 0;
		//console.log(sendCopy);
	}
	const formstate = JSON.parse(window.localStorage.getItem('formstate'));
	console.log(props);
	var questions = props.questions;
	// console.log(questions);

	const [responseState, dispatch] = useReducer(responseFormReducer, {
		userid: '',
		questions: questions,
	});





	const [requiredd, setRequiredd] = useState(-1);
	const handleoptionchange = (questionId, optionId) => {
		dispatch({ type: 'OPTION_SINGLE_SELECT', questionId, optionId });
		console.log(responseState.answerss);
	}

	// Method to handle question text change in answer of descriptive component
	const handleAnswerParaChange = (questionId, newParaText, isvalid) => {
		dispatch({ type: 'ANSWER_TEXT_CHANGE', questionId, newParaText, isvalid });
		console.log(responseState.answerss);
	};

	const handleaddremoveoption = (questionId, optionId) => {
		dispatch({ type: 'OPTION_ADD_REMOVE', questionId, optionId });
		console.log(responseState.answerss);
	}
	const handleAnswerStarChange = (questionId, value) => {

		dispatch({ type: 'CHANGE-RATING', questionId, value });
	}
	// const handleremoveoption = (questionId, optionId) => {
	// 	dispatch({type: 'OPTION_REMOVE',questionId, optionId});
	// 	console.log(responseState.answerss);
	// }

	const handleSubmitForm = async () => {
		// send Post request to backend with the input state as body
		console.log(responseState);
		const answersToSendToBackend = responseState.answerss.map((question) => {
			console.log(question.options);
			if (question.questionType == "STAR") {
				return {
					questionType: question.questionType,
					question: question.question,
					noOfStars: question.numStars,
					isHalfStarAllowed: question.isHalfStarAllowed,
					isRequired: question.required,
					answer: question.answer
				};

			} else {
				const optionsArr = question.options.map((option) => option);
				return {
					questionType: question.questionType,
					question: question.question,
					options: optionsArr,
					isRequired: question.required,
					answer: question.answer
				};
			}

		});

		const requestBody = {
			surveyAnswers: answersToSendToBackend,
		};

		console.log(requestBody);

		try {
			const response = await axios.post('http://localhost:8080/response', requestBody);
			console.log(response.data);
			props.setSubmitted(true);
		} catch (error) {
			console.log(error);
			console.log(error.response);
		}
	};
	// Method to render different question component in the UI based on question type.
	const renderQuestionComponent = (question) => {
		console.log(question);
		switch (question.questionType) {
			case 'STAR':
				return (
					<StarComponent
						question={question.question}
						questionId={question.questionId}
						numStars={question.numStars}
						isHalfStarAllowed={question.isHalfStarAllowed}
						answerStarSelectHandler={handleAnswerStarChange}
						imageData={question.imageData}
						answerFeedbackHandler={handleAnswerParaChange}
						threshold={question.threshold}
						setRequiredd={setRequiredd}
					/>
				);
			case 'DESCRIPTIVE':
				return (
					<DescComponentt
						question={question.question}
						questionId={question.questionId}
						answerParagraphHandler={handleAnswerParaChange}
						imageData={question.imageData}
						setRequiredd={setRequiredd}
					/>
				);
			case 'MULTIPLE':
				return (
					<CheckBoxComponentt
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						answeroptionadd={handleaddremoveoption}
						imageData={question.imageData}
						setRequiredd={setRequiredd}

					/>
				);
			case 'SINGLE':
				console.log("came here too");
				return (
					<RadioComponentt
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						answerOptionChange={handleoptionchange}
						imageData={question.imageData}
						setRequiredd={setRequiredd}
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
					backgroundColor: '#4B0082', //4B0082
					paddingTop: '0px',
					paddingBottom: '35px',
				}}
			></Row>
			<Row
				className='justify-content-md-center'
				style={{
					paddingTop: '0px',
					paddingBottom: '35px',
				}}>
				<h5 style={{ "text-align": "center" }} >{props.title}</h5>
				<h5 style={{ "text-align": "center" }} >{props.description}</h5>

			</Row>


			{
				props.questions && props.questions
					.map((question) => (

						< Row
							className='justify-content-md-center'
							key={question.questionId}
							style={{
								paddingTop: '0px',
								paddingBottom: '10px',
								marginTop: '20px',

							}}
						>
							<Col
								sm={9}
								style={{
									//marginRight: '5px',
									padding: '10px 25px',
									borderRadius: '8px',
									backgroundColor: '#F0F0F0', //7866B2
									border: requiredd == question.questionId ? 'solid red 2px' : 'solid black 1px',
									//#e6e6e6
								}}
							>
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
								{renderQuestionComponent(question)}
								{/* <RequiredButton
										rounded={true}
										questionId={answer.questions.questionId}
										required={answer.questions.required}
										requiredChangeHandler={handleRequiredChange}
									/> */}
							</Col>
						</Row>

					))
			}
			<Row


				style={{
					paddingTop: '0px',
					paddingBottom: '10px',
					marginTop: '20px',
					marginLeft: '125px'
				}}>
				<Col md={4} style={{ margin: '10px' }}>
					<input type='checkbox'
						onChange={checkHandler}
						style={{ marginRight: '6px', width: '15px', height: '15px' }}
					/>
					<label>Do you want a copy of your response?</label>
				</Col>
			</Row>
			<SubmitFormButton
				answerList={responseState.answerss}
				submitFormHandler={handleSubmitForm}
				setRequiredd={setRequiredd}
			/>
		</Container >

	);


}

export default ResponseFormContainer;