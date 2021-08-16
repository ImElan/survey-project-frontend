import React, { useState } from 'react';
import PopUp from '../PopUpModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
			<OverlayTrigger
				placement='bottom'
				delay={{ show: 250, hide: 100 }}
				overlay={(properties) => (
					<Tooltip id='button-tooltip'>
						{props.disabled ? (
							<span> Can not have less than {props.minQuestions} questions</span>
						) : (
							<span> Delete the question</span>
						)}
					</Tooltip>
				)}
			>
				<BsFillTrashFill onClick={handleClick} size='1.5rem' />
			</OverlayTrigger>
			<span
				style={{ marginTop: '0.25rem', marginLeft: '0.65rem', fontFamily: 'Monospace' }}
			>
				Delete
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
