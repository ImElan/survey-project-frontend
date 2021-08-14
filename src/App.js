import React, { useState } from 'react'
import PopDown from './components/CreateFormComponents/PopDown.js';
import Paging from './components/CreateFormComponents/Paging.js'
export const App = () => {
	const totalQuestions = 100;
	const [currentPage, setCurrentPage] = useState(1);
	const [questionsPerPage, setquestionsPerPage] = useState(10);
	const pagechangerequesthandler = (number) => {
		setCurrentPage(number);
	}
	const questionsPerPageHandler = (option) => {
		setquestionsPerPage(option);
	}
	return (
		<div>
			<PopDown
				totalQuestions={totalQuestions}
				questionsPerPageHandler={questionsPerPageHandler}
			></PopDown>
			<h1>Hello</h1>
			<p>dvfffffffffffffffffddddddddddddddddddddddddddddddddddddddddddddddd
				fdddddddddddddddddddddddvdffffffffffffffffffffffffffffffffffffffff
				vdffffffffffffffffffffffffffffffffffffffff
				dfvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
				dfvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
				dfvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
			</p>
			<Paging totalQuestions={totalQuestions}
				questionsPerPage={questionsPerPage}
				pageChangeRequestHandler={pagechangerequesthandler}
				currentPage={currentPage} >

			</Paging>
		</div>
	)
}
export default App;
