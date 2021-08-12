import { useState } from "react";
import React from "react";
import { FaStar } from "react-icons/fa";
// import { makeStyles } from '@material-ui/core/styles';
import { Form } from "react-bootstrap";
// import { TextField } from "@material-ui/core";

const colors = {
    purple: "#4854b4",
    grey: "#a9a9a9"
    
};




function StarComponent(props) {


  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
  
  const [initial,final] = useState('');

  // Display the question
  
  const printQuestion = () => {
    return `The Question is ${initial}`
  }
  const handleChange = (e) => {
    final(e.target.value);
    props.questionTextChangeHandler(props.questionID,e.target.value);

  }

  return (
   
      <div style={styles.container}>
        <form>
        {/* <TextField id="outlined-basic" label="Question" multiline={false}  onChange={handleChange} InputProps={{style:{width:'43ch'}}} /><br></br><br></br> */}
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label></Form.Label>
        <Form.Control  style={{ height: 35 }} size="lg" type="text" onChange={handleChange} title = {props.question} placeholder="Question"value={initial}/>
        {/* <div>{printQuestion(initial)}</div> */}
        <br />
        <br />
        </Form.Group>
        </Form>
        </form>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={25}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.purple : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>

      {/* Display the Rating */}

      {/* <p>Your Rating Is : {hoverValue || currentValue}</p> */}

      {/* currentValue holds the RATING FINAL VALUE */}

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


export default StarComponent;
