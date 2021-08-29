import React,{useState} from 'react';
import CreateFormContainer from '../../containers/CreateFormContainer';
import NameForm  from '../CreateFormComponents/NameForm';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUnderline } from 'react-icons/fa';

function Header(props) {

    let anchor;
    if (props.isEditable === 'true') {
        anchor = <a style = {{textDecoration: "underline",cursor: "pointer",color: "blue"}} 
                onClick = {()=>{props.history.push('Edit_Form_route')}}>Edit your response</a>
    }
    return (

        <div style = {{
            height: '100%',
            backgroundColor : 'rgb(246 235 254)',
            position : 'absolute',
            width : '100%',
            top : '0',
            left : '0'
        }}>
        <Container fluid>
            <Row
                className='justify-content-md-center'
            >
                <Col xs={12} sm={6}>
                <div style = {
            {
                width: '100%',
                border: '1px',
                boxShadow : '0px 0px 2px 2px #cfd1e3',
                borderRadius: '15px',
                margin: '15px auto auto auto',
                backgroundColor: 'white'
            }
        }
        >
            <div style = {
                {
                    height : '10px',
                    backgroundColor: '#4B0082',
                    borderRadius : '15px 15px 0px 0px'
                    }
            }>
            </div>
            <div style = {
                {
                    padding : '33px 24px 24px 24px'
                }
            }>
                <h3>{props.title}</h3>
                <p>Your response has been recorded!</p>
                <div>
                    {anchor}
                </div>
            </div>
        </div>
                </Col>
            </Row>
        </Container>
    </div>












        
    )
}
export default Header;