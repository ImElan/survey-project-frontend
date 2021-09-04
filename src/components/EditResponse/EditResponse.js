import NameForm from '../CreateFormComponents/NameForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import DescComponentt from '../../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../../components/ResponseSurveyComponents/CheckBoxComponentt';
import StarComponent from '../../components/ResponseSurveyComponents/StarComponent';
import ResponseFormContainerDuplicate from '../../containers/ResponseFormContainerDuplicate';

function EditResponse(props) {
	const idToken = localStorage.getItem('accessToken');
	const { userId, formId } = useParams();
	const [answers, setAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [sendCopy, setSendCopy] = useState(0);
	const title = props.location.state.title;
	const isFormEditable = props.location.state.isFormEditable;
	useEffect(() => {
		console.log();
		getData();
		async function getData() {
			const result = await fetch(`http://localhost:8080/response/${formId}/${userId}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then((data) => data);
			const response = await result.json();
			console.log(response);
			const result2 = await fetch(`http://localhost:8080/api/form/${formId}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then((data) => data);
			const form = await result2.json();
			console.log(form);
			console.log(response.answers);
			setAnswers(response.answers);
			setSendCopy(response.sendCopy);
			setQuestions(form.surveyQuestions);
		}
	}, []);

	return (
		<ResponseFormContainerDuplicate
			questions={questions}
			formId={formId}
			answers={answers}
			title={title}
			sendCopy={sendCopy}
			isFormEditable={isFormEditable}
			isEdit={true}
			history={props.history}
			totalQuestions={questions.length}
			questionsPerPage={5}
		></ResponseFormContainerDuplicate>
		// <ResponseFormContainerDuplicate title={formTitle} description={formDescription} calledBy={preview} history={props.history} questions={questions} isFormEditable={isFormEditable} isEdit={false} />
	);
}
export default EditResponse;
