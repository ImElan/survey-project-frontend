import Modal from 'react-bootstrap/Modal'
import "../../styles/displayforms.css"
import SendEmailComponent from './SendEmailComponent';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function FormData(props) {
    const [show, setShow] = useState({
        title: '',
        description: '',
        questions: [],
    });

    // useEffect(() => {
    // }, []);
    const setFormData = () => {

        show.title = props.form.formTitle;
        show.description = props.form.formDescription;
        // show.questions = props.questionList;
        show.questions = props.form.surveyQuestions.map(question => {
            return {
                ...question,
                imageData: question.image
            }
        })
        window.localStorage.setItem('formstate', JSON.stringify(show));
    }
    const [modalShow, setModalShow] = useState(false);
    console.log(props);
    return (
        <div className="formdata-wrapper">
            <div className="row">
                <div className="col-md-8 col-sm-12 col-xs-12">
                    <h2 style={{ padding: 0 }} >{props.form.formTitle}</h2>
                    <p>{props.form.formDescription}</p>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12 btns">

                    <div className="flex-left">
                        <button className="btn btn-primary" onClick={() => props.history.push('/viewresponses', { id: props.form.id })}>Responses</button>
                    </div>
                    {/* <div className="flex-left">
                        <button className="btn btn-primary" onClick={() => {
                            setFormData();
                            props.history.push('/preview')
                        }}>View</button>
                    </div> */}
                    <div className="flex-left">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Send
                        </Button>

                        <SendEmailComponent
                            show={modalShow}
                            formId={props.formId}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default FormData;