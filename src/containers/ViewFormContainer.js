import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';
import { useParams } from 'react-router-dom';
import ResponseFormContainerDuplicate from './ResponseFormContainerDuplicate'
function ViewFormContainer(props) {
    const [questions, setQuestions] = useState([]);
    const [formTitle, setFormTitle] = useState(null);
    const [formDescription, setFormDescription] = useState(null);
    const [sendCopy, setSendCopy] = useState(0);

    // const formid = useParams();
    const [isEditable, setIsEditable] = useState(true);
    useEffect(() => {
        console.log("here");
        getData();
        async function getData() {
            const response = await fetch(`http://localhost:8080/api/form/243`);
            const data = await response.json();
            const q = data.surveyQuestions;
            console.log(q);
            setQuestions(q);
            setFormTitle(data.formTitle);
            setFormDescription(data.formDescription);
            console.log(data);
            setIsEditable(data.editable);
        }
    }, []);

    console.log(questions);
    console.log((typeof isEditable) + " view");

    const preview = "NOTPREVIEW";
    return (
        <ResponseFormContainerDuplicate title={formTitle} description={formDescription} calledBy={preview} history={props.history} questions={questions} isEditable={isEditable} isEdit={false} />
        // <h5>hello</h5>
    );

}
export default ViewFormContainer;