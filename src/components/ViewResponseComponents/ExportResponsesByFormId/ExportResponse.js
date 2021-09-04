import React, { useState, useEffect } from 'react';
// import ReactExport from 'react-data-export';
import { Row, Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { getResponsesByFormId } from './data/responseData';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ExportResponse = (props) => {
	const { formId } = props;
	let fname = 'Form-' + formId + '_Responses';
	const [exportData, setExportData] = useState([]);
	const [render, setRender] = useState(true);
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';

	useEffect(async () => {
		await loadData();
	}, []);
	console.log('rendered');
	// let exportData = [];
	// let DataSet = [
	//     {
	//         columns: [],
	//         data: []
	//     }
	// ];
	const [DataSet, setDataSet] = useState([]);

	async function loadData() {
		let resp = [];
		let question = [];

		let data = await getResponsesByFormId(formId);
		console.log(data);

		if (data.length === 0) {
			return;
		}

		data[0].questions.forEach(function (ques) {
			question.push(ques);
		});

		resp = data;
		const newExportData = [...exportData];

		resp.forEach(function (user) {
			let userObj = {};
			userObj.userId = user.userId;

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
		const doc = new jsPDF();
		doc.autoTable(cols, rows, { startY: 20 });
		doc.save(`${fname}.pdf`);
	}

	const exportExcel = (csvData, fileName) => {
		const ws = XLSX.utils.json_to_sheet(csvData);

		ws['!cols'] = [];
		Object.keys(csvData[0]).forEach((cell) => {
			ws['!cols'].push({
				wch: 80,
			});
		});

		var range = XLSX.utils.decode_range(ws['!ref']);
		console.log(range);
		for (var C = range.s.r; C <= range.e.r; ++C) {
			var address = XLSX.utils.encode_col(C) + '1';
			if (!ws[address]) continue;
			ws[address].v = ws[address].v.toUpperCase();
		}
		console.log(ws);

		const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
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
