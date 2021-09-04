import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';
import { useParams } from 'react-router-dom';
import ResponseFormContainerDuplicate from './ResponseFormContainerDuplicate';
import { useHistory } from 'react-router-dom';
function ViewFormContainer(props) {
	console.log('ok');
	const history = useHistory();
	const [questions, setQuestions] = useState([]);
	const [formTitle, setFormTitle] = useState(null);
	const [formDescription, setFormDescription] = useState(null);
	const [sendCopy, setSendCopy] = useState(0);
	const idToken = localStorage.getItem('accessToken');
	const { id } = useParams();
	console.log(id);
	// const formid = useParams();
	const [isFormEditable, setisFormEditable] = useState(true);

	const handleSendCopy = (value) => {
		setSendCopy(value);
	};

	const shouldShowForm = async () => {
		const response = await fetch(`http://localhost:8080/accolite/showform/${id}`, {
			headers: {
				Authorization: localStorage.getItem('accessToken'),
			},
		});
		console.log(response);
	};
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
		// getData();
		// if (shouldShowForm()) {
		getData();
		// }
		async function getData() {
			const userId = localStorage.getItem('userId');
			let isFound = false;
			try {
				const result = await fetch(`http://localhost:8080/response/${id}/${userId}`).then(
					(data) => data
				);
				const response_1 = await result.json();
				isFound = true;
				if (response_1.statusCode == 'NOT_FOUND') isFound = false;
			} catch (err) {
				isFound = false;
				console.log(err);
			}
			console.log('is Found', isFound);

			const response = await fetch(`http://localhost:8080/api/form/${id}`, {
				headers: {
					Authorization: `Bearer ${idToken}`,
					'Content-type': 'application/json; charset=UTF-8',
				},
			});

			const data = await response.json();

			if (isFound) {
				console.log('are you inside');
				history.push('/form/thankyou', {
					title: data.formTitle,
					isFormEditable: data.formEditable,
					formId: id,
					userId: userId,
				});
			}
			const q = data.surveyQuestions;
			console.log(q);
			setQuestions(q);
			setFormTitle(data.formTitle);
			setFormDescription(data.formDescription);
			console.log(data);
			setisFormEditable(data.formEditable);
		}
	}, []);

	console.log(questions);
	console.log(typeof isEditable + ' view');

	const preview = 'NOTPREVIEW';
	return (
		<ResponseFormContainerDuplicate
			title={formTitle}
			formId={id}
			description={formDescription}
			calledBy={preview}
			history={props.history}
			questions={questions}
			isFormEditable={isFormEditable}
			isEdit={false}
			sendCopy={sendCopy}
			handleSendCopy={handleSendCopy}
			totalQuestions={questions.length}
			questionsPerPage={5}
		/>
		// <h5>hello</h5>
	);

	console.log(questions);

	// const preview = 'NOTPREVIEW';
	// return (
	// 	<ResponseFormContainer
	// 		title={formTitle}
	// 		description={formDescription}
	// 		calledBy={preview}
	// 		questions={questions}
	// 	/>
	// 	// <h5>hello</h5>
	// );
}
export default ViewFormContainer;
