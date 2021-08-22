import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
function PreviewFormContainer(props)
{
  const [newstate, setnewstate] = useState();
  useEffect(()=>{
    const formstate =JSON.parse(window.localStorage.getItem('formstate'));
    setnewstate(formstate);
  },[]);
  return(
    <h1>TakeSurveyContainer state={newstate}</h1>
  );

}
export default PreviewFormContainer;
