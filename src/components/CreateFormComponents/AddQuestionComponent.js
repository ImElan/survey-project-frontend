import add from '../../assets/plus-solid.svg';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './AddQuestionComponent.css';

function AddQuestionComponent(props) {
	const { addQuestionHandler } = props;
	return (
		<div className='addQuestionButton'>
			<OverlayTrigger
				placement='right'
				overlay={<Tooltip id={'tooltip-right'}>Add New Question</Tooltip>}
			>
				<img src={add} alt='Add Question' onClick={addQuestionHandler} />
			</OverlayTrigger>
		</div>
	);
}

export default AddQuestionComponent;
