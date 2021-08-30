import NameForm from '../CreateFormComponents/NameForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import DescComponentt from '../../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../../components/ResponseSurveyComponents/CheckBoxComponentt';
import StarComponent from '../../components/ResponseSurveyComponents/StarComponent';
import ResponseFormContainer from '../../containers/ResponseFormContainer';


function EditResponse() {
    const { userId, formId } = useParams();
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
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

            setQuestions(form.surveyQuestions);
        }
    }, []);


    return (

        <ResponseFormContainer questions={questions} answers={answers}></ResponseFormContainer>
    );

}
export default EditResponse;