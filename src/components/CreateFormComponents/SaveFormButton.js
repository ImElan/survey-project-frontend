import React, { useState } from 'react';
import 'tachyons';
import { Button, Modal } from 'react-bootstrap';

function SaveFormButton(props) {
	const { saveFormHandler } = props;

	const [show, popup] = useState(false);
	const showModal = () => popup(true);
	const hideModal = () => popup(false);

	return (
		<div>
			<Button
				variant='outline-dark'
				className='f4 fw5 bw1 grow pointer'
				onClick={showModal}
			>
				{' '}
				Save and Create
			</Button>

			<Modal show={show} onHide={hideModal} backdrop='static' keyboard={false}>
				<Modal.Body className='f3 h3'>Confirm Form Creation</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={hideModal}>
						Cancel
					</Button>
					<Button variant='primary' onClick={saveFormHandler}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default SaveFormButton;
