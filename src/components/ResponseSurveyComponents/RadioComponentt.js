import React, { useState } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
function RadioComponentt(props) {

    const optionss = props.options;

    const handlechange = (e) => {
        console.log(e.target.value);
        props.answerOptionChange(props.questionId, e.target.value);
    }
    return (
        < div >
            <div className='mt-5'>
                {console.log(optionss)}
                <label>	{props.question}</label>
                <br />
                <br />
            </div>

            {
                props.readOnly ?
                    <div>
                        {optionss.map((option) => {
                            return (
                                <div className='row' key={option.optionId}>
                                    <div className='col-md-8'>
                                        <input
                                            disabled={props.readOnly}
                                            checked={props.answer === option.option}
                                            type="radio"
                                            value={option.option}
                                            name="allselect" /> {option.option}
                                    </div>
                                    <br></br>
                                </div>
                            );
                        })
                        }
                    </div>
                    : <div onChange={handlechange} >
                        {optionss.map((option) => {
                            return (
                                <div className='row' key={option.optionId}>
                                    {console.log("error occured hrere")}
                                    <div className='col-md-8'>
                                        <input
                                            defaultChecked={props.answer ? props.answer === option.option : false}
                                            type="radio"
                                            value={option.option}
                                            name="allselect" /> {option.option}
                                    </div>
                                    <br></br>
                                </div>
                                // <div className='row' key={option.optionId} ></div>
                            );
                        })}
                    </div>
            }
            <br></br>
        </div >
    );
}

export default RadioComponentt;
