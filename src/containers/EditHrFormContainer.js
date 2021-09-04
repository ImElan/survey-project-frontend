import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import CreateFormContainer from './CreateFormContainer';

function EditHrFormContainer(props) {
	const { formId } = useParams();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isFormEditable, setIsFormEditable] = useState(false);
	const [initialQuestions, setInitialQuestions] = useState([]);

	const accessToken = localStorage.getItem('accessToken');
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:8080/api/form/${formId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				console.log(response);
				const { formTitle, formDescription, surveyQuestions, formEditable } =
					response.data;
				const questions = surveyQuestions.map((surveyQuestion) => {
					let surveyOptions = null;
					if (
						surveyQuestion.questionType === 'SINGLE' ||
						surveyQuestion.questionType === 'MULTIPLE'
					) {
						surveyOptions = surveyQuestion.options.map((surveyOption) => {
							return {
								optionId: uuidv4(),
								option: surveyOption,
							};
						});
					}
					return {
						questionId: surveyQuestion.questionId,
						question: surveyQuestion.question,
						options: {
							optionsArray: surveyOptions,
							isOptionsValid: true,
						},
						questionType: surveyQuestion.questionType,
						required: surveyQuestion.required,
						isValid: true,
						numStars: surveyQuestion.noOfStars ? surveyQuestion.noOfStars : null,
						threshold: null,
						isHalfStarAllowed: surveyQuestion.halfStarAllowed
							? surveyQuestion.halfStarAllowed
							: null,
						image: surveyQuestion.imageData,
					};
				});
				console.log(formTitle);
				console.log(formDescription);
				console.log(questions);
				console.log(formEditable);

				setTitle(formTitle);
				setDescription(formDescription);
				setIsFormEditable(formEditable);
				setInitialQuestions(questions);
			} catch (error) {
				console.log(error);
				console.log(error.response);
				// show alert message maybe.
			}
		};
		fetchData();
	}, [accessToken, formId]);

	return (
		<CreateFormContainer
			isEditing={true}
			formId={formId}
			initialTitle={title}
			initialDescription={description}
			initialEditable={isFormEditable}
			initialQuestionsFromEdit={initialQuestions}
		/>
	);
}

export default EditHrFormContainer;
