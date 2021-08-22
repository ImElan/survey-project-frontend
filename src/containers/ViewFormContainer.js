import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';

function ViewFormContainer(props) {
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        console.log("here");
        getData();
        async function getData() {
            const response = await fetch("http://localhost:8080/api/form/1");
            const data = await response.json();
            const q = data.surveyQuestions;
            console.log(q);
            setQuestions(q);
        }
    }, []);

    console.log(questions);

    const preview = "NOTPREVIEW";
    return (
        <ResponseFormContainer calledBy={preview} questions={questions}/>
        // <h5>hello</h5>
    );

}
export default ViewFormContainer;