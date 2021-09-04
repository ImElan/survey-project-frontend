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
import Preview from '../components/CreateFormComponents/Preview';
import QuestionImageComponent from '../components/CreateFormComponents/QuestionImageComponent/QuestionImageComponent';
import { useHistory } from 'react-router';
import axios from 'axios';

function CreateFormContainer(props) {
	const {
		isEditing,
		formId,
		initialTitle,
		initialDescription,
		initialEditable,
		initialQuestionsFromEdit,
	} = props;
	// Form State
	const [formState, dispatch] = useReducer(createFormReducer, {
		title: '',
		description: '',
		isEditable: false,
		questions: [],
	});
	console.log(formState);
	const idToken = localStorage.getItem('accessToken');
	console.log(idToken);
	// State holding maximum question allowed (will get from backend later)
	const [minQuestionAllowed, setMinQuestionAllowed] = useState(1);
	const [maxQuestionAllowed, setMaxQuestionAllowed] = useState(10);
	const history = useHistory();
	const [currentPage, setCurrentPage] = useState(1);
	const [questionsPerPage, setquestionsPerPage] = useState(5);

	const [triedToSave, setTriedToSave] = useState(false);

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
		const initialQuestions = initialQuestionsFromEdit ? initialQuestionsFromEdit : [];
		if (!isEditing) {
			for (let i = 0; i < minQuestionAllowed; i++) {
				initialQuestions.push({
					questionId: uuidv4(),
					question: '',
					options: {
						optionsArray: [
							{ optionId: uuidv4(), option: 'Option 1' },
							{ optionId: uuidv4(), option: 'Option 2' },
						],
						isOptionsValid: true,
					},
					questionType: 'SINGLE',
					required: false,
					isValid: false,
					numStars: null,
					threshold: null,
					isHalfStarAllowed: null,
					image: null,
				});
			}
		}
		dispatch({
			type: 'SET_INITIAL_QUESTIONS',
			initialQuestions,
			initialTitle,
			initialDescription,
			initialEditable,
		});
	}, [
		minQuestionAllowed,
		initialQuestionsFromEdit,
		isEditing,
		initialTitle,
		initialDescription,
		initialEditable,
	]);

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
	const handleThresholdChange = (questionId, value) => {
		console.log(questionId, value);
		dispatch({ type: 'STAR_THRESHOLD_CHANGE', questionId, value });
	};

	// Method to handle question option change in single and multiple choice quesitons.
	const handleQuestionOptionChange = (
		questionId,
		optionId,
		newOptionText,
		isOptionsValid
	) => {
		dispatch({
			type: 'QUESTION_OPTION_CHANGE',
			questionId,
			optionId,
			newOptionText,
			isOptionsValid,
		});
	};

	// Method to handle adding a option to single and multiple choice question.
	const handleQuestionOptionAdd = (questionId, newOption) => {
		dispatch({ type: 'QUESTION_OPTION_ADD', questionId, newOption });
	};

	// Method to handle removing a option from single and multiple choice question.
	const handleQuestionOptionRemove = (questionId, optionId, isOptionsValid) => {
		dispatch({ type: 'QUESTION_OPTION_REMOVE', questionId, optionId, isOptionsValid });
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

	const handleIsEditable = () => {
		dispatch({ type: 'EDITABLE_CHANGE' });
	};

	// Method to handle removing a new question.
	const handleRemoveQuestion = (questionId) => {
		dispatch({ type: 'QUESTION_REMOVE', questionId });
	};

	// Method to add a image to a question
	const handleAddImageToQuestion = (questionId, image) => {
		dispatch({ type: 'QUESTION_IMAGE_ADD', questionId, image });
	};

	const imageHandler = (e, questionId) => {
		console.log('event', e);
		console.log('question id', questionId);
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				handleAddImageToQuestion(questionId, reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const handleTriedToSave = () => {
		setTriedToSave(true);
	};

	// Method to save the form by sending a post request to backend
	const handleSaveForm = async () => {
		// send Post request to backend with the input state as body
		const questionsToSendToBackend = formState.questions.map((question) => {
			let optionsArr = null;
			if (question.questionType === 'SINGLE' || question.questionType === 'MULTIPLE') {
				optionsArr = question.options.optionsArray.map((option) => option.option);
			}

			return {
				questionId: question.questionId,
				questionType: question.questionType,
				question: question.question,
				options: optionsArr,
				noOfStars: question.numStars,
				isHalfStarAllowed: question.isHalfStarAllowed,
				isRequired: question.required,
				imageData: question.image,
			};
		});

		const requestBody = {
			formTitle: formState.title,
			formDescription: formState.description,
			surveyQuestions: questionsToSendToBackend,
			isFormEditable: formState.isEditable,
		};

		console.log(requestBody);

		try {
			let query;
			let response;
			if (isEditing) {
				query = 'http://localhost:8080/api/updateform';
				response = await axios.put(
					query,
					{ id: formId, ...requestBody },
					{
						headers: {
							Authorization: `Bearer ${idToken}`,
							'Content-type': 'application/json; charset=UTF-8',
						},
					}
				);
			} else {
				query = 'http://localhost:8080/api/addform';

				response = await axios.post(query, requestBody, {
					headers: {
						Authorization: `Bearer ${idToken}`,
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			}
			history.push('/loginSuccess');
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
						starThresholdHandler={handleThresholdChange}
						threshold={question.threshold}
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
		tooltipMessage = 'Maximum number of questions per form is reached';
	} else {
		tooltipMessage = 'Click the button to choose question type';
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
					backgroundColor: '#33006F', //#4B0082
					paddingBottom: '25px',
				}}
			>
				<Col sm={6}>
					<FormHeader
						title={formState.title}
						description={formState.description}
						isEditable={formState.isEditable}
						titleChangeHandler={handleTitleChange}
						descriptionChangeHandler={handleDescriptionChange}
						handleIsEditable={handleIsEditable}
					/>
				</Col>
			</Row>

			<Row className='justify-content-md-center'>
				<div
					style={{
						backgroundColor: '#D8D8D8',
						width: '100%',
						border: 'solid #D8D8D8 1px',
					}}
				>
					<Row
						sm='auto'
						className='justify-content-end'
						style={{
							margin: '20px',
						}}
					>
						<PopDown
							title='Questions Per Page'
							totalQuestions={formState.questions.length}
							questionsPerPageHandler={questionsPerPageHandler}
						/>
						{/* ADD BUTTON COMPONENT GOES HERE */}
						<AddQuestionButton
							tooltipMessage={tooltipMessage}
							disabled={formState.questions.length >= maxQuestionAllowed}
							addQuestionHandler={handleAddQuestion}
							questionTypes={['STAR', 'DESCRIPTIVE', 'SINGLE', 'MULTIPLE']}
						/>
					</Row>

					{/* page 1 */}
					{formState.questions
						.slice(
							paginationStartIndex,
							(currentPage - 1) * questionsPerPage + questionsPerPage
						)
						.map((question, idx) => (
							<Row
								className='justify-content-md-center'
								key={question.questionId}
								style={{
									paddingTop: '0px',
									paddingBottom: '10px',
									marginBottom: '5px',
								}}
							>
								<Col
									sm={7}
									style={{
										padding: '10px 25px',
										borderRadius: '8px',
										boxShadow: '3px 3px 10px darkgray',
										backgroundColor:
											!question.isValid && triedToSave ? '#F8D7DA' : '#F0F0F0',
										border:
											!question.isValid && triedToSave ? '2px solid #721c24' : 'none',
									}}
								>
									<Row
										sm='auto'
										//className='justify-content-end'
										style={{
											marginTop: '15px',
										}}
									>
										<Col md='7'>
											<p style={{ fontSize: '25px', fontWeight: 'bold' }}>
												Question {(currentPage - 1) * questionsPerPage + idx + 1}
											</p>
										</Col>
										<Col>
											<input
												class='image-input'
												type='file'
												accept='image/*'
												name='image-upload'
												id={`input-${question.questionId}`}
												onChange={(e) => {
													imageHandler(e, question.questionId);
												}}
											/>
											<div className='label'>
												<label
													className='image-upload'
													htmlFor={`input-${question.questionId}`}
												>
													Add Image
												</label>
											</div>
										</Col>
										<Col style={{ display: 'flex', flexDirection: 'row' }}>
											<Dropdown
												questionId={question.questionId}
												questionType={question.questionType}
												questionTypeChangeHandler={handleQuestionTypeChange}
											/>
										</Col>
										<Col style={{ marginTop: '4px', marginLeft: '-4px' }}>
											<DeleteButton
												questionId={question.questionId}
												disabled={formState.questions.length <= minQuestionAllowed}
												minQuestions={minQuestionAllowed}
												deleteQuestionHandler={handleRemoveQuestion}
											/>
										</Col>
									</Row>
									<Row>
										<QuestionImageComponent
											// key={question.questionId}
											// questionId={question.questionId}
											profileImg={question.image}
											// addImageHandler={handleAddImageToQuestion}
										/>
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
							//paddingTop: '20px',
							paddingBottom: '30px',
						}}
					>
						<SaveFormButton
							isEditing={isEditing}
							formTitle={formState.title}
							formDescription={formState.description}
							questionList={formState.questions}
							saveFormHandler={handleSaveForm}
							triedToSaveHandler={handleTriedToSave}
						/>
					</Row>
					<Row
						className='text-center'
						style={{
							paddingTop: '20px',
							paddingBottom: '30px',
						}}
					>
						<Preview
							formState={formState}
							formTitle={formState.title}
							formDescription={formState.description}
							questionList={formState.questions}
							totalQuestions={formState.questions.length}
							questionsPerPage={questionsPerPage}
							pageChangeRequestHandler={pagechangerequesthandler}
							currentPage={currentPage}
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
