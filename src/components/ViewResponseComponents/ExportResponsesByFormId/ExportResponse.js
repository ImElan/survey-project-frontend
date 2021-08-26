import React, { useState, useEffect } from 'react';
import ReactExport from 'react-data-export';
import {Row, Col, Container, Button} from 'react-bootstrap';
import { getResponsesByFormId } from "./data/responseData";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const ExportResponse = (props) => {
    
    const {formId} = props;
    let fname = 'Form-' + formId +'_Responses';

    useEffect(() => {
        getData();
    }, []);

    
    const DataSet = [
        {
            columns:[ ],

            data:[ ]
        }
    ];
    
    async function getData(){

        let resp = [];
        let question = [];
        let exportData = [];
        
        let data = await getResponsesByFormId(formId);
        console.log(data);

        data[0].questions.forEach(function(ques){
            question.push(ques);
        });

        resp = data;
        

         resp.forEach(function(user){
             let userObj = {};
             userObj.userId = user.userId;
             
             question.forEach(function(ques, index){
                 userObj[ques] = user.answers[index];
             });

             exportData.push(userObj);
         });

         //console.log(exportData);

         let cols = Object.keys(exportData[0]);

         exportData.forEach(function(user,index){
             let rowArr = [];
             let val = Object.values(user);

             val.forEach(function(cell){
                let cellObj = {value: cell , style: {font: {sz: "12", bold: false}}};
                rowArr.push(cellObj);
             });
 
             DataSet[0].data.push(rowArr);

         });

         cols.forEach(function(col){
            let colObj = {title: col, style: {font: {sz: "14", bold: true}, fill: {patternType: "solid", fgColor: {rgb: "D3D3D3"}}}, width: {wch: 60}};
            DataSet[0].columns.push(colObj);
        });
    }

        
    return(
        <Container>
            <Row className='justify-content-md-center'>
            <Col md={2}>
            
                         <ExcelFile 
                                filename={fname}
                                element={<Button variant="success" style={{borderRadius:'4px', margin:'3px'}}>Export Data</Button>}>
                                <ExcelSheet dataSet={DataSet} name="Survey Responses"/>                         
                         </ExcelFile>
                 
            </Col>
            </Row>
        </Container>
    );
}

export default ExportResponse;
