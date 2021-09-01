import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GraphComponent from './Graph/GraphComponent';

function SummaryContainer(props) {
    /*
        let submitform =
        {
            "id": 1,
            "formTitle": "First Form",
            "formDescription": "This is My first Form",
            "isEditable": false,
            "surveyQuestions": [
                {
                    "questionType": "SINGLE",
                    "question": "Which is your City?",
                    "options": ["Banglore", "Hyderabad", "Delhi", "Mumbai"],
                    "noOfStars": 0,
                    "isHalfStarAllowed": false,
                    "isRequired": true
                },
                {
                    "questionType": "SINGLE",
                    "question": "Which is your Favourite Language?",
                    "options": ["English", "Telgu", "Punjabi", "Hindi"],
                    "noOfStars": 0,
                    "isHalfStarAllowed": false,
                    "isRequired": true
                }
            ],
            "createdBy": 1
        }
            ;
        //Temporary Response for Testing Only
    
        let replyies = [
            {
                "id": 1,
                "formId": 1,
                "userId": 1,
                "questiontypes": ["SINGLE", "MULTIPLE"],
                "questions": ["Which is your City?", "Which is your Favourite Language?"],
                "answers": ["Banglore", "English"],
                "sendCopy": 1
            },
            {
                "id": 1,
                "formId": 1,
                "userId": 1,
                "questiontypes": ["SINGLE", "MULTIPLE"],
                "quesions": ["Which is your City?", "Which is your Favourite Language?"],
                "answers": ["Hyderabad", "English"],
                "sendCopy": 1
            },
            {
                "id": 1,
                "formId": 1,
                "userId": 1,
                "questiontypes": ["SINGLE", "MULTIPLE"],
                "quesions": ["Which is your City?", "Which is your Favourite Language?"],
                "answers": ["Mumbai", "Hindi"],
                "sendCopy": 1
            },
            {
                "id": 1,
                "formId": 1,
                "userId": 1,
                "questiontypes": ["SINGLE", "MULTIPLE"],
                "quesions": ["Which is your City?", "Which is your Favourite Language?"],
                "answers": ["Banglore", "Telgu"],
                "sendCopy": 1
            },
            {
                "id": 1,
                "formId": 1,
                "userId": 1,
                "questiontypes": ["SINGLE", "MULTIPLE"],
                "quesions": ["Which is your City?", "Which is your Favourite Language?"],
                "answers": ["Delhi", "Punjabi,English"],
                "sendCopy": 1
            },
            {
                "id": 1,
                "formId": 1,
                "userId": 1,
                "questiontypes": ["SINGLE", "MULTIPLE"],
                "quesions": ["Which is your City?", "Which is your Favourite Language?"],
                "answers": ["Delhi", "English"],
                "sendCopy": 1
            },
            {
                "id": 1,
                "formId": 1,
                "userId": 1,
                "questiontypes": ["SINGLE", "MULTIPLE"],
                "quesions": ["Which is your City?", "Which is your Favourite Language?"],
                "answers": ["Mumbai", "English,Hindi"],
                "sendCopy": 1
            }
        ];
        */



    //getting from Id from URL
    //console.log("it ran");
    const formid = props.formId;
    const idToken = localStorage.getItem('accessToken');
    const [response, setResponse] = useState([]);
    //console.log(formid);


    const [questionOptionMapp, setQuestionOptionMapp] = useState([])

    //Form handler
    const [completeForm, setCompleteForm] = useState([]);


    let questionOptionMap = [];

    function countOption(answer, qno) {
        let options = questionOptionMap[qno].optionValue;
        for (let i = 0; i < options.length; i++) {
            if (options[i].name == answer) {
                options[i].value++;
            }
        }
        //console.log(options);
    }
    function countOptionMul(answer, qno) {
        console.log("Yes I am working");
        let options = questionOptionMap[qno].optionValue;
        let ans = answer.split(",");
        for (let i = 0; i < options.length; i++) {
            for (let j = 0; j < ans.length; j++) {
                if (options[i].name == ans[j]) {
                    options[i].value++;
                }
            }
        }
    }

    // function createMap() {
    //console.log(questions);
    let questions = completeForm?.surveyQuestions;
    let index = 0;
    {
        questions && questions.map((question) => {
            if (question.questionType == "SINGLE" || question.questionType == "MULTIPLE") {
                let optionMap = [];

                //console.log(question.options);
                for (let i = 0; i < question.options.length; i++) {
                    let temp = [];
                    temp['name'] = question.options[i];
                    temp['value'] = 0;
                    optionMap[i] = temp;

                }
                let inputFormat = [];
                inputFormat["question"] = question.question;
                inputFormat["optionValue"] = optionMap;
                questionOptionMap[index] = inputFormat;
            }
            index++;
        });
    }
    //questionOptionMap[0]=[];
    // setQuestionOptionMapp(questionOptionMap);
    console.log(questionOptionMap);
    // }

    // function fillMap() {
    // console.log(responses);
    let responses = response;
    responses && responses.map((response) => {
        for (let i = 0; i < response.questiontypes.length; i++) {
            if (response.questiontypes[i] == "SINGLE") {
                countOption(response.answers[i], i);
            }
            if (response.questiontypes[i] == "MULTIPLE") {

                countOptionMul(response.answers[i], i);
            }

        }
    });

    // }

    useEffect(() => {
        const fetchData = async () => {
            const res1 = await axios.get(`http://localhost:8080/api/form/${formid}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            setCompleteForm(res1.data);
            // createMap();
            const res2 = await axios.get(`http://localhost:8080/response/${formid}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            setResponse(res2.data);
            // fillMap();

            // console.log(submitform);
            // console.log(replyies);
            // createMap(submitform.surveyQuestions);
            // fillMap(replyies);
        }
        console.log("useffect running")
        fetchData();
        console.log(questionOptionMapp);
    }, [])




    return (
        <Container fluid>
            <Row
                className='justify-content-md-center'

            >
                <div >
                    <h2>{completeForm.formTitle}</h2>
                </div>

            </Row>
            {
                questionOptionMap.map((questionOpt) =>
                    <GraphComponent
                        data={questionOpt.optionValue}
                        question={questionOpt.question}
                    ></GraphComponent>
                )
            }

        </Container>
    )
}
export default SummaryContainer;