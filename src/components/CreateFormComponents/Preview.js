import React, { useEffect, useReducer, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import 'tachyons';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';
import axios from 'axios';

function Preview(props) {
	// const [show, setShow] = React.useState({
	// 	title: '',
	// 	description: '',
	// 	questions: [],
	// 	totalQuestions: '',
	// 	questionsPerPage: '',
	// });

	// const [show2, setShow2] = React.useState({
	// 	title: '',
	// 	description: '',
	// 	questions: '',
	// 	totalQuestions: '',
	// 	questionsPerPage: '',
	// });

	const idToken = localStorage.getItem('accessToken');
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	show.title = props.formTitle;
	// 	show.description = props.formDescription;
	// 	show.totalQuestions = props.totalQuestions;
	// 	show.questionsPerPage = props.questionsPerPage;

	// 	// show.questions = props.questionList;
	// 	show.questions = props.questionList.map((question) => {
	// 		return {
	// 			...question,
	// 			image: null,
	// 			imageData: question.image,
	// 		};
	// 	});

	// 	//	window.localStorage.setItem('formstate', JSON.stringify(show));
	// });
	const [view, showview] = useState(true);
	const [id, setid] = useState('hi');
	// const handleclick = () => {
	// 	showview(false);
	// };
	var data = ' ';
	const Postvalues = () => {
		console.log('success');
		// console.log(show.questions);
		const newQuestions = props.questionList.map((question) => {
			let optionsArr = null;
			if (question.questionType === 'SINGLE' || question.questionType === 'MULTIPLE') {
				optionsArr = question.options.optionsArray.map((option) => option.option);
			}
			return {
				...question,
				image: null,
				imageData: question.image,
				options: optionsArr,
			};
		});

		let show = {
			title: props.formTitle,
			description: props.formDescription,
			totalQuestions: props.totalQuestions,
			questionsPerPage: props.questionsPerPage,
			questions: newQuestions,
		};

		setLoading(true);
		try {
			console.log('preview data body', show);
			const response = axios.post('http://localhost:8080/post/preview', show, {
				headers: {
					Authorization: `Bearer ${idToken}`,
					'Content-type': 'application/json; charset=UTF-8',
				},
			});

			response.then((res) => {
				setLoading(false);
				window.localStorage.setItem('objectid', JSON.stringify(res.data));
				window.open('/preview', '_blank');
			});
		} catch (error) {
			setLoading(false);
			console.log(error);
			console.log(error.response);
		}
	};

	return (
		<div>
			{/* <Link
				to='/preview'
				target='_blank'
				rel='noopener noreferrer'
				className='btn btn-primary'
				onClick={Postvalues}
			>
				Preview Form
			</Link> */}

			{loading && (
				<div className='d-flex justify-content-center my-3'>
					<h4 style={{ marginRight: '15px' }}>Please wait...</h4>
					<Spinner animation='border' variant='primary' />
				</div>
			)}
			<Button variant='primary' onClick={Postvalues}>
				Preview Form
			</Button>
		</div>
	);
}
export default Preview;
