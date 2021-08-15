import React from 'react';
import "./Switch.css";
import cx from "classname";


const Switch = (props) => {
    const sliderCX = cx("slider", {
        'rounded': props.rounded
    });
    const onToggle = () => props.requiredChangeHandler(props.questionId);
    return (
        <label className= "switch">
            <input type="checkbox" checked={props.required} onChange={onToggle} />
            <span className={sliderCX}/>
        </label>
    );
};

export default Switch;