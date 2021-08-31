import React, { useState, useEffect } from 'react';
// import from 'react';
import CenteredTabs from './centeredTabs';
import responseservice from './services/responseservice';
import ExportResponse from '../ViewResponseComponents/ExportResponsesByFormId/ExportResponse';
import { Row, Col, Container } from 'react-bootstrap';
import FormResponseContainer from '../../containers/FormResponseContainer';
const ResponseSummary = (props) => {
    console.log("hiiiiiiiiiiiiiiii");
    const formId = props.location.state.id;
    const [display, setdisplay] = useState("");
    const idToken = localStorage.getItem('accessToken');
    const change = (newVal) => {
        if (newVal == 1) {
            setdisplay("response");
        }
        else if (newVal == 0) {
            setdisplay("summary");
        }
    }
    const [responses, setResponses] = useState([]);
    console.log(formId);
    useEffect(() => {

        getData();
        async function getData() {
            const result = await fetch(`http://localhost:8080/response/${formId}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(data => data);
            const data = await result.json();
            console.log(data);
            setResponses(data);
        }
    }, [])
    return (
        // <div>
        //     {console.log("OK")}
        // </div>
        <Container>
            <Row>
                <Col md={10} >
                    <CenteredTabs change={change}></CenteredTabs>
                    {
                        display == "response" ?
                            <FormResponseContainer formId={formId} responses={responses}></FormResponseContainer>
                            : <div></div>
                    }
                    {/* {display==""?<div/>:(display=="response"?<Summary responses={responses} ></Summary>:<Response responses={responses}></Response>)} */}
                </Col>
                <Col md={2} style={{ float: "right", marginTop: "5px" }}>
                    <ExportResponse formId={formId} />
                </Col>
            </Row>
        </Container>
    )
}
export default ResponseSummary;