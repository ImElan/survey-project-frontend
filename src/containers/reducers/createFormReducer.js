import { v4 as uuidv4 } from 'uuid';

const createFormReducer = (state, action) => {
	switch (action.type) {
		// keeping all the fields from previous state and changing the title with new one.
		case 'TITLE_CHANGE':
			return {
				...state,
				title: action.newTitle,
			};

		// keeping all the fields from previous state and changing the title with new one.
		case 'DESCRIPTION_CHANGE':
			return {
				...state,
				description: action.newDescription,
			};

		// finding the question using question id and changing its text.
		case 'QUESTION_TEXT_CHANGE':
			const newQuestionsArray = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				return {
					...question,
					question: action.newQuestionText,
					isValid: action.isValid,
				};
			});
			return {
				...state,
				questions: newQuestionsArray,
			};

		// finding the question using question id and then finding the correct option from the question using option id changing its text.
		case 'QUESTION_OPTION_CHANGE':
			const newArrayOfQuestions = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				const newOptionsArray = question.options.map((option) => {
					if (option.optionId !== action.optionId) {
						return option;
					}
					return {
						...option,
						option: action.newOptionText,
					};
				});
				return {
					...question,
					options: newOptionsArray,
				};
			});
			return {
				...state,
				questions: newArrayOfQuestions,
			};

		// finding the quesiton using quesiton id and adding a new option to it.
		case 'QUESTION_OPTION_ADD':
			const newQuestionsArrayAfterAddingOption = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				const newOptionsArray = [
					...question.options,
					{ optionId: uuidv4(), option: action.newOption },
				];
				return {
					...question,
					options: newOptionsArray,
				};
			});
			return {
				...state,
				questions: newQuestionsArrayAfterAddingOption,
			};

		// finding the question using question id and finding the option using option id and removing it.
		case 'QUESTION_OPTION_REMOVE':
			const newQuestionsArrayAfterRemovingOption = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}

				const newOptionsArray = question.options.filter(
					(option) => option.optionId !== action.optionId
				);

				return {
					...question,
					options: newOptionsArray,
				};
			});
			return {
				...state,
				questions: newQuestionsArrayAfterRemovingOption,
			};

		// finding the question using question id and changing its required field
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

		// finding the question using question id and changing its type
		case 'QUESTION_TYPE_CHANGE':
			const questions = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return {
						...question,
						isValid: false,
					};
				}
				const newQuestion = {
					...question,
					questionType: action.newQuestionType,
				};

				if (
					action.newQuestionType === 'DESCRIPTIVE' ||
					action.newQuestionType === 'STAR'
				) {
					newQuestion.options = [];
				}

				if (action.newQuestionType === 'STAR') {
					newQuestion.numStars = '3';
					newQuestion.isHalfStarAllowed = false;
				}

				if (
					action.newQuestionType === 'SINGLE' ||
					action.newQuestionType === 'MULTIPLE'
				) {
					newQuestion.options = [
						{ optionId: uuidv4(), option: 'Option 1' },
						{ optionId: uuidv4(), option: 'Option 2' },
					];
					newQuestion.numStars = null;
					newQuestion.isHalfStarAllowed = null;
				}

				return {
					...newQuestion,
					isValid: false,
				};
			});
			return {
				...state,
				questions,
			};

		// adding a new question to the state's questions array.
		case 'QUESTION_ADD':
			const newQuestion = {
				questionId: uuidv4(),
				question: '',
				options: [
					{ optionId: uuidv4(), option: 'Option 1' },
					{ optionId: uuidv4(), option: 'Option 2' },
				],
				questionType: action.questionType,
				required: false,
				isValid: false,
				numStars: null,
				isHalfStarAllowed: null,
			};

			if (action.questionType === 'DESCRIPTIVE' || action.questionType === 'STAR') {
				newQuestion.options = [];
			}

			if (action.questionType === 'STAR') {
				newQuestion.numStars = '3';
				newQuestion.isHalfStarAllowed = false;
			}

			const questionsArrayWithAddedQustion = [...state.questions, newQuestion];
			return {
				...state,
				questions: questionsArrayWithAddedQustion,
			};

		// removing a question from state question's array using question id
		case 'QUESTION_REMOVE':
			const newQuestionsArrayAfterRemovingQuestion = state.questions.filter(
				(question) => question.questionId !== action.questionId
			);
			return {
				...state,
				questions: newQuestionsArrayAfterRemovingQuestion,
			};

		case 'SET_INITIAL_QUESTIONS':
			return {
				...state,
				questions: action.initialQuestions,
			};

		case 'STAR_NUMBER_CHANGE':
			const newQuestionsAfterStarNumberChange = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				return {
					...question,
					numStars: action.value,
				};
			});

			return {
				...state,
				questions: newQuestionsAfterStarNumberChange,
			};

		case 'STAR_TYPE_CHANGE':
			const newQuestionsAfterStarTypeChange = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				return {
					...question,
					isHalfStarAllowed: !question.isHalfStarAllowed,
				};
			});
			return {
				...state,
				questions: newQuestionsAfterStarTypeChange,
			};
		default:
			return state;
	}
};

export { createFormReducer };
