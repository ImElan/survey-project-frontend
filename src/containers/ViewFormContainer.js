import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';
import { useParams } from 'react-router-dom';
import ResponseFormContainerDuplicate from './ResponseFormContainerDuplicate'
import { useHistory } from 'react-router-dom';
function ViewFormContainer(props) {
	console.log("ok");
	const history = useHistory();
	const [questions, setQuestions] = useState([]);
	const [formTitle, setFormTitle] = useState(null);
	const [formDescription, setFormDescription] = useState(null);
	const [sendCopy, setSendCopy] = useState(0);
	const idToken = localStorage.getItem('accessToken')
	const { id } = useParams();
	console.log(id);
	// const formid = useParams();
	const [isFormEditable, setisFormEditable] = useState(true);
	const shouldShowForm = async () => {
		const response = await fetch(`http://localhost:8080/accolite/showform/${id}`, {
			headers: {
				"Authorization": localStorage.getItem('accessToken')
			}
		});
		console.log(response);

	}
	useEffect(() => {
		console.log("here");
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
			const response = await fetch(`http://localhost:8080/api/form/${id}`, {
				headers: {
					"Authorization": `Bearer ${idToken}`,
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			const data = await response.json();
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
	console.log((typeof isEditable) + " view");

	const preview = "NOTPREVIEW";
	return (
		<ResponseFormContainerDuplicate title={formTitle} formId={id} description={formDescription} calledBy={preview} history={props.history} questions={questions} isFormEditable={isFormEditable} isEdit={false} />
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
