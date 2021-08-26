// import { v4 as uuidv4 } from 'uuid';

const responseFormReducer = (state, action) => {

	switch (action.type) {
		case 'ANSWER_TEXT_CHANGE':
			const newAnswersArray = state.answerss.map((answers) => {
				if (answers.questions.questionId !== action.questionId) {
					return answers;
				}
				return {
					...answers,
					answer: action.newParaText,
					isvalid: action.isvalid,
				};
			});
			// console.log(newAnswersArray);
			return {
				...state,
				answerss: newAnswersArray,
			};
		case 'CHANGE-RATING':
			// console.log("b" + value);
			console.log("a" + action.questionId);
			const newAnswersssArray = state.answerss.map((answers) => {
				if (answers.questions.questionId != action.questionId) {
					return answers;
				}
				return {
					...answers,
					answer: action.value,
					isvalid: true,
				};
			});
			console.log(newAnswersssArray);
			return {
				...state,
				answerss: newAnswersssArray,
			};

		case 'OPTION_SINGLE_SELECT':
			const newAnswerssArray = state.answerss.map((answers) => {
				if (answers.questions.questionId !== action.questionId) {
					return answers;
				}
				return {
					...answers,
					answer: action.optionId,
				};
			});

			return {
				...state,
				answerss: newAnswerssArray,
			}

		case 'OPTION_ADD_REMOVE':
			const newAnswersArrayy = state.answerss.map((answers) => {
				if (answers.questions.questionId !== action.questionId) {
					return answers;
				}


				var removequestion = [...answers.answer];
				removequestion = removequestion.filter((ans) => ans !== action.optionId.toString());
				// console.log(removequestion);      

				var tempans = [...answers.answer]
				if (removequestion.length == tempans.length) {
					tempans = [...answers.answer, action.optionId];
				}
				else {
					tempans = removequestion;
				}

				// const addanswer = [...answers.answer, action.optionId]
				const addanswer = tempans;
				return {
					...answers,
					answer: addanswer,
				};
			});
			return {
				...state,
				answerss: newAnswersArrayy,
			};

		// case 'SET_INITIAL_ANSWERS':
		// 	return {
		// 		...state,
		// 		answerss: action.initialAnswers,
		// 	};

		default:
			return state;
	}
}

export { responseFormReducer };