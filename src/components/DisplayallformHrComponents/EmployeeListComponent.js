import React, { Component, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { useTable, useRowSelect } from 'react-table';
import axios from 'axios';
//import SendEmailComponent from '../components/SendEmailComponents/SendEmailComponent';

// import $ from 'jquery';

// var $table = $('table'),
// 	$bodyCells = $table.find('tbody tr:first').children(),
// 	colWidth,
// 	$headerCells = $table.find('thead tr:first').children();
// // Get the tbody columns width array
// colWidth = $bodyCells
// 	.map(function () {
// 		return $(this).width();
// 	})
// 	.get();

// // Set the width of thead columns
// $table
// 	.find('thead tr')
// 	.children()
// 	.each(function (i, v) {
// 		$(v).width(colWidth[i]);
// 	});

// var headerWidth = $headerCells
// 	.map(function () {
// 		return $(this).width();
// 	})
// 	.get();

// $table
// 	.find('tbody tr')
// 	.children()
// 	.each(function (i, v) {
// 		$(v).width(headerWidth[i]);
// 	});

const Styles = styled.div`
	padding: 1rem;
	table {
		border-spacing: 0;
		border: 1px solid black;
		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}
		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			border-right: 1px solid black;
			:last-child {
				border-right: 0;
			}
		}
	}
`;

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<input type='checkbox' ref={resolvedRef} {...rest} />
		</>
	);
});

function Table({ columns, data, handleModalClose, handleAlertState }) {
	const [loading, setIsLoading] = useState(false);

	const setLoadingState = (value) => {
		setIsLoading(value);
	};

	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		state: { selectedRowIds },
	} = useTable(
		{
			columns,
			data,
		},
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				// Let's make a column for selection
				{
					id: 'selection',
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
		}
	);

	// Render the UI for your table
	return (
		<>
			{loading && (
				<div className='d-flex justify-content-center my-3'>
					<h4 style={{ marginRight: '15px' }}>Sending mail. Please wait...</h4>
					<Spinner animation='border' variant='primary' />
				</div>
			)}
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original["Email Mail ID"]
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
			<br></br>
			<input
				className='btn btn-primary'
				type='button'
				value='Send Mail'
				onClick={() => {
					console.log('send formbutton clicked');
					// sendemail(selectedFlatRows.map(
					//     d => d.original["Email Mail ID"]
					// ));
					sendemail(
						selectedFlatRows.map((d) => d.original['Email Mail ID']),
						handleModalClose,
						setLoadingState,
						handleAlertState
					);
				}}
			/>
		</>
	);
}

// const sendmail = (emailList) => {

// }
async function sendemail(data, handleModalClose, setLoadingState, handleAlertState) {
	console.log(data);
	const idToken = localStorage.getItem('accessToken');

	try {
		setLoadingState(true);
		const response = await axios.post(
			'http://localhost:8080/accolite/send_email',
			{ tomailid: data },
			{
				headers: {
					Authorization: `Bearer ${idToken}`,
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		);
		setLoadingState(false);
		handleModalClose();
		handleAlertState('SUCCESS');
		console.log(response);
	} catch (error) {
		setLoadingState(false);
		handleAlertState('FAILED');
		console.log(error.response);
	}
}

function EmployeeListComponent(props) {
	const [employees, setEmployees] = useState([]);
	const columns = React.useMemo(
		() => [
			{
				Header: 'Employeee Code',
				accessor: 'Employee Code',
			},
			{
				Header: 'Full Name',
				accessor: 'Employee Name',
			},

			{
				Header: 'Email Id',
				accessor: 'Email Mail ID',
			},
			{
				Header: 'Date of Joining',
				accessor: 'Employee DOJ',
			},
		],

		[]
	);

	const emp = async () => {
		const idToken = localStorage.getItem('accessToken');

		const response = await fetch('http://localhost:8080/accolite/filter_employees', {
			headers: {
				Authorization: `Bearer ${idToken}`,
				'Content-type': 'application/json; charset=UTF-8',
			},
			method: 'POST',
			body: JSON.stringify({
				formid: props.formId, //props.formid
				from_date: props.from_date,
				to_date: props.to_date,
				no_of_days_after_mail: props.no_of_days_after_mail,
			}),
		});
		console.log('here in response');
		console.log(response);
		const dataemp = await response.json();
		setEmployees(dataemp);

		const employees2 = [
			{
				'Employee Name': 'Bhagyashree Kiran Vaidya',
				'Employee DOJ': '13/01/2021',
				'Employee Code': 'CNT0434',
				'Email Mail ID': 'bhagyashree.vaidya@accolitedigital.com',
			},
		];

		console.log(employees);
	};
	useEffect(() => {
		emp();
	}, []);

	return (
		<Styles>
			<Table
				columns={columns}
				data={employees}
				handleModalClose={props.handleModalClose}
				handleAlertState={props.handleAlertState}
			/>
		</Styles>
	);
}

export default EmployeeListComponent;
