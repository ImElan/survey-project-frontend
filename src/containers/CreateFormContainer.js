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

function CreateFormContainer(props) {
	// Form State
	const [formState, dispatch] = useReducer(createFormReducer, {
		title: 'Form Title',
		description: 'Form Description',
		questions: [],
	});

	// State holding maximum question allowed (will get from backend later)
	const [minQuestionAllowed, setMinQuestionAllowed] = useState(1);
	const [maxQuestionAllowed, setMaxQuestionAllowed] = useState(10);

	// API REQUEST TO GET CONFIG VALUES
	useEffect(() => {
		// get min questions and max question from backend;
		setMinQuestionAllowed(2);
		setMaxQuestionAllowed(10);
	}, []);

	// RENDER THE INITIAL NUMBER OF QUESTIONS ON THE SCREEN BASED ON MIN QUESTIONS ALLOWED VALUE
	useEffect(() => {
		const initialQuestions = [];
		for (let i = 0; i < minQuestionAllowed; i++) {
			initialQuestions.push({
				questionId: uuidv4(),
				question: 'Question',
				options: [
					{ optionId: uuidv4(), option: 'Option 1' },
					{ optionId: uuidv4(), option: 'Option 2' },
					{ optionId: uuidv4(), option: 'Option 3' },
				],
				questionType: 'DESCRIPTIVE',
				required: false,
				isValid: false,
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
	const handleSaveForm = () => {
		// send Post request to backend with the input state as body
		console.log(formState);
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

	return (
		<Container fluid='md'>
			<Row
				style={{
					marginTop: '20px',
					padding: '30px 0',
					backgroundColor: 'salmon',
				}}
			>
				<FormHeader
					title={formState.title}
					description={formState.description}
					titleChangeHandler={handleTitleChange}
					descriptionChangeHandler={handleDescriptionChange}
				/>
			</Row>
			<Row
				sm='auto'
				className='justify-content-end'
				style={{
					marginTop: '20px',
				}}
			>
				{/* ADD BUTTON COMPONENT GOES HERE */}
				<AddQuestionButton
					tooltipMessage={tooltipMessage}
					disabled={formState.questions.length >= maxQuestionAllowed}
					addQuestionHandler={handleAddQuestion}
					questionTypes={['STAR', 'DESCRIPTIVE', 'SINGLE', 'MULTIPLE']}
				/>
			</Row>
			<div style={{ marginTop: '30px' }}>
				{formState.questions.map((question) => (
					<Row
						key={question.questionId}
						style={{
							marginTop: '20px',
						}}
					>
						<Col
							sm={9}
							style={{
								backgroundColor: 'pink',
							}}
						>
							{/* BASED ON QUESTION TYPE RENDER APPROPRIATE COMPONENT AND PASS IN THE PROPS */}
							{renderQuestionComponent(question)}
							<RequiredButton
								rounded={true}
								questionId={question.questionId}
								required={question.required}
								requiredChangeHandler={handleRequiredChange}
							/>
						</Col>
						<Col
							sm={3}
							style={{
								backgroundColor: 'limegreen',
							}}
						>
							<Dropdown
								questionId={question.questionId}
								questionType={question.questionType}
								questionTypeChangeHandler={handleQuestionTypeChange}
							/>

							<DeleteButton
								questionId={question.questionId}
								disabled={formState.questions.length <= minQuestionAllowed}
								minQuestions={minQuestionAllowed}
								deleteQuestionHandler={handleRemoveQuestion}
							/>
						</Col>
					</Row>
				))}
			</div>
			<Row
				className='justify-content-start align-items-center'
				style={{
					marginTop: '10px',
					backgroundColor: 'cornflowerblue',
				}}
			>
				<SaveFormButton saveFormHandler={handleSaveForm} />
			</Row>
		</Container>
	);
}

export default CreateFormContainer;
