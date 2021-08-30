import React, { useState } from 'react';
import CreateFormContainer from '../../containers/CreateFormContainer';
import NameForm from '../CreateFormComponents/NameForm';

function Header(props) {

    // let url = ''; 
    // let anchor ;
    // if (props.isEditable === 'true') {
    //     anchor = <a href = {url}>Edit your response</a>
    // }

    let anchor;
    if (props.isEditable === 'true') {
        anchor = <a style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}
            onClick={() => { props.history.push(`/editresponse/:${props.formId}/:${props.userId}`) }}>Edit your response</a>
    }
    return (
        <div style={
            {
                width: '100%',
                border: '1px',
                boxShadow: '0px 0px 2px 2px #cfd1e3',
                borderRadius: '15px',
                margin: '15px auto auto auto',
                backgroundColor: 'white'
            }
        }
        >
            <div style={
                {
                    height: '10px',
                    backgroundColor: '#4B0082',
                    borderRadius: '15px 15px 0px 0px'
                }
            }>
            </div>
            <div style={
                {
                    padding: '33px 24px 24px 24px'
                }
            }>
                <h3>{props.title}</h3>
                <p>Your response has been recorded!</p>
                <div>
                    {anchor}
                </div>
            </div>
        </div>
    )
}
export default Header;