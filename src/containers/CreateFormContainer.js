import { useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const createFormReducer = (state, action) => {
	switch (action.type) {
		case 'TITLE_CHANGE':
			return {
				...state,
				title: action.newTitle,
			};

		case 'DESCRIPTION_CHANGE':
			return {
				...state,
				description: action.newDescription,
			};

		case 'QUESTION_TEXT_CHANGE':
			const newQuestionsArray = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				return {
					...question,
					question: action.newQuestionText,
				};
			});
			return {
				...state,
				questions: newQuestionsArray,
			};

		case 'QUESTION_OPTION_CHANGE':
			const newArrayOfQuestions = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				const newOptionsArray = state.questions.options.map((option) => {
					if (option.optionId !== action.optionId) {
						return option;
					}
					return {
						...option,
						option: action.newOptionText,
					};
				});
				return newOptionsArray;
			});
			return {
				...state,
				newArrayOfQuestions,
			};

		case 'QUESTION_REQUIRED_CHANGE':
			const newQuestions = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				return {
					...question,
					required: !question.required,
				};
			});
			return {
				...state,
				questions: newQuestions,
			};

		case 'QUESTION_TYPE_CHANGE':
			const questions = state.question.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				return {
					...question,
					questionType: action.newQuestionType,
				};
			});
			return {
				...state,
				questions,
			};

		default:
			return state;
	}
};

function CreateFormContainer(props) {
	const [formState, dispatch] = useReducer(createFormReducer, {
		title: 'Form Title',
		description: 'Form Description',
		questions: [
			{
				questionId: 1,
				question: 'Question 1',
				options: ['Option 1', 'Option 2', 'Option 3'],
				questionType: 'SINGLE',
				required: true,
			},
			{
				questionId: 2,
				question: 'Question 2',
				options: ['Option 1', 'Option 2', 'Option 3'],
				questionType: 'MULTIPLE',
				required: true,
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

	const handleRequiredChange = (questionId) => {
		dispatch({ type: 'QUESTION_REQUIRED_CHANGE', questionId });
	};

	const handleQuestionTypeChange = (questionId, newQuestionType) => {
		dispatch({ type: 'QUESTION_TYPE_CHANGE', questionId, newQuestionType });
	};

	const handleSaveForm = () => {
		// send Post request to backend with the input state as body
		console.log(formState);
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
				Form Header Component
			</Row>
			{formState.questions.map((question) => (
				<Row
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
						{question.question}
					</Col>
					<Col
						sm={3}
						style={{
							backgroundColor: 'limegreen',
						}}
					>
						{question.questionType}
					</Col>
				</Row>
			))}
			<Row
				className='justify-content-end align-items-center'
				style={{
					marginTop: '10px',
					height: '50px',
					backgroundColor: 'cornflowerblue',
				}}
			>
				Save Form Button
			</Row>
		</Container>
	);
}

export default CreateFormContainer;
