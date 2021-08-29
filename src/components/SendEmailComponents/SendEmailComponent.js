import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'react-datepicker/dist/react-datepicker.css';

function SendFormComponent(props) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedFromDate, setSelectedFromDate] = useState(null);
    const [selectedToDate, setSelectedDToDate] = useState(null);
    const [showResults, setShowResults] = React.useState(false);

    const [questions, setQuestions] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const resp = await fetch('http://localhost:1234/accolite/filter_employees', {
                method: "POST",
                body: JSON.stringify({
                    formid: "1",
                    from_date: document.getElementById("startdate"),
                    to_date: document.getElementById("enddate"),
                    no_of_days_after_mail: document.getElementById("noofdays")
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())

                // Displaying results to console
                .then(json => console.log(json));

            setData(resp);
            setIsLoading(false);
        } catch (e) {
            setError(e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("here");
        getData();
        async function getData() {
            const response = await fetch("http://localhost:8080/api/form/1");
            const data = await response.json();
            const q = data.surveyQuestions;
            console.log(q);
            setQuestions(q);
        }
    }, []);

    const Results = () => (
        <div id="results" className="search-results">
            Some Results
        </div>
    )


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
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Start Date
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="startdate" type="date" placeholder="Start Date" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            End Date
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="enddate" type="date" placeholder="Password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Number of days post joining
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" id="noofdays" placeholder="Enter Number of days post joining" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <input type="submit" value="Show Employees" onClick={() => fetchData()} />
                            {showResults ? <Results /> : null}
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

// function SendFormComponent(props) {
//     return (
//         <>
//             <div class="text-center">
//                 <Button variant="primary" onClick={() => setModalShow(true)}>
//                     Send Form
//                 </Button>

//                 <MyVerticallyCenteredModal
//                     show={modalShow}
//                     onHide={() => setModalShow(false)}
//                 />
//             </div>
//         </>
//     );

// }
export default SendFormComponent;