import React, { useState, useEffect } from 'react';
// import from 'react';
import CenteredTabs from './centeredTabs';
import responseservice from './services/responseservice';
import ExportResponse from '../ViewResponseComponents/ExportResponsesByFormId/ExportResponse';
import { Row, Col, Container, Button } from 'react-bootstrap';
import FormResponseContainer from '../../containers/FormResponseContainer';
import SummaryContainer from './SummaryContainer';
const ResponseSummary = (props) => {
    //console.log("hiiiiiiiiiiiiiiii");
    const formId = props.location.state.id;
    //const formTitle = props.location.state.title;
    const [display, setdisplay] = useState("summary");
    const idToken = localStorage.getItem('accessToken');
    const change = (newVal) => {
        console.log(display);

        if (newVal == 1) {
            setdisplay("response");
        }
        else if (newVal == 0) {
            setdisplay("summary");
        }
    }
    const [responses, setResponses] = useState([]);
    console.log(formId);
    //console.log(formTitle);
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
    // if(display == ""){
    //     <div></div>
    // }
    // else if(display == "response"){

    // }
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
                    {
                        display == "summary" ?
                            <SummaryContainer formId={formId} responses={responses} ></SummaryContainer>
                            : <div></div>
                    }
                </Col>
                
                <Col md={2} style={{ float: "right", marginTop: "5px" }}>
                   { (responses.length === 0)  
                       ? (<Row className='justify-content-md-center'>
                            <Col md={2}>
                                <Button disabled
                                    variant='success'
                                    style={{ borderRadius: '4px', margin: '3px', width:'130px' }}
                                >Export Data</Button>
                            </Col>
                          </Row>)
                       :<ExportResponse formId={formId}/>
                   }
                </Col>
            </Row>
        </Container>
    )
}
export default ResponseSummary;
