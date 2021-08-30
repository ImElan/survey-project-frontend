import { useEffect, useReducer, useRef, useState } from 'react';
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { responseFormReducer } from './reducers/responseFormReducer';
import isDeepEqual from 'fast-deep-equal/react'
// import { useCallback } from 'react';
import DescComponentt from '../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../components/ResponseSurveyComponents/CheckBoxComponentt';
import StarComponent from '../components/ResponseSurveyComponents/StarComponent';
import SubmitFormButton from '../components/ResponseSurveyComponents/SubmitFormButton';
import { questions } from './questionss';

import axios from 'axios';

function ResponseFormContainer(props) {

	// const formstate = JSON.parse(window.localStorage.getItem('formstate'));
	// console.log(props)
	// var questions = props.questions;
	// console.log(questions);
	var anotherquestions = questions
	for (var i = 0; i < questions.length; i++) {
		anotherquestions[i].questions = questions[i];
		anotherquestions[i].answerarr = [];
		anotherquestions[i].answer = '';
		anotherquestions[i].isvalid = false;

	}
	// console.log(anotherquestions);

	const [responseState, dispatch] = useReducer(responseFormReducer, {
		userid: '',
		answerss: anotherquestions,
	});

	const [requiredd, setRequiredd] = useState(-1);

	const handleoptionchange = (questionId, option) => {
		dispatch({ type: 'OPTION_SINGLE_SELECT', questionId, option });
		console.log(responseState.answerss);
	}

	// Method to handle question text change in answer of descriptive component
	const handleAnswerParaChange = (questionId, newParaText, isvalid) => {
		dispatch({ type: 'ANSWER_TEXT_CHANGE', questionId, newParaText, isvalid });
		console.log(responseState.answerss);
	};

	const handleaddremoveoption = (questionId, option) => {
		dispatch({ type: 'OPTION_ADD_REMOVE', questionId, option });
		console.log(responseState.answerss);
	}
	const handleAnswerStarChange = (questionId, value) => {
		// console.log(value + " " + questionId);
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
			const optionsArr = question.options.map((option) => option.option);

			return {
				questionType: question.questionType,
				question: question.question,
				options: optionsArr,
				noOfStars: question.numStars,
				isHalfStarAllowed: question.isHalfStarAllowed,
				isRequired: question.required,
				answer: question.answer
			};
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
		switch (question.questionType) {
			// case 'STAR':
			// 	return (
			// 		<StarComponent
			// 			question={question.question}
			// 			questionId={question.questionId}
			// 			numStars={question.numStars}
			// 			isHalfStarAllowed={question.isHalfStarAllowed}
			// 			answerStarSelectHandler={handleAnswerStarChange}
			// 		/>
			// 	);
			case 'STAR':
				return (
					<StarComponent
						question={question.question}
						questionId={question.questionId}
						numStars={question.numStars}
						isHalfStarAllowed={question.isHalfStarAllowed}
						answerStarSelectHandler={handleAnswerStarChange}
						answerFeedbackHandler={handleAnswerParaChange}
						threshold = {question.threshold}
						setRequiredd = {setRequiredd}
					/>
				);
			case 'DESCRIPTIVE':
				return (
					<DescComponentt
						question={question.question}
						questionId={question.questionId}
						answerParagraphHandler={handleAnswerParaChange}
						setRequiredd = {setRequiredd}
					/>
				);
			case 'MULTIPLE':
				return (
					<CheckBoxComponentt
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						answeroptionadd={handleaddremoveoption}
						setRequiredd = {setRequiredd}
					/>
				);
			case 'SINGLE':
				return (
					<RadioComponentt
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						answerOptionChange={handleoptionchange}
						setRequiredd = {setRequiredd}
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
				}}
			>
				<h5>{props.title}</h5>
				<h5>{props.description}</h5>

			</Row>

			{questions.map((question,index) => (
				<Row
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
							border: requiredd==index ? 'solid red 2px' : 'solid black 1px',
							//#e6e6e6
						}}
					>
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
			))}
						<SubmitFormButton
							answerList={responseState.answerss}
							submitFormHandler={handleSubmitForm}
							setRequiredd = {setRequiredd}
						/>
		</Container>

	);


}

export default ResponseFormContainer;