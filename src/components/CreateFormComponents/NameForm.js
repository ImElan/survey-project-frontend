import React, { Component,useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, InputGroup, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function NameForm (props){
  const [show1, formtit] = useState(false);
  const [show2, formdesc] = useState(false);
  const showtext1=()=>{
    formtit(true);
  };
  const showtext2=()=>{
    formdesc(true);
  };
  const handleChange1=(event)=> {
    var x=event.target.value;
    if(x.length>((event.maxLength||0)+5))
    showtext1();
    else
    props.titleChangeHandler(event.target.vaue);
  };

    const handleChange2=(event)=> {
      var x=event.target.value;
      if(x.length>((event.maxLength||0)+5))
      showtext2();
      else
     props.descriptionChangeHandler(event.target.value);
   };

    return (
      <div>
      <br/>
    <InputGroup className="mb-3">
    <Form.Label style={{border: "1px solid #FF00FF", width: "150px", background: "#FFE8EF", padding: "3px", display: "flex"}}>Form Name</Form.Label>
    <FormControl style={{display: "flex"}}aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Enter form name" maxLength="80"  value={props.description} onChange={handleChange1}/>
      {show1 && <Form.Text id="passwordHelpBlock" muted>Form title cannot exceed 5 characters</Form.Text>}
    </InputGroup>
    <InputGroup classname="mb-3">
    <Form.Label style={{border: "1px solid #FF00FF", width: "150px", background: "#FFE8EF", padding: "3px"}}>Form Description</Form.Label>
    <FormControl  as="textarea" aria-label="With textarea" placeholder="Enter form description" maxLength="250" value={props.description} onChange={handleChange2} />
     {show2 && <Form.Text id="passwordHelpBlock" muted>Form description cannot exceed 5 characters</Form.Text>}
  </InputGroup>
      </div>
    );
  }
export default NameForm;
