import React, { useState, useEffect } from 'react'
import FormResponses from '../components/FormResponses/FormResponses';
import Paging from '../components/CreateFormComponents/Paging';
import { Container } from 'react-bootstrap';
function FormResponseContainer({ formId, responses }) {
    const [questions, setQuestions] = useState([]);
    const idToken = localStorage.getItem('accessToken');
    // const [responses, setResponses] = useState([
    //     {
    //         "id": "13534643",
    //         "formid": "243",
    //         "userid": "123",
    //         "questiontype": ["STAR", "DESCRIPTIVE"],
    //         "questions": ["How much will you rate", "Please tell about yourself"],
    //         "answers": ["5", "Pushpendra", "Honest", "Yes"],
    //     },
    //     {
    //         "id": "13534643",
    //         "formid": "243",
    //         "userid": "126",
    //         "questiontype": ["STAR", "DESCRIPTIVE"],
    //         "questions": ["How much will you rate", "Please tell about yourself"],
    //         "answers": ["4", "Sharma", "Honest,Punctual", "No"]
    //     }
    // ]);
    useEffect(() => {

        getData();
        async function getData() {
            const result1 = await fetch(`http://localhost:8080/api/form/${formId}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(data => data);
            const form = await result1.json();
            console.log(form);
            console.log(responses);
            setQuestions(form.surveyQuestions);
        }

    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [responsesPerPage, setresponsesPerPage] = useState(2);

    const pagechangerequesthandler = (number) => {
        setCurrentPage(number);
    };
    // const questionsPerPageHandler = (option) => {
    //     setresponsesPerPage(option);
    // };
    let paginationStartIndex;
    paginationStartIndex = (currentPage - 1) * responsesPerPage;
    if (paginationStartIndex > responses.length) {
        paginationStartIndex = 0;
    }
    return (
        <Container fluid>
            {responses.slice(
                paginationStartIndex,
                (currentPage - 1) * responsesPerPage + responsesPerPage
            ).map((response, index) => (
                <FormResponses key={index} response={response} questions={questions} ></FormResponses>
            ))}

            <Paging
                totalQuestions={responses.length}
                questionsPerPage={responsesPerPage}
                pageChangeRequestHandler={pagechangerequesthandler}
                currentPage={currentPage}
            />
        </Container>
    )

}

export default FormResponseContainer
