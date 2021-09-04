import '../../styles/displayforms.css';
import { Container, Row, Col, Alert, FormSelect } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import FormData from './FormData';
import axios from 'axios';
import PopDown from '../CreateFormComponents/PopDown';
import Paging from '../CreateFormComponents/Paging';
import {FaPlus} from "react-icons/fa"

function Displayforms(props) {
	
	const [data, setData] = useState([]);
	const [alertState, setAlertState] = useState('NOT_LOADED');

	const setAlertStateValue = (alertStateValue) => {
		setAlertState(alertStateValue);
	};

	const idToken = localStorage.getItem('accessToken');
	const createdBy = localStorage.getItem('userId');
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/api/formbyhr/${createdBy}`,
					{
						headers: {
							Authorization: `Bearer ${idToken}`,
						},
					}
				);
				
				const dummyData = response.data;

				response.data.map((form) => {
					const {surveyQuestions} = form;
					
					const questions = surveyQuestions.map((surveyQuestion) => {
						let surveyOptions = null;
						if (surveyQuestion.questionType === 'SINGLE' || surveyQuestion.questionType === 'MULTIPLE') {
							surveyOptions = surveyQuestion.options.map((surveyOption) => {
								return {
									option: surveyOption
								};
							});
						}
						return {
							...surveyQuestion,
							image : surveyQuestion.imageData,
							options: {
								optionsArray: surveyOptions,
							}
						}
						})
					form.surveyQuestions = questions;
				})
				console.log(response.data);
				
				setData(response.data);
				
			} catch (error) {
				console.log(error.response);
				console.log(error.data);
			}
		};

		fetchData();
	}, []);

	const [questionsPerPage, setquestionsPerPage] = useState(5);

	const [currentPage, setCurrentPage] = useState(1);
	const questionsPerPageHandler = (option) => {
		setquestionsPerPage(option);
	};
	const pagechangerequesthandler = (number) => {
		setCurrentPage(number);
	};


	let paginationStartIndex;
	paginationStartIndex = (currentPage - 1) * questionsPerPage;
	if (paginationStartIndex > data.length) {
		paginationStartIndex = 0;
	}

	return (
		<div className='display-forms-wrapper'>
			<nav className='navbar sticky-top navbar-light bg-dark'>
				<div className='container-fluid'>
					<a className='navbar-brand' href='#'>
						<img src='https://accolite.com/assets/jpg/logo.png' alt='' width='220em' />
					</a>
					
				</div>
			</nav>
			<div className='clearfix'></div>
			{alertState === 'SUCCESS' && (
				<Alert variant='success' className='text-center' onClose = {() => {setAlertState('NOT_LOADED')}} dismissible>
					Email Sent Successfully
				</Alert>
			)}
			{alertState === 'FAILED' && (
				<Alert variant='danger' className='text-center' onClose = {() => {setAlertState('NOT_LOADED')}} dismissible>
					Something went wrong in sending email...Please try again later
				</Alert>
			)}
            
			<div>
				<div className='forms-wrapper'>
                    <div className = "container-fluid header-fluid">
                        <div className = "row justify-content-center">
                            <div className = "col-md-12 col-sm-12 col-xs-12 header-flex-wrapper" >
                                <div className = "header-left">
                                    <button type="button" className="btn btn-primary"  onClick = {() => {props.history.push('/form/adminacess')}}>Admin Panel</button>
                                </div>
                                <div className = "header-left">
                                    <button type="button" className="btn btn-primary"  onClick = {() => {props.history.push('/form/create')}}><FaPlus style = {{marginRight: "8px",verticalAlign: "middle"}}/>Create Form</button>
                                </div>
                                <div className = "header-left">
                                <PopDown
                                totalQuestions= {data.length}
                                questionsPerPageHandler={questionsPerPageHandler}
                                title = "Forms Per Page"
                                />
                                </div>
                            </div>
                        </div>
                    </div>
					<div className='container'>
						<div className='row justify-content-center'>
							<div className='col-md-12 col-sm-12 col-xs-12'>
								<div className='forms-wrapper-inside'>
									{data
										.slice(
											paginationStartIndex,
											(currentPage - 1) * questionsPerPage + questionsPerPage
										)
										.map((form) => (
											<FormData
												key={form.id}
												formId={form.id}
												history={props.history}
												form={form}
												handleAlertState={setAlertStateValue}
											/>
										))}
								</div>
							</div>
						</div>
						<Paging
							totalQuestions={data.length}
							questionsPerPage={questionsPerPage}
							pageChangeRequestHandler={pagechangerequesthandler}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Displayforms;
