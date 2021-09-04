import React, { useEffect, useReducer, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'tachyons';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';

function Preview(props) {
	const [show, setShow] = React.useState({
		title: '',
		description: '',
		questions: [],
		totalQuestions: '',
		questionsPerPage: '',
	});

	useEffect(() => {
		show.title = props.formTitle;
		show.description = props.formDescription;
		show.totalQuestions = props.totalQuestions;
		show.questionsPerPage = props.questionsPerPage;
		// show.questions = props.questionList;
		show.questions = props.questionList.map((question) => {
			return {
				...question,
				image: null,
				imageData: question.image,
			};
		});
		console.log(show);
		window.localStorage.setItem('formstate', JSON.stringify(show));
	});
	const [view, showview] = useState(true);

	// const handleclick = () => {
	// 	showview(false);
	// };

	return (
		<div>
			<Link
				to='/preview'
				target='_blank'
				rel='noopener noreferrer'
				className='btn btn-primary'
			>
				Preview Form
			</Link>
		</div>
	);
}
export default Preview;
