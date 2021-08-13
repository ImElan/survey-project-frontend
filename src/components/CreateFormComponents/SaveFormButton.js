import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import PopUpModal from './PopUpModal';


function SaveFormButton(props) {
        
        const {formTitle, saveFormHandler} = props;

        const [show, popup] = useState(false);
        const [popUpTitle] = useState("");
        const [popUpBody] = useState(`Are you sure you want to save "${formTitle}" form?`);

        const popUpOpen = () => {
            popup(true);
        }
        const popUpClose = () => {
            popup(false);
        }
    
      return (     
            <div className= "text-center">
                <Button variant = "primary"
                        className = "bg-light-blue b--blue black f5 fw7 bw1 grow pointer"
                        onClick = {popUpOpen}> Save Form
                </Button>
                <PopUpModal show = {show} popUpClose = {popUpClose} popUpTitle = {popUpTitle} popUpBody = {popUpBody} confirmHandler = {saveFormHandler}/>
            </div>                 
        );
}
export default SaveFormButton;
