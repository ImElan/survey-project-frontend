import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
const PopDown = ({ totalQuestions, questionsPerPageHandler }) => {
    const options = [];
    options.push(1);
    let questionsPerPage;
    for (let factor = 1; factor <= 10 && (factor - 1) * 5 < totalQuestions; factor++) {
        questionsPerPage = factor * 5;
        options.push(questionsPerPage);
    }
    return (
        <div>
            <DropdownButton title="Questions Per Page" style={{ "float": "right" }}>

                <Dropdown.Menu>
                    {options.map(option => {
                        return <Dropdown.Item onClick={() => questionsPerPageHandler(option)}>{option}</Dropdown.Item>

                    })}
                </Dropdown.Menu>
            </DropdownButton>
        </div >
    )
}

export default PopDown;
