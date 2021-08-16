import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

function AddQuestionComponent(props) {
	const { tooltipMessage, disabled, questionTypes, addQuestionHandler } = props;

	const questionTypeToDisplayText = {
		STAR: 'Star Question',
		SINGLE: 'Single Choice Question',
		DESCRIPTIVE: 'Descriptive Question',
		MULTIPLE: 'Multiple Choice Question',
	};

	return (
		<div className='addQuestionButton'>
			<Dropdown>
				<OverlayTrigger
					placement='top'
					overlay={<Tooltip id='tooltip-right'>{tooltipMessage}</Tooltip>}
				>
					<div className='d-inline-block'>
						<Dropdown.Toggle
							size='lg'
							disabled={disabled}
							variant={`${!disabled ? 'primary' : 'secondary'}`}
						>
							Add New Question
						</Dropdown.Toggle>
					</div>
				</OverlayTrigger>
				<Dropdown.Menu>
					{questionTypes.map((questionType) => {
						return (
							<Dropdown.Item
								key={questionType}
								onClick={() => addQuestionHandler(questionType)}
							>
								{questionTypeToDisplayText[questionType]}
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

export default AddQuestionComponent;
