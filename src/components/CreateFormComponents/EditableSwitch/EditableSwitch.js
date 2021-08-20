import React from 'react';
import Switch from '@material-ui/core/Switch';
function EditableSwitch(props) {
	const handleChange = () => {
		props.handleIsEditable();
	};
	return (
		<div style={{ marginTop: '2rem' }}>
			<Switch
				checked={props.isEditable}
				onChange={handleChange}
				name='checkedB'
				color='secondary'
				style={{ color: 'white' }}
			/>
			<span style={{ color: 'white' }}>
				{props.isEditable
					? 'Allow users to Edit Response'
					: "Don't Allow users to Edit Response"}
			</span>
		</div>
	);
}

export default EditableSwitch;
