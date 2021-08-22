import React, { useEffect, useReducer, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PreviewModal from './PreviewModal';
import 'tachyons';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from 'react-router-dom'
//import { createFormReducer } from '../../containers/reducers/createFormReducer';



function Preview(props)
{
  // var PopUpQues=[];
  // var PopUpQuesType=[];
   //const {formState, formTitle, formDescription, questionList, saveFormHandler } = props;
   const [show, setShow] = React.useState({
   title: '',
   description:'',
   questions: [],
 });
//const [show,setShow]=useState('');
useEffect(()=>{
  show.title=props.formTitle;
  show.description=props.formDescription;
  show.questions=props.questionList;
  window.localStorage.setItem('formstate',JSON.stringify(show));
});
const [view,showview]=useState(true);
  // const handleClose = () => {
  //   setShow(false);
  // };
  // console.log(questionList);
  // const handleShow = () => {
  //   // questionList.forEach(function (question) {
  //   //   if (question.isValid === true) {
  //   //     PopUpQues.push(`Question: ${question.question}`);
  //   //     PopUpQuesType.push(`Question Type: ${question.questionType}`);
  //   //   }
  //   //   console.log(PopUpQueprops.formState  //   // });
  //   setShow(true);
  // };
  // let PopUpTitle=`Title: ${formTitle}`;
  // let PopUpDesc=`Description: ${formDescription}`;
  const handleclick=()=>{
  //  setShow(formTitle);
  //  console.log(formTitle);
  //  console.log(formDescription);
  //  console.log(questionList);
  //  console.log(show);
    showview(false);
  };
  return(
    <div>
    {view&&
       <Link to="/preview" target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={handleclick} >Preview Form</Link>
}
    </div>
  )
}
export default Preview;
