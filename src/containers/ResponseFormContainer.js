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
import {questions} from './questionss';

function ResponseFormContainer(props) {
	
	// const formstate = JSON.parse(window.localStorage.getItem('formstate'));
	// console.log(props)
	// var questions = props.questions;
	console.log(questions);
	var anotherquestions = questions
	for(var i=0;i<questions.length;i++)
	{
		anotherquestions[i].questions = questions[i];
		anotherquestions[i].answerarr = [];
        anotherquestions[i].answer = '';
        anotherquestions[i].isvalid = false;
	}
	console.log(anotherquestions);
	
	const [responseState, dispatch] = useReducer(responseFormReducer, {
		userid: '',
		answerss: anotherquestions,
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
	const renderQuestionComponent = (answer) => {
		switch (answer.questions.questionType) {
			case 'STAR':
				return (
					<StarComponent
						question={answer.questions.question}
						questionId={answer.questions.questionId}
						numStars={answer.questions.numStars}
						isHalfStarAllowed={answer.questions.isHalfStarAllowed}
						answerStarSelectHandler={handleAnswerStarChange}
					/>
				);
			case 'DESCRIPTIVE':
				return (
					<DescComponentt
						question={answer.questions.question}
						questionId={answer.questions.questionId}
						answerParagraphHandler={handleAnswerParaChange}
					/>
				);
			case 'MULTIPLE':
				return (
					<CheckBoxComponentt
						question={answer.questions.question}
						questionId={answer.questions.questionId}
						options={answer.questions.options}
						answeroptionadd={handleaddremoveoption}

					/>
				);
			case 'SINGLE':
				return (
					<RadioComponentt
						question={answer.questions.question}
						questionId={answer.questions.questionId}
						options={answer.questions.options}
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
				{/* <h5>{props.title}</h5>
				<h5>{props.description}</h5> */}

			</Row>

			{responseState.answerss.map((answer) => (
					<Row
						className='justify-content-md-center'
						key={answer.questionId}
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
							

							{/* BASED ON QUESTION TYPE RENDER APPROPRIATE COMPONENT AND PASS IN THE PROPS */}
							{renderQuestionComponent(answer)}
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