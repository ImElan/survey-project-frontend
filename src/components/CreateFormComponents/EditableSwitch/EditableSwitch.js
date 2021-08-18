import React,{useState} from 'react'
import Switch from '@material-ui/core/Switch';
function EditableSwitch() {
    const [checked, setChecked] = useState(false);
    const handleChange = ()=>{
        setChecked(!checked);
    }
    return (
        <div>
            <Switch
            checked={checked}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />   
          <span>{checked? "":"Not "} Editable</span>
        </div>
    )
}

export default EditableSwitch

