import add from '../../assets/plus-solid.svg';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

import './AddQuestionComponent.css';

function AddQuestionComponent(props) {
	const { tooltipMessage, disabled, addQuestionHandler } = props;
	return (
		<div className='addQuestionButton'>
			<OverlayTrigger
				placement='right'
				overlay={<Tooltip id='tooltip-right'>{tooltipMessage}</Tooltip>}
			>
				<div className='d-inline-block'>
					<Button
						variant='light'
						style={disabled ? { pointerEvents: 'none' } : {}}
						disabled={disabled}
						onClick={addQuestionHandler}
					>
						<img className='addQuestionButton__image' src={add} alt='Add Question' />
					</Button>
				</div>
			</OverlayTrigger>
		</div>
	);
}

export default AddQuestionComponent;
