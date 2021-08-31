import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
const PopDown = ({ title, totalQuestions, questionsPerPageHandler }) => {
	const [quesPerPageVal, setQuesPerPageVal] = useState(5);
	const options = [];
	options.push(1);
	let questionsPerPage;
	for (let factor = 1; factor <= 10 && (factor - 1) * 5 < totalQuestions; factor++) {
		questionsPerPage = factor * 5;
		options.push(questionsPerPage);
	}
	return (
		<div>
			<Dropdown
				title='Questions Per Page'
				style={{ float: 'right', display: 'flex', alignItems: 'center' }}
			>
				<h5 style={{ marginRight: '20px' }}>Questions Per Page:</h5>
				<Dropdown.Toggle size='lg' variant='primary'>
					{quesPerPageVal}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{options.map((option) => {
						return (
							<Dropdown.Item
								onClick={() => {
									setQuesPerPageVal(option);
									questionsPerPageHandler(option);
								}}
							>
								{option}
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default PopDown;
