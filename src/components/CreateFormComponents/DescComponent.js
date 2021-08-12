import { useState } from "react";
import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import { Form} from "react-bootstrap";
// import { TextField } from "@material-ui/core";


function DescComponent(props) {


  
  const [initial,final] = useState('');
  const [initial2,final2] = useState('');
  const printQuestion = () => {
    return `The Question is ${initial}`
  }
  const printParagraph= () => {
    return `The Paragraph Content is ${initial2}`
  }
  const handleChange = (e) => {
    final(e.target.value);
    props.questionTextChangeHandler(props.questionID,e.target.value);

  }
  const handleChange2 = (e) => {
    final2(e.target.value);
  }

  

  return (
   
      <div style={styles.container}>
        <form>
        {/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label></Form.Label>
        <Form.Control  style={{ height: 35 }} size="lg" type="text" onChange={handleChange} title = {props.question} placeholder="Question" value={initial}/>
        {/* <div>{printQuestion(initial)}</div> */}
        <br />
        <br />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label></Form.Label>
        <Form.Control as="textarea" rows={7} onChange={handleChange2} value={initial2} />
        {/* <div>{printParagraph(initial2)}</div> */}
        </Form.Group>
        </Form>
        </form>
      
    </div>
  )
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  }
};


export default DescComponent;