import { v4 as uuidv4 } from 'uuid';

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
				const newOptionsArray = question.options.map((option) => {
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
				questions: newArrayOfQuestions,
			};

		case 'QUESTION_OPTION_ADD':
			const newQuestionsArrayAfterAddingOption = state.questions.map((question) => {
				if (question.questionId !== action.questionId) {
					return question;
				}
				const newOptionsArray = [...question.options, action.newOption];
				return {
					...question,
					options: newOptionsArray,
				};
			});
			return {
				...state,
				questions: newQuestionsArrayAfterAddingOption,
			};

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
			const questions = state.questions.map((question) => {
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

		case 'QUESTION_ADD':
			let newQuestion = {
				questionId: uuidv4(),
				question: 'Question',
				options: ['Option 1'],
				questionType: action.questionType,
				required: false,
			};
			const questionsArrayWithAddedQustion = [...state.questions, newQuestion];
			return {
				...state,
				questions: questionsArrayWithAddedQustion,
			};

		default:
			return state;
	}
};

export { createFormReducer };
