import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, InputGroup, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function NameForm (props){

  const handleChange1=(event)=> {
    props.titleChangeHandler(event.target.value)
  }

  const handleChange2=(event)=> {
     props.descriptionChangeHandler(event.target.value);
    }

   return (
       <div>
          <FormControl 
              aria-label="Default" 
              aria-describedby="inputGroup-sizing-default" 
              placeholder="Enter form name" 
              maxLength="40" 
              value={props.title} 
              onChange={handleChange1}
          />
          <Form.Text id='passwordHelpBlock' muted style={{ display: 'block' }}> 
              Form title cannot exceed 40 characters
          </Form.Text>
          <FormControl 
              as="textarea" 
              aria-label="With textarea" 
              placeholder="Enter form description" 
              maxLength="100" 
              value={props.description} 
              onChange={handleChange2} 
          />
          <Form.Text id='passwordHelpBlock' muted style={{ display: 'block' }}> 
              Form description cannot exceed 100 characters
          </Form.Text>
      </div>
    );
  }
export default NameForm;
