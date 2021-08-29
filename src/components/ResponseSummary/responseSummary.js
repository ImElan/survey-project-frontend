import React, { useState, useEffect } from 'react';
// import from 'react';
import CenteredTabs from './centeredTabs';
import responseservice from './services/responseservice';
import { ExportResponse } from '../ViewResponseComponents/ExportResponsesByFormId/ExportResponse';
import { Row, Col, Container } from 'react-bootstrap';
const ResponseSummary = ({ formId }) => {
    const [display, setdisplay] = useState("");
    const change = (newVal) => {
        if (newVal == 1) {
            setdisplay("response");
        }
        else if (newVal == 0) {
            setdisplay("summary");
        }
    }
    const [responses, setResponses] = useState([]);
    // useEffect(() => {

    //     responseservice.doGetById(formId).then(response => response.json())
    //         .then(data => {
    //             setResponses(data);
    //             console.log(responses);
    //         })
    // })
    return (
        <div>
            {console.log("OK")}
            <CenteredTabs change={change}></CenteredTabs>
            {/* <ExportResponse formId={formId} /> */}
        </div>
        // <Container>
        //     <Row>
        //         <Col>
        //             {/* {display==""?<div/>:(display=="response"?<Summary responses={responses} ></Summary>:<Response responses={responses}></Response>)} */}
        //         </Col>
        //         <Col>
        //         </Col>
        //     </Row>
        // </Container>
    )
}
export default ResponseSummary;