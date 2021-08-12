import React from 'react';
import { CloseButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeleteQuestionButton(props) {
    const handleClick = ()=>{
        props.deleteQuestionHandler(props.questionId);
    }
    return (
        <div>
            <CloseButton onClick={handleClick}/>
        </div>
    )
}

export default DeleteQuestionButton
