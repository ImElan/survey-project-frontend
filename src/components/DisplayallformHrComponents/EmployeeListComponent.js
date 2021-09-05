import React, { Component, useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useTable, useRowSelect } from 'react-table';
import axios from 'axios';

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

	const [error, setError] = useState(false);


	const setLoadingState = (value) => {
		setIsLoading(value);
	};

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

	return (
		<>

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
			<br></br>
			<Button
				className='btn btn-primary'
				type='submit'
				value='Send Mail'
				onClick={(event) => {
					event.preventDefault();
					console.log('send formbutton clicked');
					sendemail(
						selectedFlatRows.map((d) => d.original['Email Mail ID']),
						setLoadingState,
						setError
					);
				}}
			>
				Send Mail {' '}
				{loading && (
					<Spinner animation='border' variant='light' size="sm" />
				)}
	
			</Button>
			{error && (
					<p className="text-danger">Something went wrong</p>
				)}
		</>
	);
}

async function sendemail(data, setLoadingState, setError) {
	console.log(data);
	const idToken = localStorage.getItem('accessToken');

	try {
		setLoadingState(true);
		setError(false);
		const response = await axios.post(
			'http://localhost:8080/accolite/send_email_with_no_of_days',
			{ tomailid: data },
			{
				headers: {
					Authorization: `Bearer ${idToken}`,
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		);
		setLoadingState(false);
		console.log(response);
	} catch (error) {
		setLoadingState(false);
		setError(true);
		console.log(error.response);
	}
}

function EmployeeListComponent(props) {
	console.log(props);
	const columns = React.useMemo(
		() => [
			{
				Header: 'Employee Code',
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
			{
				Header: 'BU',
				accessor: 'Employee BU'
			}
		],

		[]
	);

	return (
		<Styles>
			<Table
				columns={columns}
				data={props.employees}
			/>
		</Styles>
	);
}

export default EmployeeListComponent;