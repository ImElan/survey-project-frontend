import { useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import { createFormReducer } from './reducers/createFormReducer';

import StarComponent from '../components/CreateFormComponents/StarComponent';

function CreateFormContainer(props) {
	const [formState, dispatch] = useReducer(createFormReducer, {
		title: 'Form Title',
		description: 'Form Description',
		questions: [
			{
				questionId: uuidv4(),
				question: 'Question',
				options: ['Option 1'],
				questionType: 'STAR',
				required: false,
			},
			{
				questionId: uuidv4(),
				question: 'Question',
				options: ['Option 1'],
				questionType: 'MULTIPLE',
				required: false,
			},
		],
	});

	const { title, description, questions } = formState;

	const handleTitleChange = (newTitle) => {
		dispatch({ type: 'TITLE_CHANGE', newTitle });
	};

	const handleDescriptionChange = (newDescription) => {
		dispatch({ type: 'DESCRIPTION_CHANGE', newDescription });
	};

	const handleQuestionTextChange = (questionId, newQuestionText) => {
		dispatch({ type: 'QUESTION_TEXT_CHANGE', questionId, newQuestionText });
	};

	const handleQuestionOptionChange = (questionId, optionId, newOptionText) => {
		dispatch({ type: 'QUESTION_OPTION_CHANGE', questionId, optionId, newOptionText });
	};

	const handleQuestionOptionAdd = (questionId, newOption) => {
		dispatch({ type: 'QUESTION_OPTION_ADD', questionId, newOption });
	};

	const handleQuestionOptionRemove = (questionId, optionId) => {
		dispatch({ type: 'QUESTION_OPTION_REMOVE', questionId, optionId });
	};

	const handleRequiredChange = (questionId) => {
		dispatch({ type: 'QUESTION_REQUIRED_CHANGE', questionId });
	};

	const handleQuestionTypeChange = (questionId, newQuestionType) => {
		dispatch({ type: 'QUESTION_TYPE_CHANGE', questionId, newQuestionType });
	};

	const handleAddQuestion = () => {
		dispatch({ type: 'QUESTION_ADD', questionType: 'SINGLE' });
	};

	const handleRemoveQuestion = (questionId) => {
		dispatch({ type: 'QUESTION_REMOVE', questionId });
	};

	const handleSaveForm = () => {
		// send Post request to backend with the input state as body
		console.log(formState);
	};

	const renderQuestionComponent = (question) => {
		console.log(question);
		switch (question.questionType) {
			case 'STAR':
				return (
					<StarComponent
						question={question.question}
						questionId={question.questionId}
						questionTextChangeHandler={handleQuestionTextChange}
					/>
				);
			default:
				break;
		}
	};

	return (
		<Container fluid='md'>
			<Row
				style={{
					marginTop: '20px',
					height: '100px',
					padding: '30px 0',
					backgroundColor: 'salmon',
				}}
			>
				{/* FORM HEADER COMPONENT */}
				Form Header Component
			</Row>
			<Row
				sm='auto'
				className='justify-content-end'
				style={{
					marginTop: '20px',
				}}
			>
				{/* ADD BUTTON COMPONENT GOES HERE */}
				<button onClick={handleAddQuestion}>Add New Quesiton</button>
			</Row>
			{formState.questions.map((question) => (
				<Row
					key={question.questionId}
					style={{
						marginTop: '20px',
						height: '150px',
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
					</Col>
					<Col
						sm={3}
						style={{
							backgroundColor: 'limegreen',
						}}
					>
						{/* DROP DOWN COMPONENT*/}
						{question.questionType}
					</Col>
				</Row>
			))}
			<Row
				className='justify-content-start align-items-center'
				style={{
					marginTop: '10px',
					height: '50px',
					backgroundColor: 'cornflowerblue',
				}}
			>
				{/* SAVE FORM BUTTON */}
				Save Form Button
			</Row>
		</Container>
	);
}

export default CreateFormContainer;
