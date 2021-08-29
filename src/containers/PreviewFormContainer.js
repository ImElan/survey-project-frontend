import FormHeader from '../components/CreateFormComponents/NameForm';
import React, { useEffect, useState } from 'react';
import ResponseFormContainer from './ResponseFormContainer';
import 'react-datepicker/dist/react-datepicker.css';


function PreviewFormContainer(props) {
    const formstate = JSON.parse(window.localStorage.getItem('formstate'));
    const preview = "PREVIEW";
    return (
        <>
            <ResponseFormContainer calledBy={preview} questions={formstate.questions} />
        </>
    );

}
export default PreviewFormContainer;