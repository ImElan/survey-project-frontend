import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

function SummaryContainer(props) {
    //getting from Id from URL
    const formid = props.match.params.formid;
    console.log(formid);

    //Form handler
    const [completeForm, setCompleteForm] = useState();
    function completeFormHandler(form) {
        setCompleteForm(form);
    }

    //Response Handler
    const [response, setResponse] = useState();
    function responseHandler(res) {
        setResponse(res);
    }

    const [showMap, setShowMap] = useState();
    function showMapHandler(m) {
        setShowMap(m);
    }
    let questionOptionMap = [];
    /*
        function createMap(questions){
            questions.map((question)=>{
                if(question.questionType!="DESCRIPTIVE"){
                    let optionMap=[];
                    question.options.foreach((option)=>{
                        optionMap[option]=0;
                    })
                    questionOptionMap[question.questionId]=optionMap;
                }else{
                    questionOptionMap[question.questionId]=[];
                }
            });
        }
    
        function fillMap(responses){
            responses.map((response)=>{
                for(let i=0;i<response.questionType.length;i++){
                    if(response.questionType[i]!="DESCRIPTIVE"){
                                            
                    }
                }
            });
            
        }
    */
    //Fetch responses from the database for a particular Form ID
    useEffect(() => {
        fetch("http://localhost:8080/response/" + formid)
            .then(res => res.json())
            .then((result) => { responseHandler(result) });

        fetch("http://localhost:8080/api/form/" + formid)
            .then(res => res.json())
            .then((result) => { completeFormHandler(result); });
    }, [])
    /*
        useEffect(()=>{
            createMap(completeForm.surveyQuestions);
    
        },[])
      */
    return (
        <h1>Summary Works</h1>
    )
}
export default SummaryContainer;