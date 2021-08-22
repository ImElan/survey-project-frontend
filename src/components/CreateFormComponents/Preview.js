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




function Preview(props)
{

   const [show, setShow] = React.useState({
   title: '',
   description:'',
   questions: [],
 });

useEffect(()=>{
  show.title=props.formTitle;
  show.description=props.formDescription;
  show.questions=props.questionList;
  window.localStorage.setItem('formstate',JSON.stringify(show));
});
const [view,showview]=useState(true);
 
  const handleclick=()=>{
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
