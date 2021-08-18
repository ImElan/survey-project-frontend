import 'bootstrap/dist/css/bootstrap.css';
import Pagination from 'react-bootstrap/Pagination';
import React from 'react';
const Paging = ({
	totalQuestions,
	questionsPerPage,
	pageChangeRequestHandler,
	currentPage,
}) => {
	let pageNumbers = [];
	let totalPages = Math.ceil(totalQuestions / questionsPerPage);
	let last = Math.ceil(currentPage / 5) * 5;
	last = Math.min(totalPages, last);
	let first = Math.max(1, last - 4);
	for (let number = first; number <= last; number++) {
		pageNumbers.push(number);
	}
	const showNextSetOfPages = () => {
		pageChangeRequestHandler(last + 1);
	};
	const showPrevSetOfPages = () => {
		pageChangeRequestHandler(first - 1);
	};
	return (
		<div>
			<Pagination style={{ 'justify-content': 'center' }}>
				<Pagination.First
					onClick={() => pageChangeRequestHandler(1)}
					disabled={currentPage == 1}
				/>
				<Pagination.Prev
					onClick={() => pageChangeRequestHandler(currentPage - 1)}
					disabled={currentPage == 1}
				/>
				<Pagination.Ellipsis
					onClick={() => {
						showPrevSetOfPages();
					}}
					disabled={first == 1}
				/>
				{pageNumbers.map((number) => {
					return (
						<Pagination.Item
							onClick={() => pageChangeRequestHandler(number)}
							active={number == currentPage}
						>
							{number}
						</Pagination.Item>
					);
				})}
				<Pagination.Ellipsis
					onClick={() => showNextSetOfPages()}
					disabled={last == totalPages}
				/>
				<Pagination.Next
					onClick={() => pageChangeRequestHandler(currentPage + 1)}
					disabled={currentPage == totalPages}
				/>
				<Pagination.Last
					onClick={() => pageChangeRequestHandler(totalPages)}
					disabled={currentPage == totalPages}
				></Pagination.Last>
			</Pagination>
		</div>
	);
};
export default Paging;
