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