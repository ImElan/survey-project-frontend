import React from 'react';
import './Switch.css';
import cx from 'classname';

const Switch = (props) => {
	const sliderCX = cx('slider', {
		rounded: props.rounded,
	});
	const onToggle = () => props.requiredChangeHandler(props.questionId);
	return (
		<div
			style={{
				display: 'flex',
				padding: '5px 0',
				alignItems: 'center',
			}}
		>
			<label className='switch'>
				<input type='checkbox' checked={props.required} onChange={onToggle} />
				<span className={sliderCX} />
			</label>
			<h5 style={{ marginLeft: '8px' }}>Required</h5>
		</div>
	);
};

export default Switch;
