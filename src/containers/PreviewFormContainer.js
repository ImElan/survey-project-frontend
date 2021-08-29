import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';
function PreviewFormContainer(props) {
    const formstate = JSON.parse(window.localStorage.getItem('formstate'));
    const preview = "PREVIEW";
    return (
        <ResponseFormContainer title={formstate.title} description={formstate.description} calledBy={preview} questions={formstate.questions} >
            console.log(formstate);

        </ResponseFormContainer>
    );

}
export default PreviewFormContainer;