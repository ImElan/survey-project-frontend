import { Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import EmployeeListComponent from './EmployeeListComponent';

function SendEmailComponent(props) {
	const [from_date, setFromDate] = useState(null);

	const [to_date, setToDate] = useState(null);

	const [no_of_days_after_mail, setDays] = useState(null);

	const [emails, setEmails] = useState([]);

	const [loading1, setIsLoading1] = useState(false);

	const [loading2, setIsLoading2] = useState(false);

	const [employees, setEmployees] = useState([]);

	const [error1, setError1] = useState(false);

	const [error2, setError2] = useState(false);

	const [showResults, setShowResults] = useState(false);

	// const setLoadingState = (value) => {
	// 	setIsLoading(value);
	// };

	// const setError = (value) => {
	// 	setsendemailerror(value);
	// };



	const handleInputChange1 = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const arr = value.split('-');
		const d = arr[2] + '/' + arr[1] + '/' + arr[0];
		setFromDate(d);
	};
	const handleInputChange2 = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const arr = value.split('-');
		const d = arr[2] + '/' + arr[1] + '/' + arr[0];
		setToDate(d);
	};
	const handleInputChange3 = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		setDays(value);
	};

	const handleInputChange4 = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		setEmails(value);

	};

	async function sendemail(data, setLoadingState, setError) {
		const idToken = localStorage.getItem('accessToken');
		try {
			setIsLoading1(true);
			setError1(false);
			const response = await axios.post(
				'http://localhost:8080/accolite/send_email_without_no_of_days',
				{ tomailid: data },
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			);
			setIsLoading1(false);
			console.log(response);
		} catch (error) {
			setIsLoading1(false);
			setError1(true);
			console.log(error.response);
		}
	}

	async function getEmployees() {
		const idToken = localStorage.getItem('accessToken');
		try {
			setIsLoading2(true);
			setError2(false);

			const response = await axios.post(
				'http://localhost:8080/accolite/filter_employees',
				{
					formid: props.formId,
					from_date: from_date,
					to_date: to_date,
					no_of_days_after_mail: no_of_days_after_mail,
				},
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
						'Content-type': 'application/json; charset=UTF-8',
					}
				});
			console.log('here in response');
			console.log(response);
			const dataemp = await response.data;
			setEmployees(dataemp);
			setIsLoading2(false);
		}
		catch (error) {
			setError2(true);
			setIsLoading2(false);
			console.log(error);
			console.log(error.response);
		}
	};

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
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<h4>Send Form</h4>
				</Modal.Header>
				<Modal.Body>
					<h5>Enter Emails Id's</h5>
					<Form>
						<Form.Group as={Row} className='mb-3' controlId='emails'>
							<Form.Label column sm={2}>
								Enter Email Ids
							</Form.Label>
							<Col sm={10}>
								<Form.Control
								as="textarea"
									name='emailIds'
									type='textarea'
									placeholder='add more people...'
									onChange={handleInputChange4}
									
									required
								/>

							</Col>
						</Form.Group>
						<Form.Group as={Row} className='mb-3'>
							<Col sm={{ span: 10, offset: 2 }}>
								<Button
									className='btn btn-primary'
									type='submit'
									value='Send Form'
									onClick={(event) => {
										setError1(false);
										console.log(emails);
										event.preventDefault();
										if (emails.length > 0) {
											const em = emails.split(",");
											console.log(em);
											sendemail(em, setIsLoading1, setError1);
										}
										else {
											alert("enter email ids");
										}

									}}
								>Send Form {' '}
									{loading1 && (
										<Spinner animation='border' variant='light' size="sm" />
									)}
								</Button>
								{error1 && (
									<p className="text-danger">Something went wrong</p>
								)}

							</Col>
						</Form.Group>
					</Form>

					<hr></hr>
					<br />
					<h5>Send based on Number of days at Accolite</h5>
					<Form>
						<Form.Group as={Row} className='mb-3' controlId='startdate'>
							<Form.Label column sm={2}>
								Start Date
							</Form.Label>
							<Col sm={10}>
								<Form.Control
									name='from_date'
									type='date'
									placeholder='Start Date'
									onChange={handleInputChange1}
									required
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className='mb-3' controlId='enddate'>
							<Form.Label column sm={2}>
								End Date
							</Form.Label>
							<Col sm={10}>
								<Form.Control
									name='to_date'
									type='date'
									placeholder='Password'
									onChange={handleInputChange2}
									required
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
							<Form.Label column sm={2}>
								Number of days post joining
							</Form.Label>
							<Col sm={10}>
								<Form.Control
									type='text'
									name='no_of_days_after_mail'
									placeholder='Enter Number of days post joining'
									onChange={handleInputChange3}
									required
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className='mb-3'>
							<Col sm={{ span: 10, offset: 2 }}>
								<Button
									className='btn btn-primary'
									type='submit'
									value='Show Employees'
									onClick={(event) => {
										event.preventDefault();
										if (from_date == null || to_date == null || no_of_days_after_mail == null)
											alert("enter all the details");
										else {
											console.log('button clicked');
											getEmployees();
											console.log(employees);
											setShowResults(true);
										}
									}}
								> Show Employees {' '}
									{loading2 && (
										<Spinner animation='border' variant='light' size="sm" />
									)}
								</Button>

								{error2 && (
									<p className="text-danger">Something went wrong</p>
								)}

								{showResults && employees.length > 0 ? (
									<EmployeeListComponent
										employees={employees}
									/>
								) : null}
							</Col>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => {
						props.onHide();
						setIsLoading1(false);
						setIsLoading2(false);
						setError1(false);
						setError2(false);
						setEmployees([]);
						setFromDate(null);
						setToDate(null);
						setDays(null);
						setEmails([]);
						setEmployees([]);

					}}>Close</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}


export default SendEmailComponent;