import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import CreateFormContainer from './CreateFormContainer';

function EditHrFormContainer(props) {
	const { formId } = useParams();

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
			} catch (error) {
				console.log(error.response);
				// show alert message maybe.
			}
		};
		fetchData();
	}, [accessToken, formId]);

	return <div>Editing</div>;
}

export default EditHrFormContainer;
