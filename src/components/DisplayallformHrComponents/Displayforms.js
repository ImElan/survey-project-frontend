import "../../styles/displayforms.css"
import { Container, Row, Col } from 'react-bootstrap';
import React,{ useEffect, useState } from "react";
import FormData from "./FormData"
import axios from "axios";
import PopDown from "../CreateFormComponents/PopDown";
import Paging from "../CreateFormComponents/Paging";
import SendBtnModal from "./SendBtnModal";
function Displayforms() {
    const [data,setData] = useState([]);
    const createdBy = localStorage.getItem('hrId');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/${createdBy}`);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.log(error);
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
    
    // const data = [
    //     {
    //         id : 1,
    //         title : "Survey Form1",
    //         desc : "This is about to fill the survey form"
    //     },
    //     {
    //         id : 2,
    //         title : "Survey Form2",
    //         desc : "This is about to fill the survey form"
    //     },
    //     {
    //         id : 3,
    //         title : "Survey Form3",
    //         desc : "This is about to fill the survey form"
    //     },
    //     {
    //         id : 4,
    //         title : "Survey Form4",
    //         desc : "This is about to fill the survey form"
    //     },
    //     {
    //         id : 5,
    //         title : "Survey Form5",
    //         desc : "This is about to fill the survey form"
    //     },
    //     {
    //         id : 6,
    //         title : "Survey Form6",
    //         desc : "This is about to fill the survey form"
    //     },
    // ]

    let paginationStartIndex;
	paginationStartIndex = (currentPage - 1) * questionsPerPage;
	if (paginationStartIndex > data.length) {
		paginationStartIndex = 0;
	}
    
    

    return (
        <div className = "display-forms-wrapper">
            <nav className="navbar sticky-top navbar-light bg-dark" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://accolite.com/assets/jpg/logo.png" alt="" width = "220em" />
                    </a>
                    <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-secondary create-form-btn" onClick = {() => {props.history.push('/form/create')}}>Create Form</button>
                    </div>
                </div>
            </nav>
            <div className = "clearfix"></div>
            <div>
            <div className = "forms-wrapper">
                <div className = "container">
                    <div className = "row justify-content-center">
                        <div className = "col-md-7 col-sm-7 col-xs-12">
                            <div className = "popdown-wrapper">
                            <PopDown
							totalQuestions= {data.length}
							questionsPerPageHandler={questionsPerPageHandler}
                            title = "Forms Per Page"
						/>
                            </div>
                            <div className = "clearfix"></div>
                            <div className = "forms-wrapper-inside">
                            
                                {
                                    data
                                    .slice(
                                        paginationStartIndex,
                                        (currentPage - 1) * questionsPerPage + questionsPerPage
                                    )
                                    .map((form) => (
                                        <FormData key = {form.id} {...form}/>
                                    ))
                                }
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
    )
}
export default Displayforms;