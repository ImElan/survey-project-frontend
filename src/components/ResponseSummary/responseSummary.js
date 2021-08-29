import React from 'react';
import CenteredTabs from './centeredTabs';
import { useState, useEffect } from 'react';
import responseservice from './services/responseservice';
const ResponseSummary = ({ formId }) => {
    const [display, setdisplay] = useState("");
    const change = (newVal) => {
        if (newVal == 1) {
            setdisplay("response");
        }
        else if (newVal == 0) {
            setdisplay("summary");
        }
    }
    const [responses, setResponses] = useState([]);
    useEffect(() => {

        responseservice.doGetById(formId).then(response => response.json())
            .then(data => {
                setResponses(data);
                console.log(responses);
            })
    })
    return (
        <div>
            <CenteredTabs change={change}></CenteredTabs>
            {/* {display==""?<div/>:(display=="response"?<Summary responses={responses} ></Summary>:<Response responses={responses}></Response>)} */}
        </div>
    )
}
export default ResponseSummary;