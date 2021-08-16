import React from 'react';
import {Button, Modal} from 'react-bootstrap';


function PopUpModal(props) {
    
    const {show, popUpClose, popUpTitle, popUpBody, confirmHandler} = props;

    const hidePopUp = () => {
        popUpClose();
    };

    return(
        <div>
            <Modal show={show} onHide={hidePopUp} centered>
                
                <Modal.Header className = "h2">
                    <Modal.Title>{popUpTitle}</Modal.Title>
                    <Button variant = "outline-danger"
                            size = "sm"
                            onClick={hidePopUp}>×
                    </Button> 
                </Modal.Header>
            
                <Modal.Body className="f5 h3">
                    {popUpBody}
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant = "primary" onClick = {()=>{
                                                                confirmHandler();
                                                                hidePopUp();
                                                                }}> Confirm
                    </Button>
                    <Button variant = "secondary" onClick = {hidePopUp}>Cancel</Button>
                </Modal.Footer>
                
            </Modal>
        </div>
    );
    
}
export default PopUpModal;
