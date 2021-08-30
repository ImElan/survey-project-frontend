import NameForm from '../CreateFormComponents/NameForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import DescComponentt from '../../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../../components/ResponseSurveyComponents/CheckBoxComponentt';
import StarComponent from '../../components/ResponseSurveyComponents/StarComponent';
import ResponseFormContainerDuplicate from '../../containers/ResponseFormContainerDuplicate';


function EditResponse(props) {
    const { userId, formId } = useParams();
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [sendCopy, setSendCopy] = useState(0);
    useEffect(() => {
        console.log();
        getData();
        async function getData() {
            const result = await fetch(`http://localhost:8080/response/${formId}/${userId}`)
                .then(data => data);
            const response = await result.json();
            console.log(response)
            const result2 = await fetch(`http://localhost:8080/api/form/${formId}`)
                .then(data => data)
            const form = await result2.json();
            console.log(form);
            console.log(response.answers);
            setAnswers(response.answers);
            setSendCopy(response.sendCopy);
            setQuestions(form.surveyQuestions);
        }
    }, []);


    return (

        <ResponseFormContainerDuplicate questions={questions} answers={answers} title={props.title} sendCopy={sendCopy} isEditable={true} isEdit={true} history={props.history} ></ResponseFormContainerDuplicate>
    );

}
export default EditResponse;