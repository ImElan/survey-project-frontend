import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function PopUpModal(props) {
	const { show, popUpClose, popUpTitle, popUpBody, confirmHandler } = props;

	const hidePopUp = () => {
		popUpClose();
	};

	return (
		<Modal show={show} onHide={hidePopUp} centered>
			<Modal.Header closeButton>
				<Modal.Title style={{ height: '1.5rem' }}>{popUpTitle}</Modal.Title>
			</Modal.Header>

			<Modal.Body>{popUpBody}</Modal.Body>

			<Modal.Footer>
				<Button
					variant='primary'
					onClick={() => {
						confirmHandler();
						hidePopUp();
					}}
				>
					{' '}
					Yes, sure!
				</Button>
				<Button variant='secondary' onClick={hidePopUp}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default PopUpModal;
