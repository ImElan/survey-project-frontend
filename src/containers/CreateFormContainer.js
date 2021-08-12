import { useReducer, useState } from 'react';
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
				questionType: 'DESCRIPTIVE',
				required: false,
			},
		],
	});

	const [maxQuestionAllowed, setMaxQuestionAllowed] = useState(10);

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
		dispatch({
			type: 'QUESTION_ADD',
			questionType: 'SINGLE',
		});
	};

	const handleRemoveQuestion = (questionId) => {
		dispatch({ type: 'QUESTION_REMOVE', questionId });
	};

	const handleSaveForm = () => {
		// send Post request to backend with the input state as body
		console.log(formState);
	};

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
			default:
				break;
		}
	};

	let tooltipMessage;
	if (formState.questions.length >= maxQuestionAllowed) {
		tooltipMessage = 'Maximum number of questions per form is reached.';
	} else {
		tooltipMessage = 'Add New Question';
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
