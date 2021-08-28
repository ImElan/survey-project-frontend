import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CheckSendCopy = (props) => {
    
  let {sendCopy} = props;

    function checkHandler(){
        if(sendCopy === 0)
            sendCopy = 1;
        else
            sendCopy = 0;
        //console.log(sendCopy);
    }

    return(
        <Container>
            <Row>
            <Col md={4} style={{margin:'10px'}}>
                <input type='checkbox' 
                       onChange={checkHandler}
                       style={{marginRight:'6px', width:'15px', height:'15px'}}
                />
                <label>Do you want a copy of your response?</label>
            </Col>
            </Row>
        </Container>
    );

}
export default CheckSendCopy;
