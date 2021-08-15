import React, { useState } from "react";
import { BsX } from "react-icons/bs";

function RadioComponent(props) {

    const [options, setOptions] = useState([{ optionId: 0, option: "option1" }, { optionId: 1, option: "option2" }]);
    const [isEdit, setIsEdit] = useState([false, false]);
    const [initial, setInitial] = useState('');




    //QuestionChange
    const handleChange = (e) => {

        // props.isValid=true;
        setInitial(e.target.value);
        //props.questionTextChangeHandler(props.questionID,e.target.value,props.isValid);
    }
    // Question Empty Check
    const checkValid = () => {

        if (initial === "") {
            // props.isValid=false;
            window.alert("NO empty allowed")
            return
        }

    }

    // ADD option
    const handleOptionAdd = () => {

        let newOption = { optionId: options.length, option: "option" }
        if (options.length === 10) {
            window.alert("Maximum  limit(10) reached for adding")
            return
        }
        setOptions([
            ...options,
            newOption,
        ]);

        let newo = [...isEdit]
        newo.push(false)
        setIsEdit(newo);

        //questionOptionAddHandler(props.questionId, newOption)
    };


    //After entering new Option in TextBox
    const updateOption = (index) => {
        if (options[index].option === "") {
            window.alert("Option cannot be empty")
            return
        }

         let newOption = options[index]


        let newo = [...isEdit]
        newo.splice(index, 1, false)
        setIsEdit(newo)

        // props.questionOptionChangeHandler(props.questionId,props.OptionId,newOption)
    }

    // Remove Option
    const handleRemove = index => {
        const list = [...options];
        list.splice(index, 1)
        let OptionId=index
        setOptions(list)
        // props.questionRemoveHandler(props.questionId,OptionId)
    }


    //OnCLickingLabel
    const addOption = index => {


        let newo = [...isEdit]
        newo.splice(index, 1, true)

        setIsEdit(newo)


    }

    //Updated Text from TextBox
    const updateValue = (e, index) => {


        let op = options[index]
        op.option = e.target.value
        let newo = [...options]
        newo.splice(index, 1, op)

        setOptions(newo)

    }


    return (

        <div className="App">

            <div className="mt-5">
                <input className="form-control" value={initial} type="text" maxLength="100" placeholder="Question" size="50" onChange={handleChange} onBlur={checkValid}/>
                <br />
                <br />

            </div>
            <div>
                {options.map((choice, i) => {
                    return (
                        <div key={i}>
                            <input
                                type="radio"
                                name="dynamic-radio"
                                value={choice.value}
                            //checked={radioValue === option.value}
                            //onChange={(e) => setRadioValue(e.target.value)}

                            />
                            {
                                (isEdit[i] === false) ? <label onClick={() => addOption(i)}>{choice.option}</label> :

                                    <input type="text" value={options[i].option} maxLength="100" onBlur={() => updateOption(i)} onChange={(e) => updateValue(e, i)} />
                            }

                            {
                                (options.length > 2) ?
                                    <button onClick={() => handleRemove(i)}><BsX /></button> : <p></p>
                            }
                        </div>
                    )
                })}
            </div>
            <br />
            <div>
                <button className="btn btn-primary" onClick={() => handleOptionAdd()}>Add Option</button>
            </div>
        </div>
    );
}

export default RadioComponent;