// import { useEffect, useReducer, useRef, useState } from 'react';
// import React from 'react';



// import { Container, Row, Col } from 'react-bootstrap';



// function MainComponent(props) {

//     const [responseState, dispatch] = useReducer(adminReducer, {
//         curremployee: " ",
// 		employedata: employees
// 	});


//     return(
//         <div>
            

//         </div>
//     )



// }


import React, { Component } from "react";
import { Card,CardBody, CardTitle,CardText } from "reactstrap";
import AdminDataService from "./services/adminservice";
// import { Link } from "react-router-dom";


function RenderEmployee({emp})
	{
		return(
				<div className="col-12 col-md-5 m-1">
					<Card>
                        <CardBody>
							<CardTitle>{emp.id}</CardTitle>
							<CardText>{emp.name}</CardText>
                            
							<CardText>{emp.role}</CardText>
						</CardBody>
			    	</Card>
				</div>
		);
	}

 export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchId = this.onChangeSearchId.bind(this);
    // this.retrieveTutorials = this.retrieveTutorials.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveTutorial = this.setActiveTutorial.bind(this);
    // this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.onsearchId = this.onsearchId.bind(this);

    

    this.state = {
        tutorials: [],
        // searchTitle is the Id field
        istrue : false,
        searchTitle: ""
      };
    }
  

//   componentDidMount() {
//     this.retrieveTutorials();
//   }


onChangeSearchId(e) {
    console.log(e.target.value);
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

//   retrieveTutorials() {
//     TutorialDataService.getAll()
//       .then(response => {
//         this.setState({
//           tutorials: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   refreshList() {
//     this.retrieveTutorials();
//     this.setState({
//       currentTutorial: null,
//       currentIndex: -1
//     });
//   }

//   setActiveTutorial(tutorial, index) {
//     this.setState({
//       currentTutorial: tutorial,
//       currentIndex: index
//     });
//   }

//   removeAllTutorials() {
//     TutorialDataService.deleteAll()
//       .then(response => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

  onsearchId() {
    //   console.log(this.state.searchTitle);
    AdminDataService.doGetById(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        this.setState({
            istrue:true
        })
        console.log(this.state.tutorials);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    
    const { searchTitle, tutorials, istrue } = this.state;


    return (
      <div className="list row">
        <div className="col-md-8 ">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Employee Id"
              value={searchTitle}
              onChange={this.onChangeSearchId}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.onsearchId}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div>
            {
                istrue && <RenderEmployee emp = {tutorials} />
            }
        </div>
        {/* <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div> */}
      </div>
    );

  }
}






