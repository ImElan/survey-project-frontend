
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
			console.log(newAnswersArray);
			return {
				...state,
				answerss: newAnswersArray,
			};

		case 'OPTION_SINGLE_SELECT':
			const newAnswerssArray = state.answerss.map((answers) => {
				if (answers.questions.questionId !== action.questionId) {
					return answers;
				}
				return {
					...answers,
					answer: action.option,
				};
			});

			return {
				...state,
				answerss: newAnswerssArray,
			}

		case 'CHANGE-RATING':
			// console.log("b" + value);
			// console.log("a" + action.questionId);
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
			// console.log(newAnswersssArray);
			return {
				...state,
				answerss: newAnswersssArray,
			};

		case 'OPTION_ADD_REMOVE':
			const newAnswersArrayy = state.answerss.map((answers) => {
				if (answers.questions.questionId !== action.questionId) {
					return answers;
				}

				// console.log(action.option);
				var removequestion = [...answers.answerarr];
				removequestion = removequestion.filter((ans) => ans != action.option);
				// console.log(removequestion);      

				var tempans = [...answers.answerarr]
				if (removequestion.length == tempans.length) {
					tempans = [...answers.answerarr, action.option];
				}
				else {
					tempans = removequestion;
				}

				// const addanswer = [...answers.answer, action.optionId]
				const addanswer = tempans;
				var strans = "";
				// for(var i=0;i<tempans.length;i++)
				// 	strans += addanswer[i]+", ";
				strans = addanswer.join(',');
				return {
					...answers,
					answerarr: addanswer,
					answer: strans,
				};
			});
			return {
				...state,
				answerss: newAnswersArrayy,
			};

		default:
			return state;
	}
}

export { responseFormReducer };