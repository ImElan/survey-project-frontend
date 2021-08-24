import { useEffect, useReducer, useRef, useState } from 'react';
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { responseFormReducer } from './reducers/responseFormReducer';
import isDeepEqual from 'fast-deep-equal/react'
// import { useCallback } from 'react';
import DescComponentt from '../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../components/ResponseSurveyComponents/CheckBoxComponentt';
import StarComponent from '../components/CreateFormComponents/StarComponent';

function ResponseFormContainer(props) {
	
	// const formstate = JSON.parse(window.localStorage.getItem('formstate'));
	console.log(props)
	var questions = props.questions;
	// console.log(questions);
	
	const [responseState, dispatch] = useReducer(responseFormReducer, {
		userid: '',
		questions: questions,
	});





	// RENDER THE INITIAL NUMBER OF QUESTIONS ON THE SCREEN BASED ON MIN QUESTIONS ALLOWED VALUE

	// const questionss = useCallback(() => {
	// 	setOpen(true)
	//   }, [])

	// const questionRef = useRef(questionss);

	// if (!isDeepEqual(questionRef.current, questionss)) {
	// 	questionRef.current = questionss
	//   }



	// useEffect(() => {
	// 	const initialAnswers = [];

	// 	for (let i = 0; i < questionss.length; i++) {
	// 		initialAnswers.push({
	// 			questions : questionss[i],
	// 			answerr : '',
	// 			isvalid : false,
	// 		});
	// 	}
	// 	dispatch({ type: 'SET_INITIAL_ANSWERS', initialAnswers });
	// },[questionRef.current]);


	// const handleInitialanswers = () => {
	// 	dispatch({ type: 'SET_INITIAL_ANSWERS'});
	// };

	// handleInitialanswers(questionss);

	// handleInitialanswers()


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

	// Method to render different question component in the UI based on question type.
	const renderQuestionComponent = (question) => {
		switch (question.questionType) {
			case 'STAR':
				return (
					<StarComponent
						question={question.question}
						questionId={question.questionId}
						numStars={question.numStars}
						isHalfStarAllowed={question.isHalfStarAllowed}
						answerStarSelectHandler={handleAnswerStarChange}
					/>
				);
			case 'DESCRIPTIVE':
				return (
					<DescComponentt
						question={question.question}
						questionId={question.questionId}
						answerParagraphHandler={handleAnswerParaChange}
					/>
				);
			case 'MULTIPLE':
				return (
					<CheckBoxComponentt
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						answeroptionadd={handleaddremoveoption}

					/>
				);
			case 'SINGLE':
				return (
					<RadioComponentt
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						answerOptionChange={handleoptionchange}
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
				// {
				// 	<h5></h5>
				// }
			>
				<h5>{props.title}</h5>
				<h5>{props.description}</h5>

			</Row>

			{props.questions && props.questions
				// .slice(
				// 	paginationStartIndex,
				// 	(currentPage - 1) * questionsPerPage + questionsPerPage
				// )
				.map((question) => (
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
								border: 'solid black 1px',
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
				))}

		</Container>

	);


}

export default ResponseFormContainer;