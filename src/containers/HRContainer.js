import SendEmailComponent from '../components/SendEmailComponents/SendEmailComponent';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


function HRContainer(){
const [modalShow, setModalShow] = useState(false);

    return (
            <div className="text-center">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Send Form
                </Button>

                <SendEmailComponent
                    show={modalShow}
                    onHide={() => setModalShow(false)
                    }
                />
            </div>
       
    );
}

export default HRContainer;