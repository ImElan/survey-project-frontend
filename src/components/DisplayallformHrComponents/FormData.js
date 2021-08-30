import Modal from 'react-bootstrap/Modal'
import "../../styles/displayforms.css"
import SendEmailComponent from './SendEmailComponent';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function FormData(props) {
    const [modalShow, setModalShow] = useState(false);
    console.log(props);
    return (
        <div className="formdata-wrapper">
            <div className="row">
                <div className="col-md-8 col-sm-8 col-xs-12">
                    <h2>{props.formTitle}</h2>
                    <p>{props.formDescription}</p>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12 btns">
                    <div className="flex-left">
                        <button className="btn btn-primary" onClick={() => props.history.push('/form/preview', { formdata: props })}>View</button>
                    </div>
                    <div className="flex-left">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Send Form
                        </Button>

                        <SendEmailComponent
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default FormData;