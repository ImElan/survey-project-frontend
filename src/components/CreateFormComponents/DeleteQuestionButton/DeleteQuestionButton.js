import React from 'react';
// import { CloseButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillTrashFill } from "react-icons/bs";

function DeleteQuestionButton(props) {
    const handleClick = ()=>{
        props.deleteQuestionHandler(props.questionId);
    }
    return (
        <div>
            <BsFillTrashFill onClick={handleClick}/>
            <span style={{marginTop: "0.25rem",marginLeft: "0.65rem", fontFamily: "Monospace" }}>
                Remove
            </span>
        </div>
    )
}

export default DeleteQuestionButton
