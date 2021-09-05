import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';
import FormResponses from '../components/FormResponses/FormResponses';
import ResponseFormContainerDuplicate from './ResponseFormContainerDuplicate';
import axios from 'axios';
function PreviewFormContainer(props) {
	const idToken = localStorage.getItem('accessToken');
	const id = JSON.parse(window.localStorage.getItem('objectid'));
	console.log(id);
	const [formstate, setformstate] = useState({
		title: '',
		description: '',
		questions: [],
		totalQuestions: '',
		questionsPerPage: '',
	});

	useEffect(() => {
		const response = axios.get(`http://localhost:8080/get/preview/${id}`, {
			headers: {
				Authorization: `Bearer ${idToken}`,
				'Content-type': 'application/json; charset=UTF-8',
			},
		});

		response.then((res) => {
			console.log(res.data);
			setformstate(res.data);
		});
	}, []);

	console.log(formstate);
	// const formstate = JSON.parse(window.localStorage.getItem('formstate'));
	const newQuestions = formstate.questions.map((question) => {
		let optionsArr = null;
		if (question.questionType === 'SINGLE' || question.questionType === 'MULTIPLE') {
			optionsArr = question.options.optionsArray.map((option) => option.option);
		}
		return {
			...question,
			options: optionsArr,
		};
	});
	const preview = 'PREVIEW';
	return (
		<div>
			<ResponseFormContainerDuplicate
				preview={true}
				title={formstate.title}
				description={formstate.description}
				calledBy={preview}
				questions={newQuestions}
				totalQuestions={formstate.totalQuestions}
				questionsPerPage={formstate.questionsPerPage}
			>
				console.log(formstate);
			</ResponseFormContainerDuplicate>
		</div>
	);
}
export default PreviewFormContainer;
