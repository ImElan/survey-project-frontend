import React, { Component, useEffect, useState } from 'react';

import styled from 'styled-components'
import { useTable, useRowSelect } from 'react-table'
// import SendEmailComponent from '../components/SendEmailComponents/SendEmailComponent';


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
`

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

function Table({ columns, data }) {
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
        hooks => {
            hooks.visibleColumns.push(columns => [
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
            ])
        }
    )

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.slice(0, 10).map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
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
            </pre>
            <input className="btn btn-primary" type="button" value="Send Mail" onClick={() => {
                console.log("send formbutton clicked");
                // sendemail(selectedFlatRows.map(
                //     d => d.original["Email Mail ID"]
                // ));
                sendemail(["bhargavi.sunkireddy@accolitedigital.com"]);


            }} />
        </>
    )
};

// const sendmail = (emailList) => {

// }
async function sendemail(data) {
    console.log(data);

    const response = await fetch('http://localhost:8080/accolite/send_email', {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        method: "POST",
        body: JSON.stringify({
            tomailid: data
        }),

    });
    console.log(response);
}

function EmployeeListComponent(props) {
    const [employees, setEmployees] = useState([]);
    const columns = React.useMemo(
        () => [
            {

                Header: 'Employee Code',
                accessor: 'Employee Code',
            },
            {
                Header: 'Full Name',
                accessor: "Employee Name",
            },

            {
                Header: 'Email Id',
                accessor: 'Email Mail ID',
            },
            {
                Header: 'Date of Joining',
                accessor: 'Employee DOJ',
            }
        ],

        []
    );

    const emp = async () => {
        const response = await fetch('http://localhost:8080/accolite/filter_employees', {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            method: "POST",
            body: JSON.stringify({
                formid: "1",//props.formid
                from_date: "01/08/2021",
                to_date: "02/08/2021",
                no_of_days_after_mail: 180
            }),

        });
        console.log("here in response");
        console.log(response);
        const dataemp = await response.json();
        setEmployees(dataemp);

        const employees2 = [{ "Employee Name": "Bhagyashree Kiran Vaidya", "Employee DOJ": "13/01/2021", "Employee Code": "CNT0434", "Email Mail ID": "bhagyashree.vaidya@accolitedigital.com" }];

        console.log(employees);
    }
    useEffect(() => {
        emp();
    }, []);

    return (
        <Styles>

            <Table columns={columns} data={employees} />

        </Styles>
    );
}

export default EmployeeListComponent;