import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
// import ThankYouContainer from './ThankYouContainer';
import GraphComponent from './Graph/GraphComponent';

function SummaryContainer(props) {


    //getting from Id from URL
    console.log("it ran");
    const formid = props.formId;
    const idToken = localStorage.getItem('accessToken');
    const [response, setResponse] = useState([]);
    //console.log(formid);


    const [questionOptionMapp, setQuestionOptionMapp] = useState([])

    //Form handler
    const [completeForm, setCompleteForm] = useState([]);
    function completeFormHandler(form) {
        console.log(form);
        setCompleteForm(form);
    }

    //Response Handler
    function responseHandler(res) {
        setResponse(res);
        console.log(res);
    }

    const [showMap, setShowMap] = useState();
    function showMapHandler(m) {
        setShowMap(m);
    }
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

    function createMap(questions) {
        //console.log(questions);
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
                } else {
                    questionOptionMap[index] = [];
                }
                index++;
            });
        }
        setQuestionOptionMapp(questionOptionMap);
        console.log(questionOptionMap);
    }

    function fillMap(responses) {
        console.log(responses);
        responses.map((response) => {
            for (let i = 0; i < response.questiontypes.length; i++) {
                if (response.questiontypes[i] == "SINGLE") {
                    countOption(response.answers[i], i);
                }
                if (response.questiontypes[i] == "MULTIPLE") {

                    countOptionMul(response.answers[i], i);
                }

            }
        });

    }

    //Fetch responses from the database for a particular Form ID
    // const fetchData = async () => {
    //     cosnt res1 = await axios.get(''url1', headers);
    //     setState1();
    //     const res2 = await axios.get('url2', headers);
    //     setState2();
    //     }
    //     fetchData();

    useEffect(() => {
        const fetchData = async () => {
            const res1 = await axios.get(`http://localhost:8080/api/form/${formid}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            setCompleteForm(res1.data);
            createMap(res1.data.surveyQuestions);
            const res2 = await axios.get(`http://localhost:8080/response/${formid}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            setResponse(res2.data);
            fillMap(res2.data);
            console.log(res1);
            console.log(res2);
        }

        fetchData();
        console.log(questionOptionMapp);
        // fetch(`http://localhost:8080/response/${formid}`, {
        //     headers: {
        //         "Authorization": `Bearer ${idToken}`,
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(res => res.json())
        //     .then((result) => { console.log(result); setResponse(result);  fillMap(result); });

        // fetch("http://localhost:8080/api/form/" + formid, {
        //     headers: {
        //         "Authorization": `Bearer ${idToken}`,
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(res => res.json())
        //     .then((result) => {createMap(result.surveyQuestions); completeFormHandler(result);  });
        //console.log(m);
        // console.log(form[0].surveyQuestions);


        //console.log(questionOptionMap[0].[0].name);
    }, [])




    return (
        <Container fluid>
            <Row
                className='justify-content-md-center'
                style={{
                    backgroundColor: '#CCC', //4B0082
                    paddingTop: '0px',
                    paddingBottom: '5px',
                    textAlign: "center"
                }}
            >
                <h1>{completeForm.formTitle}</h1>
                <h2>{completeForm.formDescription}</h2>

            </Row>
            {
                questionOptionMapp.map((questionOpt) =>
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