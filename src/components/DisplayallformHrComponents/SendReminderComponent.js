import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ReminderListComponent from "./ReminderListComponent";
function SendReminderComponent(props) {

    return (
        <>
            <style type='text/css'>
                        {`
            .main-modal {
                min-width: 80%;
            }
            `}
			</style>
        <Modal
				{...props}
				dialogClassName='main-modal'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<h4>{props.formTitle}</h4>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Row} className='mb-3'>
							<Col sm={{ span: 12 }}>
								<ReminderListComponent
                                    handleModalClose={props.handleModalClose}
                                    handleAlertState={props.handleAlertState} 
                                    employees = {props.employees}
                                    formId = {props.formId}
                                />
							</Col>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
            </>
    )

}
export default SendReminderComponent;