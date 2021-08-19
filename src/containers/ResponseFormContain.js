import { useEffect, useReducer, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {responseFormReducer} from './reducers/responseFormReducer';
import isDeepEqual from 'fast-deep-equal/react'
// import { useCallback } from 'react';
import {questionss} from './questionss';
import DescComponentt from '../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../components/ResponseSurveyComponents/CheckBoxComponentt';



function ResponseFormContainer(props){

	// Form State
	const [responseState, dispatch] = useReducer(responseFormReducer, {
		userid: '',
		answerss: questionss,
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
			dispatch({ type: 'OPTION_SINGLE_SELECT', questionId, optionId});
			console.log(responseState.answerss);
		}

		// Method to handle question text change in answer of descriptive component
		const handleAnswerParaChange = (questionId, newParaText, isvalid) => {
			dispatch({ type: 'ANSWER_TEXT_CHANGE', questionId, newParaText, isvalid });
			console.log(responseState.answerss);
		};

		const handleaddremoveoption = (questionId, optionId) => {
			dispatch({type: 'OPTION_ADD_REMOVE',questionId, optionId});
			console.log(responseState.answerss);
		}

		// const handleremoveoption = (questionId, optionId) => {
		// 	dispatch({type: 'OPTION_REMOVE',questionId, optionId});
		// 	console.log(responseState.answerss);
		// }

    // Method to render different question component in the UI based on question type.
	const renderQuestionComponent = (answer) => {
		switch (answer.questions.questionType) {
			// case 'STAR':
			// 	return (
			// 		<StarComponent
			// 			question={answer.questions.question}
			// 			questionId={answer.question.questionId}
			// 			numStars={answer.questions.numStars}
			// 			isHalfStarAllowed={answer.questions.isHalfStarAllowed}
			// 			answerStarSelectHandler={handleAnswerStarChange}
			// 		/>
			// 	);
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
						answeroptionadd = {handleaddremoveoption}

					/>
				);
			case 'SINGLE':
				return (
					<RadioComponentt
						question={answer.questions.question}
						questionId={answer.questions.questionId}
						options={answer.questions.options}
						answerOptionChange = {handleoptionchange}
					/>
				);
			default:
				break;
		}
	};


	return(
		<Container fluid>
			<Row
				className='justify-content-md-center'
				style={{
					backgroundColor: '#4B0082', //4B0082
					paddingTop: '0px',
					paddingBottom: '35px',
				}}
			></Row>

						{responseState.answerss
						// .slice(
						// 	paginationStartIndex,
						// 	(currentPage - 1) * questionsPerPage + questionsPerPage
						// )
						.map((answer) => (
							<Row
								className='justify-content-md-center'
								key={answer.questions.questionId}
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