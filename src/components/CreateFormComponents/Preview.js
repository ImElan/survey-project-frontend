import React, { useEffect, useReducer, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'tachyons';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';

function Preview(props) {
	<div>
		<h1>My header component</h1>
	</div>
	const [show, setShow] = React.useState({
		title: '',
		description: '',
		questions: [],
	});

	useEffect(() => {
		show.title = props.formTitle;
		show.description = props.formDescription;
		// show.questions = props.questionList;
		show.questions = props.questionList.map((question) => {
			return {
				...question,
				imageData: question.image,
			};
		});
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
