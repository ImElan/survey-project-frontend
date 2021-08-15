// import { DropdownButton} from 'react-bootstrap';
<<<<<<< HEAD
import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
=======
import React,{useState} from 'react'
import { Dropdown, DropdownButton,  } from 'react-bootstrap';
import PopUp from "../PopUpModal";
>>>>>>> feature/Dropdown
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown } from 'bootstrap';

function DropdownMenu(props) {
<<<<<<< HEAD
	// const [props, setProps] = useState({questionType: "SINGLE"});
	const options = {
		SINGLE: 'Single Choice',
		MULTIPLE: 'Multiple Choice',
		DESCRIPTIVE: 'Descriptive',
		STAR: 'Star Based',
	};

	const onSelect = (e) => {
		// console.log(e);
		// setProps({questionType: e});
		props.questionTypeChangeHandler(props.questionId, e);
	};
	return (
		<div>
			<DropdownButton
				onSelect={onSelect}
				variant='light'
				title={options[props.questionType]}
			>
				{Object.keys(options).map((key, id) => (
					<Dropdown.Item key={id} eventKey={key}>
						{options[key]}
					</Dropdown.Item>
				))}
			</DropdownButton>
		</div>
	);
=======
    // const [props, setProps] = useState({questionType: "SINGLE"});
    const options = {
        "SINGLE": "Single Choice",
        "MULTIPLE": "Multiple Choice",
        "DESCRIPTIVE": "Descriptive",
        "STAR": "Star Based"
    }

    const [state, setState] = useState({popUp: false, questionType: props.questionType});

    const popUpClose = ()=>setState({...state, popUp: false});
    let popUpTitle = "Confirm Message";
    let initialBody = "Do you want to change the question type from ";
    const [popUpBody, setPopUpBody] = useState("");

    const confirmHandler = ()=>{
        setState({...state, popUp:false});
        props.questionTypeChangeHandler(props.questionId, state.questionType);
        // setProps({questionType: state.questionType});
    }

    const onSelect = (e)=>{
        if(e !== props.questionType){
            setPopUpBody(initialBody + options[props.questionType] + " to " + options[e]+"?");
            setState({popUp: true, questionType: e});
        }
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
            <PopUp show={state.popUp} popUpClose={popUpClose} popUpTitle={popUpTitle}
                    confirmHandler={confirmHandler} popUpBody={popUpBody}
            />
        </div>
    )
>>>>>>> feature/Dropdown
}

export default DropdownMenu;
