import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';
import FormResponses from '../components/FormResponses/FormResponses';
import ResponseFormContainerDuplicate from './ResponseFormContainerDuplicate';
function PreviewFormContainer(props) {
    const formstate = JSON.parse(window.localStorage.getItem('formstate'));
    const newQuestions = formstate.questions.map((question) => {
        let optionsArr = null;
        if (question.questionType === 'SINGLE' || question.questionType === 'MULTIPLE') {
            optionsArr = question.options.optionsArray.map((option) => option.option);
        }
        return {
            ...question,
            options: optionsArr
        }
    })
    const preview = "PREVIEW";
    return (
        <ResponseFormContainerDuplicate preview={true} title={formstate.title} description={formstate.description} calledBy={preview} questions={newQuestions} >
            console.log(formstate);

        </ResponseFormContainerDuplicate>
    )
}
export default PreviewFormContainer;