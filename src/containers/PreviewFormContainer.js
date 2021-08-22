import FormHeader from '../components/CreateFormComponents/NameForm';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
function PreviewFormContainer(props)
{
  //const [newstate, setnewstate] = useState('');
   const [newstate, setnewstate] = React.useState({
   title: '',
   description:'',
   questions: [],
 });
  useEffect(()=>{
    const formstate =JSON.parse(window.localStorage.getItem('formstate'));
    console.log(typeof(formstate));
    newstate.title=formstate.title;
    newstate.description=formstate.description;
    newstate.questions=formstate.questions;
    //console.log(formstate);
    //setnewstate(formstate);
    //console.log('preview form loaded');
    //console.log(formstate.title);
    //console.log(formstate.description);
    //console.log(formstate.questions);
    //console.log(newstate.title);
    //console.log(newstate.description);
    //console.log(newstate.questions);
    console.log(newstate);
  },[]);

  return(
    <h1>TakeSurveyContainer</h1>
  );
  // return (
	// 	<Container fluid>
	// 		<Row
	// 			className='justify-content-md-center'
	// 			style={{
	// 				backgroundColor: '#4B0082', //4B0082
	// 				paddingTop: '0px',
	// 				paddingBottom: '35px',
	// 			}}
	// 		>
  //     <Col sm={6}>
  //       <input type="text" value="formname"/>
  //       <input type="text" value="formdescription"/>
  //     </Col>
  //   </Row>
  //   <Row className='justify-content-md-center'>
  //     <div
  //       style={{
  //         backgroundColor: '#D8D8D8',
  //         width: '75%',
  //         border: 'solid lightgray 2px',
  //         borderTop: '0px',
  //         borderRadius: '8px',
  //       }}
  //     >
  //       <Row
  //         sm='auto'
  //         className='justify-content-end'
  //         style={{
  //           padding: '12px',
  //         }}
  //       >
  //       </Row>
  //
  //
  //       <Row
  //         sm='auto'
  //         className='justify-content-end'
  //         style={{
  //           padding: '12px',
  //         }}
  //       >
  //       <Col sm={6}>
  //         <input type="text" value="formname"/>
  //         <input type="text" value="formdescription"/>
  //       </Col>
  //       </Row>
  //       <Row
  //         sm='auto'
  //         className='justify-content-end'
  //         style={{
  //           padding: '12px',
  //         }}
  //       >
  //       <Col sm={6}>
  //         <input type="text" value="formname"/>
  //         <input type="text" value="formdescription"/>
  //       </Col>
  //       </Row>
  //
  //   </div>
  //   </Row>
  //
  //     </Container>
  //   );
}
export default PreviewFormContainer;
