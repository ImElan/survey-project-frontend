import { useEffect, useReducer, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import { createFormReducer } from './reducers/createFormReducer';

import StarComponent from '../components/CreateFormComponents/StarComponent';
import DescriptionComponent from '../components/CreateFormComponents/DescComponent';
import Dropdown from '../components/CreateFormComponents/DropdownMenu/DropdownMenu';
import DeleteButton from '../components/CreateFormComponents/DeleteQuestionButton/DeleteQuestionButton';
import AddQuestionButton from '../components/CreateFormComponents/AddQuestionComponent';
import FormHeader from '../components/CreateFormComponents/NameForm';
import SaveFormButton from '../components/CreateFormComponents/SaveFormButton';
import CheckboxComponent from '../components/CreateFormComponents/CheckboxComponent';
import RadioButtonComponent from '../components/CreateFormComponents/RadioComponent';
import RequiredButton from '../components/CreateFormComponents/RequiredCom/Switch';
import PopDown from '../components/CreateFormComponents/PopDown';
import Paging from '../components/CreateFormComponents/Paging';

import axios from 'axios';

function CreateFormContainer(props) {
	// Form State
	const [formState, dispatch] = useReducer(createFormReducer, {
		title: '',
		description: '',
		questions: [],
	});

	// State holding maximum question allowed (will get from backend later)
	const [minQuestionAllowed, setMinQuestionAllowed] = useState(1);
	const [maxQuestionAllowed, setMaxQuestionAllowed] = useState(10);

	const [currentPage, setCurrentPage] = useState(1);
	const [questionsPerPage, setquestionsPerPage] = useState(5);

	const pagechangerequesthandler = (number) => {
		setCurrentPage(number);
	};
	const questionsPerPageHandler = (option) => {
		setquestionsPerPage(option);
	};

	useEffect(() => {
		setCurrentPage(Math.ceil(formState.questions.length / questionsPerPage));
	}, [formState.questions.length, questionsPerPage]);

	// API REQUEST TO GET CONFIG VALUES
	useEffect(() => {
		// get min questions and max question from backend;
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/api/config');
				const config = response.data[0];
				setMinQuestionAllowed(config.minNUmberOfQuestionsAllowed);
				setMaxQuestionAllowed(config.maxNumberOfQuestionsAllowed);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	// RENDER THE INITIAL NUMBER OF QUESTIONS ON THE SCREEN BASED ON MIN QUESTIONS ALLOWED VALUE
	useEffect(() => {
		const initialQuestions = [];
		for (let i = 0; i < minQuestionAllowed; i++) {
			initialQuestions.push({
				questionId: uuidv4(),
				question: '',
				options: [
					{ optionId: uuidv4(), option: 'Option 1' },
					{ optionId: uuidv4(), option: 'Option 2' },
				],
				questionType: 'SINGLE',
				required: false,
				isValid: false,
				numStars: null,
				isHalfStarAllowed: null,
			});
		}
		dispatch({ type: 'SET_INITIAL_QUESTIONS', initialQuestions });
	}, [minQuestionAllowed]);

	// Method to handle title change in form header
	const handleTitleChange = (newTitle) => {
		dispatch({ type: 'TITLE_CHANGE', newTitle });
	};

	// Method to handle description change in form header.
	const handleDescriptionChange = (newDescription) => {
		dispatch({ type: 'DESCRIPTION_CHANGE', newDescription });
	};

	// Method to handle question text change in all question components
	const handleQuestionTextChange = (questionId, newQuestionText, isValid) => {
		dispatch({ type: 'QUESTION_TEXT_CHANGE', questionId, newQuestionText, isValid });
	};

	const handleStarNumberChange = (questionId, value) => {
		console.log(questionId, value);
		dispatch({ type: 'STAR_NUMBER_CHANGE', questionId, value });
	};

	const handleStarTypeChange = (questionId) => {
		dispatch({ type: 'STAR_TYPE_CHANGE', questionId });
	};

	// Method to handle question option change in single and multiple choice quesitons.
	const handleQuestionOptionChange = (questionId, optionId, newOptionText) => {
		dispatch({ type: 'QUESTION_OPTION_CHANGE', questionId, optionId, newOptionText });
	};

	// Method to handle adding a option to single and multiple choice question.
	const handleQuestionOptionAdd = (questionId, newOption) => {
		dispatch({ type: 'QUESTION_OPTION_ADD', questionId, newOption });
	};

	// Method to handle removing a option from single and multiple choice question.
	const handleQuestionOptionRemove = (questionId, optionId) => {
		dispatch({ type: 'QUESTION_OPTION_REMOVE', questionId, optionId });
	};

	// Method to handle changing a required field of a question.
	const handleRequiredChange = (questionId) => {
		dispatch({ type: 'QUESTION_REQUIRED_CHANGE', questionId });
	};

	// Method to handle changing question type using a dropdown.
	const handleQuestionTypeChange = (questionId, newQuestionType) => {
		dispatch({ type: 'QUESTION_TYPE_CHANGE', questionId, newQuestionType });
	};

	// Method to handle adding a new quesiton.
	const handleAddQuestion = (questionType) => {
		dispatch({
			type: 'QUESTION_ADD',
			questionType,
		});
	};

	// Method to handle removing a new question.
	const handleRemoveQuestion = (questionId) => {
		dispatch({ type: 'QUESTION_REMOVE', questionId });
	};

	// Method to save the form by sending a post request to backend
	const handleSaveForm = async () => {
		// send Post request to backend with the input state as body
		const questionsToSendToBackend = formState.questions.map((question) => {
			const optionsArr = question.options.map((option) => option.option);

			return {
				questionType: question.questionType,
				question: question.question,
				options: optionsArr,
				noOfStars: question.numStars,
				isHalfStarAllowed: question.isHalfStarAllowed,
				isRequired: question.required,
			};
		});

		const requestBody = {
			formTitle: formState.title,
			formDescription: formState.description,
			surveyQuestions: questionsToSendToBackend,
		};

		console.log(requestBody);

		try {
			const response = await axios.post('http://localhost:8080/api/addform', requestBody);
			console.log(response.data);
		} catch (error) {
			console.log(error);
			console.log(error.response);
		}
	};

	// Method to render different question component in the UI based on question type.
	const renderQuestionComponent = (question) => {
		switch (question.questionType) {
			case 'STAR':
				return (
					<StarComponent
						question={question.question}
						questionId={question.questionId}
						questionTextChangeHandler={handleQuestionTextChange}
						numStars={question.numStars}
						isHalfStarAllowed={question.isHalfStarAllowed}
						starTypeChangeHandler={handleStarTypeChange}
						starNumChangeHandler={handleStarNumberChange}
					/>
				);
			case 'DESCRIPTIVE':
				return (
					<DescriptionComponent
						question={question.question}
						questionId={question.questionId}
						questionTextChangeHandler={handleQuestionTextChange}
					/>
				);
			case 'MULTIPLE':
				return (
					<CheckboxComponent
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						questionTextChangeHandler={handleQuestionTextChange}
						questionOptionChangeHandler={handleQuestionOptionChange}
						questionOptionAddHandler={handleQuestionOptionAdd}
						questionOptionRemoveHandler={handleQuestionOptionRemove}
					/>
				);
			case 'SINGLE':
				return (
					<RadioButtonComponent
						question={question.question}
						questionId={question.questionId}
						options={question.options}
						questionTextChangeHandler={handleQuestionTextChange}
						questionOptionChangeHandler={handleQuestionOptionChange}
						questionOptionAddHandler={handleQuestionOptionAdd}
						questionOptionRemoveHandler={handleQuestionOptionRemove}
					/>
				);
			default:
				break;
		}
	};

	// setting tooltip message based on maxQuestionAllowed and number of questions added.
	let tooltipMessage;
	if (formState.questions.length >= maxQuestionAllowed) {
		tooltipMessage = 'Maximum number of questions per form is reached.';
	} else {
		tooltipMessage = 'Click the button to choose question type.';
	}

	let paginationStartIndex;
	paginationStartIndex = (currentPage - 1) * questionsPerPage;
	if (paginationStartIndex > formState.questions.length) {
		paginationStartIndex = 0;
	}

	return (
		<Container fluid>
			<Row
				className='justify-content-md-center'
				style={{
					backgroundColor: '#4B0082', //4B0082
					paddingTop: '0px',
					paddingBottom: '35px',
				}}
			>
				<Col sm={6}>
					<FormHeader
						title={formState.title}
						description={formState.description}
						titleChangeHandler={handleTitleChange}
						descriptionChangeHandler={handleDescriptionChange}
					/>
				</Col>
			</Row>

			<Row className='justify-content-md-center'>
				<div
					style={{
						backgroundColor: '#D8D8D8',
						width: '75%',
						border: 'solid lightgray 2px',
						borderTop: '0px',
						borderRadius: '8px',
					}}
				>
					<Row
						sm='auto'
						className='justify-content-end'
						style={{
							padding: '12px',
						}}
					>
						<PopDown
							totalQuestions={formState.questions.length}
							questionsPerPageHandler={questionsPerPageHandler}
							title = "Questions Per Page"
						/>
						{/* ADD BUTTON COMPONENT GOES HERE */}
						<AddQuestionButton
							tooltipMessage={tooltipMessage}
							disabled={formState.questions.length >= maxQuestionAllowed}
							addQuestionHandler={handleAddQuestion}
							questionTypes={['STAR', 'DESCRIPTIVE', 'SINGLE', 'MULTIPLE']}
						/>
					</Row>

					{/*<Row className = "justify-content-md-center" >
			<div style={{ 
				    backgroundColor: '#e6e6e6',
				    width:'85%',
					border: 'solid lightgray 3px',
					borderRadius: '8px'
				 }}>*/}
					{/* page 1 */}
					{formState.questions
						.slice(
							paginationStartIndex,
							(currentPage - 1) * questionsPerPage + questionsPerPage
						)
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
									<Row
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
									</Row>

									{/* BASED ON QUESTION TYPE RENDER APPROPRIATE COMPONENT AND PASS IN THE PROPS */}
									{renderQuestionComponent(question)}
									<RequiredButton
										rounded={true}
										questionId={question.questionId}
										required={question.required}
										requiredChangeHandler={handleRequiredChange}
									/>
								</Col>
							</Row>
						))}
					<Row
						className='text-center'
						style={{
							paddingTop: '20px',
							paddingBottom: '30px',
						}}
					>
						<SaveFormButton
							formTitle={formState.title}
							questionList={formState.questions}
							saveFormHandler={handleSaveForm}
						/>
					</Row>
				</div>
			</Row>
			<Paging
				totalQuestions={formState.questions.length}
				questionsPerPage={questionsPerPage}
				pageChangeRequestHandler={pagechangerequesthandler}
				currentPage={currentPage}
			/>
		</Container>
	);
}

export default CreateFormContainer;
