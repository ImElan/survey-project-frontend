
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
<<<<<<< HEAD

=======
			console.log(newAnswersssArray);
>>>>>>> ViewResponse
			return {
				...state,
				answerss: newAnswerssArray,
			}

<<<<<<< HEAD
		case 'CHANGE-RATING':
			// console.log("b" + value);
			// console.log("a" + action.questionId);
			const newAnswersssArray = state.answerss.map((answers) => {
				if (answers.questions.questionId != action.questionId) {
=======
		case 'OPTION_SINGLE_SELECT':
			const newAnswerssArray = state.answerss.map((answers) =>{
				
				if(answers.questions.questionId !== action.questionId){
>>>>>>> ViewResponse
					return answers;
				}
				console.log("iNside", answers.questions.questionId)
				return {
					...answers,
<<<<<<< HEAD
					answer: action.value,
					isvalid: true,
				};
			});
			// console.log(newAnswersssArray);
=======
					answer: action.option,
				};
			});
>>>>>>> ViewResponse
			return {
				...state,
				answerss: newAnswersssArray,
			};

		case 'OPTION_ADD_REMOVE':
			const newAnswersArrayy = state.answerss.map((answers) => {
				if (answers.questions.questionId !== action.questionId) {
					return answers;
<<<<<<< HEAD
				}

				// console.log(action.option);
				var removequestion = [...answers.answerarr];
				removequestion = removequestion.filter((ans) => ans != action.option);
				// console.log(removequestion);      

				var tempans = [...answers.answerarr]
				if (removequestion.length == tempans.length) {
					tempans = [...answers.answerarr, action.option];
=======
				}					
			
				console.log(action.option);
				var removequestion = [...answers.answerarr];
				removequestion = removequestion.filter((ans) => ans != action.option );
				// console.log(removequestion);      

				var tempans = [...answers.answerarr]
				if(removequestion.length == tempans.length)
				{
					tempans = [...answers.answerarr,action.option];
>>>>>>> ViewResponse
				}
				else
				{
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

<<<<<<< HEAD
=======
		case 'SET_INITIAL_ANSWERS':
			return {
				...state,
				answerss: action.initialAnswers,
			};

>>>>>>> ViewResponse
		default:
			return state;
	}
}

export { responseFormReducer };