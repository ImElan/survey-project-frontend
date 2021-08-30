import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';
import { useParams, useHistory } from 'react-router-dom';

function ViewFormContainer(props) {
	const [questions, setQuestions] = useState([]);
	const [formTitle, setFormTitle] = useState(null);
	const [formDescription, setFormDescription] = useState(null);

	const { id } = useParams();
	console.log(id);
	const history = useHistory();

	useEffect(() => {
		console.log('here');
		const token = localStorage.getItem('accessToken');
		if (!token) {
			history.push({
				pathname: '/',
				state: {
					formId: id,
				},
			});
		}

		getData();
		async function getData() {
			const response = await fetch(`http://localhost:8080/api/form/${id}`);
			const data = await response.json();
			console.log(data);
			const q = data.surveyQuestions;
			console.log(q);
			setQuestions(q);
			setFormTitle(data.formTitle);
			setFormDescription(data.formDescription);
		}
	}, []);

	console.log(questions);

	const preview = 'NOTPREVIEW';
	return (
		<ResponseFormContainer
			title={formTitle}
			description={formDescription}
			calledBy={preview}
			questions={questions}
		/>
		// <h5>hello</h5>
	);
}
export default ViewFormContainer;
