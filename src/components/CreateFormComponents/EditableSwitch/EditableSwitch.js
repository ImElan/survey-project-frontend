import React from 'react'
import Switch from '@material-ui/core/Switch';
function EditableSwitch(props) {
    const handleChange = ()=>{
        props.handleIsEditable();
    }
    return (
        <div style={{marginTop: "2rem"}}>
            <Switch
            checked={props.isEditable}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />   
          <span style={{color: "white"}}>{props.isEditable? "":"Not "} Editable</span>
        </div>
    )
}

export default EditableSwitch

