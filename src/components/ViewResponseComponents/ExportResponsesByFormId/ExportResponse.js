import React, { useState, useEffect } from 'react';
import ReactExport from 'react-data-export';
import { Row, Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { getResponsesByFormId } from "./data/responseData";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const ExportResponse = (props) => {
    const idToken = localStorage.getItem('accessToken');

    const { formId } = props;
    let fname = 'Form-' + formId + '_Responses';

    useEffect(() => {
        // await loadData();
    }, []);
    const [exData, setExData] = useState([]);
    const [dataset, setDataset] = useState([]);
    let exportData = [];
    let DataSet = [
        {
            columns: [],
            data: []
        }
    ];


    const loadData = async () => {
        let resp = [];
        let question = [];

        // let data = await getResponsesByFormId(formId);
        let data = await fetch(`http://localhost:8080/response/${formId}`, {
            headers: {
                "Authorization": `Bearer ${idToken}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(data => data.json())
        console.log(data);

        data[0].questions.forEach(function (ques) {
            question.push(ques);
        });

        resp = data;

        resp.forEach(function (user) {
            let userObj = {};
            userObj.userId = user.userId;

            question.forEach(function (ques, index) {
                userObj[ques] = user.answers[index];
            });

            exportData.push(userObj);
            console.log(exportData);

        });
        //console.log(exportData);


        let cols = Object.keys(exportData[0]);

        exportData.forEach(function (user, index) {
            let rowArr = [];
            let val = Object.values(user);

            val.forEach(function (cell) {
                let cellObj = { value: cell, style: { font: { sz: "12", bold: false } } };
                rowArr.push(cellObj);
            });

            DataSet[0].data.push(rowArr);
        });
        cols.forEach(function (col) {
            let colObj = { title: col, style: { font: { sz: "14", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "D3D3D3" } } }, width: { wch: 60 } };
            DataSet[0].columns.push(colObj);
        });

    }

    // console.log(dataset);
    const exportExcel = async () => {
        await loadData();
        setExData(a => [...exportData]);
        setDataset(DataSet);
        console.log(dataset);
        console.log(exData);
    }
    function exportPdf() {

        let rows = [];
        console.log(exportData);
        let cols = Object.keys(exportData[0]);
        //console.log(cols);

        exportData.forEach(function (user, index) {
            let val = Object.values(user);
            rows.push(val);
        });
        console.log(exportData);

        //console.log(rows);
        const doc = new jsPDF();
        doc.autoTable(cols, rows, { startY: 20 });
        doc.save(`${fname}.pdf`);
    }

    console.log(DataSet);
    return (
        <Container>
            {console.log(DataSet)}
            <Row className='justify-content-md-center'>
                <Col md={2}>

                    <DropdownButton id="export-type" title="Export Data" variant="success"
                        style={{ borderRadius: '4px', margin: '3px' }}>

                        <Dropdown.Item onClick={exportPdf}>PDF</Dropdown.Item>
                        <ExcelFile filename={fname} element={<Dropdown.Item onClick={exportExcel} >Excel</Dropdown.Item>}>
                            <ExcelSheet dataSet={DataSet} name="Survey Responses" />
                        </ExcelFile>

                    </DropdownButton>

                </Col>
            </Row>
        </Container>
    );
}

export default ExportResponse;