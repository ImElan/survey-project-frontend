import React, { useState } from 'react';
import PopUp from '../PopUpModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillTrashFill } from 'react-icons/bs';

function DeleteQuestionButton(props) {
	const [popUp, setPopUp] = useState(false);
	const popUpClose = () => setPopUp(false);
	let popUpTitle = 'Confirm Message';
	let popUpBody = 'Do you want to delete the question?';

	const handleClick = () => {
		if (!props.disabled) {
			setPopUp(true);
		}
	};

	const confirmHandler = () => {
		props.deleteQuestionHandler(props.questionId);
	};

	return (
		<div>
			<BsFillTrashFill
				onClick={handleClick}
				size='1.5rem'
				style={{ cursor: !props.disabled ? 'pointer' : 'not-allowed' }}
			/>
			<span
				style={{
					marginTop: '0.25rem',
					marginLeft: '0.65rem',
					fontFamily: 'Monospace',
				}}
			>
				{props.disabled ? (
					<span>Cannot delete minimum {props.minQuestions} questions needed</span>
				) : (
					<span>Delete</span>
				)}
			</span>
			<PopUp
				show={popUp}
				popUpClose={popUpClose}
				popUpTitle={popUpTitle}
				confirmHandler={confirmHandler}
				popUpBody={popUpBody}
			/>
		</div>
	);
}

export default DeleteQuestionButton;
