import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'react-datepicker/dist/react-datepicker.css';
import { Component } from 'react';
import EmployeeListComponent from './EmployeeListComponent';
import App2 from '../../containers/testing';

// class SendEmailComponent extends React.Component {

// const data = (a,b,c) => {
//     const response = await fetch('http://localhost:8080/accolite/filter_employees', {
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         },
//         method: "POST",
//         body: JSON.stringify({
//             formid: "1",//props.formid
//             from_date: "01/08/2021",
//             to_date: "02/08/2021",
//             no_of_days_after_mail: 180
//         }),

//     });
//     console.log(response);
//     const data = await response.json();
//     console.log("employees:");
//     console.log(data);
// }

function SendEmailComponent(props) {
    const [from_date, setFromDate] = useState(null);

    const [to_date, setToDate] = useState(null);

    const [no_of_days_after_mail, setDays] = useState(null);

    const handleInputChange1 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const arr = value.split("-");
        const d = arr[2]+'/'+arr[1]+'/'+arr[0];
        setFromDate(d);
    }
    const handleInputChange2 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const arr = value.split("-");
        const d = arr[2]+'/'+arr[1]+'/'+arr[0];
        setToDate(d);
    }
    const handleInputChange3 = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setDays(value);
    }

    const handleSubmit = (event) => {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }
    const [showResults, setShowResults] = useState(null);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h4>Send Form</h4>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="startdate">
                        <Form.Label column sm={2}>
                            Start Date
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="from_date" type="date" placeholder="Start Date" onChange={handleInputChange1} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="enddate">
                        <Form.Label column sm={2}>
                            End Date
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="to_date" type="date" placeholder="Password" onChange={handleInputChange2} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Number of days post joining
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="no_of_days_after_mail" placeholder="Enter Number of days post joining" onChange={handleInputChange3} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <input className="btn btn-primary" type="button" value="Show Employees" onClick={() => {
                                console.log("button clicked");
                                setShowResults(true);
                               
                            }} />
                            {showResults ? <EmployeeListComponent from_date={from_date} to_date={to_date} no_of_days_after_mail={no_of_days_after_mail} /> : null}
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default SendEmailComponent;