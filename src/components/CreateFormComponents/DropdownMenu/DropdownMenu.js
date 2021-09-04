// import { DropdownButton} from 'react-bootstrap';
import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import PopUp from '../PopUpModal';
// import { Dropdown } from 'bootstrap';

function DropdownMenu(props) {
	// const [props, setProps] = useState({questionType: "SINGLE"});
	const options = {
		SINGLE: 'Single Choice',
		MULTIPLE: 'Multiple Choice',
		DESCRIPTIVE: 'Descriptive',
		STAR: 'Star Based',
	};

	const [state, setState] = useState({ popUp: false, questionType: props.questionType });

	const popUpClose = () => setState({ ...state, popUp: false });
	let popUpTitle = 'Confirm Message';
	let initialBody = 'Do you want to change the question type from ';
	const [popUpBody, setPopUpBody] = useState('');

	const confirmHandler = () => {
		setState({ ...state, popUp: false });
		props.questionTypeChangeHandler(props.questionId, state.questionType);
		// setProps({questionType: state.questionType});
	};

	const onSelect = (e) => {
		if (e !== props.questionType) {
			setPopUpBody(initialBody + options[props.questionType] + ' to ' + options[e] + '?');
			setState({ popUp: true, questionType: e });
		}
	};
	return (
		<div>
			<DropdownButton
				//size='lg'
				onSelect={onSelect}
				variant='outline-primary'
				title={options[props.questionType]}
			>
				{Object.keys(options).map((key, id) => (
					<Dropdown.Item key={id} eventKey={key}>
						{options[key]}
					</Dropdown.Item>
				))}
			</DropdownButton>
			<PopUp
				show={state.popUp}
				popUpClose={popUpClose}
				popUpTitle={popUpTitle}
				confirmHandler={confirmHandler}
				popUpBody={popUpBody}
			/>
		</div>
	);
}

export default DropdownMenu;
