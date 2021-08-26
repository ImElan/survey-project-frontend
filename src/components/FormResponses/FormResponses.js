import NameForm from '../CreateFormComponents/NameForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import DescComponentt from '../../components/ResponseSurveyComponents/DescComponentt';
import RadioComponentt from '../../components/ResponseSurveyComponents/RadioComponentt';
import CheckBoxComponentt from '../../components/ResponseSurveyComponents/CheckBoxComponentt';
import StarComponent from '../../components/ResponseSurveyComponents/StarComponent';

function FormResponses(props) {
    const [user, setUser] = useState({});
    const {questions, response} = props;
    useEffect(() => {
        console.log(props);
        getData();
        async function getData() {
            const result = await fetch(`http://localhost:8080/api/user/${props.response.userid}`)
                            .then(data=> data);
            const data = await result.json();
            console.log(data);
            setUser(data);
        }
    }, [props.response]);
    const renderQuestionComponent = ({question, answer}) => {
		switch (question.questionType) {
			case 'STAR':
                console.log(answer);
				return (
					<StarComponent
                        readOnly={true}
						question={question.question}
						numStars={parseInt(question.noOfStars)}
                        answer = {parseInt(answer)}
					/>
				);
			case 'DESCRIPTIVE':
				return (
					<DescComponentt
                        readOnly={true}
						question={question.question}
                        answer={answer}
					/>
				);
			case 'MULTIPLE':
                let answersIndex = [];
                for(var i=0;i<question.options.length;i++){
                    if(answer.includes(question.options[i]))
                        answersIndex.push(i);
                } 
				return (
					<CheckBoxComponentt
                        readOnly={true}
						question={question.question}
						options={question.options}
                        answer={answersIndex}
					/>
				);
			case 'SINGLE':
                let singleIndex = -1;
                for(var i=0;i<question.options.length;i++){
                    if(answer === question.options[i])
                        singleIndex = i;
                } 
				return (
					<RadioComponentt
                        readOnly={true}
						question={question.question}
						options={question.options}
                        answer={singleIndex}
					/>
				);
			default:
				break;
		}
	};

    return (
        <Container fluid>
       <Card style={{width: "80%", margin: "0 auto", textAlign: "center"}}>
		<Card.Header>Employee</Card.Header>
		<Card.Body>
			<blockquote className="blockquote mb-0">
			<p>
				{' '}
				{user.name}{' '}
			</p>
			<footer className="blockquote-footer">
				<cite title="Source Title">{user.email}</cite>
			</footer>
			</blockquote>
		</Card.Body>
	</Card>
       { questions.map((question, index)=>(
            <Row
						className='justify-content-md-center'
						style={{
							paddingTop: '0px',
							paddingBottom: '10px',
							marginTop: '20px',
						}}
					>
						<Col
							sm={9}
							style={{
								//marginRight: '5px',
								padding: '10px 25px',
								borderRadius: '8px',
								backgroundColor: '#F0F0F0', //7866B2
								border: 'solid black 1px',
								//#e6e6e6
							}}
						>
							{renderQuestionComponent({
                                question: question,
                                answer: response.answers[index]
                            })
                        }
						</Col>
					</Row>
        ))}
    </Container>
            
    );
    
}
export default FormResponses;