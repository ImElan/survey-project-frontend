import SendFormComponent from '../components/SendEmailComponents/SendEmailComponent';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


function HRContainer(){
const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <div class="text-center">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Send Form
                </Button>

                <SendFormComponent
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </>
    );
}

export default HRContainer;