import React, { Component } from 'react';
// import { useEffect, useReducer, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import  Header  from '../components/AdminAcessComponents/Header';
import Footer from '../components/AdminAcessComponents/Footer'
import MainComponent from '../components/AdminAcessComponents/MainComponent';

function AdminAcessContainer(props){

    return(
        <div>
            <Header/>
            <div style={{margin:100}}>
                <MainComponent/>
            </div>
            <Footer/>
        </div>
    )





}

export default AdminAcessContainer;