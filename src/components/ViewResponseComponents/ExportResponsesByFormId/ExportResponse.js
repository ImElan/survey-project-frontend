import React, { useState, useEffect } from 'react';
// import ReactExport from 'react-data-export';
import { Row, Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { getResponsesByFormId } from './data/responseData';
import { getUserById } from './data/userData';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { BsConeStriped } from 'react-icons/bs';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ExportResponse = (props) => {

	const { formId, formTitle } = props;
	let fname = 'Form-' + formId + '_Responses';
	//const [userData, setUserData] = useState(null);
	const [exportData, setExportData] = useState([]);
	const [render, setRender] = useState(true);
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';
	
	const [DataSet, setDataSet] = useState([]);

	// useEffect(async () => {
	// 	await loadData();
	// }, []);

	useEffect(() => {
		loadData();
        
		async function loadData() {
			let resp = [];
			let question = [];
	
			let data = await getResponsesByFormId(formId);
			console.log(data);
	
			// let userData = await getUserById();
			// console.log(userData);
			console.log(data[0]);
			//console.log(data[0].questions);
			data[0].questions.forEach(function(ques){
				question.push(ques);
			});
	
			resp = data;
			const newExportData = [...exportData];
	
			resp.forEach(async function(user) {
				let userObj = {};
				console.log(user.userId);
				
				let userData = await getUserById(user.userId);
				console.log(userData);
				// let userD = getUserById(user.userId).then( res => {
				// setUserData(userD);
				// console.log(userData);
				userObj.Email_ID = userData.email;
				userObj.Name = userData.name;
				// })	
				// let userData = getUserById(user.userId);
				
				//userObj.user_email = user.userId;
	
				question.forEach(function (ques, index) {
					userObj[ques] = user.answers[index];
				});
				newExportData.push(userObj);
				// exportData.push(userObj);
				// console.log(exportData);
			});
			setExportData(newExportData);
			console.log(exportData);
		}
		if (exportData.length > 0 && render) {
			let cols = Object.keys(exportData[0]);
			console.log(cols);
			let rowArr = [];
			exportData.forEach(function (user, index) {
				let val = Object.values(user);
	
				val.forEach(function (cell) {
					let cellObj = { value: cell, style: { font: { sz: '12', bold: false } } };
					rowArr.push(cellObj);
				});
				// const newDataSet = {
				//     ...DataSet,
				//     data: newData
				// }
				// console.log(newDataSet)
				// setDataSet(newDataSet);
	
				// DataSet[0].data.push(rowArr);
			});
			let colsArr = [];
			cols.forEach(function (col) {
				let colObj = {
					title: col,
					style: {
						font: { sz: '14', bold: true },
						fill: { patternType: 'solid', fgColor: { rgb: 'D3D3D3' } },
					},
					width: { wch: 60 },
				};
				colsArr.push(colObj);
	
				// DataSet[0].columns.push(colObj);
			});
			const newData = [...rowArr];
			const newColumns = [...colsArr];
			const newDataSet1 = {
				data: newData,
				columns: newColumns,
			};
			console.log(newDataSet1);
			setRender(false);
			setDataSet([newDataSet1]);
		}

	},[])
	console.log('rendered');
	// let exportData = [];
	// let DataSet = [
	//     {
	//         columns: [],
	//         data: []
	//     }
	// ];
	

	

	function exportPdf() {
		let rows = [];
		console.log(exportData);
		let cols = Object.keys(exportData[0]);
		//console.log(cols);

		exportData.forEach(function (user, index) {
			let val = Object.values(user);
			rows.push(val);
		});

		//console.log(rows);
		const doc = new jsPDF("p","px","a4");
	    const heading = "Responses - " + "Employee Survey";
		var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
		doc.text(heading, pageWidth / 2, 20 , {align: 'center'});
  		doc.setFont('arial');
		doc.autoTable(cols, rows, {styles: {fontSize: 7}});
		doc.save(`${fname}.pdf`);
	}

	const exportExcel = (csvData, fileName) => {
		const heading = "Responses - " + "Employee Survey";
		const ws = XLSX.utils.json_to_sheet(csvData, {origin: "A2"});
		
		ws['!cols'] = [];
		Object.keys(csvData[0]).forEach((cell,idx) => {
			if(idx > 1){
				ws['!cols'].push({
					wch: 70
				});
			}
			else{
				ws['!cols'].push({
					wch: 35
				});
			}
			   	
		});

		const wb = { Sheets: { Response_data : ws }, SheetNames: ['Response_data'] };
		XLSX.utils.sheet_add_json(wb.Sheets.Response_data,
			[],
			{
			  header: [heading],
			  origin: "A1"
			}
		  );
		
	    var range = XLSX.utils.decode_range(ws['!ref']);
		
		for(var R = range.s.r; R <= 1; ++R){
			for (var C = range.s.c; C <= range.e.c; ++C) {
				
				var address = XLSX.utils.encode_col(C) + `${R+1}`;
				if (!ws[address]) continue;
				ws[address].v = ws[address].v.toUpperCase();
			}
		}
		const excelBuffer = XLSX.write(
			wb,
			{ bookType: 'xlsx', type: 'array' },
			{ cellStyles: true }
		);

		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col md={2}>
					<DropdownButton
						id='export-type'
						title='Export Data'
						variant='success'
						style={{ borderRadius: '4px', margin: '3px' }}
					>
						<Dropdown.Item onClick={exportPdf}>PDF</Dropdown.Item>
						<Dropdown.Item onClick={(e) => exportExcel(exportData, fname)}>
							Excel
						</Dropdown.Item>
						{/* <ExcelFile filename={fname} element={<Dropdown.Item>Excel</Dropdown.Item>}>
                        <ExcelSheet dataSet={DataSet} name="Survey Responses" />
                        </ExcelFile> */}
					</DropdownButton>
				</Col>
			</Row>
		</Container>
	);
};

export default ExportResponse;
