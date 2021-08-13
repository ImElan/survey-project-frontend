// import { DropdownButton} from 'react-bootstrap';
import React,{useState} from 'react'
import { Dropdown, DropdownButton,  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown } from 'bootstrap';


function DropdownMenu(props) {
    // const [props, setProps] = useState({questionType: "SINGLE"});
    const options = {
        "SINGLE": "Single Choice",
        "MULTIPLE": "Multiple Choice",
        "DESCRIPTIVE": "Descriptive",
        "STAR": "Star Based"
    }
    
    const onSelect = (e)=>{
        // console.log(e);
        // setProps({questionType: e});
        props.questionTypeChangeHandler(props.questionId, e);
    }
    return (
        <div >
            <DropdownButton onSelect={onSelect} variant="light" title={options[props.questionType]}>
            {
                Object.keys(options).map((key, id)=>(
                    <Dropdown.Item key={id} eventKey={key}>{options[key]}</Dropdown.Item>
                ))
            }
            </DropdownButton>
        </div>
    )
}

export default DropdownMenu
