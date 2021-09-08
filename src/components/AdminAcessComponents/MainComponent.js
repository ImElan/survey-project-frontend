import React, { Component } from 'react';
import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Input,
	Label,
} from 'reactstrap';
import AdminDataService from './services/adminservice';
// import { Link } from "react-router-dom";

function RenderEmployee({ emp, toggleMod }) {
	return (
		<div className='col-12 col-md-8 m-1 '>
			<Card>
				<CardBody>
					<CardTitle>
						<strong>Employee Id : </strong>
						{emp.email}
					</CardTitle>
					<CardText>
						<strong>Employee Name : </strong>
						{emp.name}
					</CardText>
					<CardText>
						<strong>Employee Role : </strong>
						{emp.role}
					</CardText>
				</CardBody>
				<br />
				<div className='ml-auto'>
					<Button onClick={() => toggleMod(emp.email)} className='btn btn-md bg-primary m-3'>
						Edit
					</Button>
				</div>
			</Card>
		</div>
	);
}

function RenderModal(props) {
	const {
		isModalOpen,
		emprole,
		empemail,
		changerole,
		toggleModal,
		handleLogin,
	} = props;

	return (
		<div>
			<Modal isOpen={isModalOpen} toggle={toggleModal} style={{ marginTop: '100px' }}>
				<ModalHeader toggle={toggleModal}></ModalHeader>
				<ModalBody>
					{/* <div>
						<Label>Employee Name</Label>

						<input
							type='text'
							className='form-control mb - 4'
							placeholder='Enter Employee Name'
							value={empname}
							onChange={changename}
						/>
					</div> */}

					<div>
						<Label>Select Employee Role</Label>

						{/* <input
							type='text'
							className='form-control'
							placeholder='Enter New Employee Role'
							value={emprole}
							onChange={changerole}
						/> */}
						<Input type="select" 
							className="form-control"
                            value={emprole}
                            onChange={changerole}>
                                <option >HR</option>
                                <option >PM</option>
                        </Input>
					</div>

					{/* <div style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}
					<div className='ml-auto mt-2' style={{ display: 'inline-flex', padding: 2 }}>
						<div style={{ padding: 4 }}>
							<button className='btn btn-secondary' type='button' onClick={toggleModal}>
								Cancel
							</button>
						</div>

						<div style={{ padding: 4 }}>
							<button
								className='btn btn-primary'
								type='button'
								onClick={() => handleLogin(emprole, empemail)}
							>
								Save
							</button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default class MainComponent extends Component {
	constructor(props) {
		super(props);
		this.onChangeSearchId = this.onChangeSearchId.bind(this);
		this.onChangeSearchRole = this.onChangeSearchRole.bind(this);
		this.onsearchId = this.onsearchId.bind(this);
		this.toggleModal = this.toggleModal.bind(this);

		this.state = {
			tutorials: [],
			isModalOpen: false,
			istrue: false,
			searchId: '',
			searchEmail: '',
			searchRole: 'HR',
			
		};

		this.handleLogin = this.handleLogin.bind(this);
	}

	toggleModal(empemaill) {
		
		this.setState({
			searchEmail: empemaill,
		});

		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
		
		// console.log(this.state.searchEmail);
		// console.log(this.state.isModalOpen);
	}

	onChangeSearchId(e) {
		const searchTitle = e.target.value;
		this.setState({
			searchId: searchTitle,
		});
	}

	onChangeSearchRole(e) {
		const searchTitle = e.target.value;
		this.setState({
			searchRole: searchTitle,
		});
		// console.log(this.state.searchRole);
		// console.log("hi");
	}

	handleLogin(emprole, empemail) {
		this.toggleModal();
		// console.log(emprole);
		// console.log(this.state.searchRole);
		// console.log(empemail);
		AdminDataService.doUpdate(empemail, emprole)
			.then((response) => {
				console.log(response.data);

				const newtutorials = this.state.tutorials.map((tutorial) =>{
					if(tutorial.email !== empemail)
					{
						return tutorial;
					}
					return {
						...tutorial,
						role: emprole,
					};
				});

				this.setState({
					tutorials: newtutorials
				});
				
				this.setState({
					searchRole: 'HR'
				})
				// console.log(this.state.tutorials);

			})
			.catch((e) => {
				console.log(e.response);
			});
	}

	onsearchId() {
		// console.log(this.state.searchId);
		AdminDataService.doGetById(this.state.searchId)
			.then((response) => {
				this.setState({
					tutorials: response.data,
				});
				this.setState({
					istrue: true,
				});
				// console.log(this.state.tutorials);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { searchId, tutorials, istrue, searchRole, searchEmail } = this.state;

		return (
			<div className='list row offset-2'>
				<div className='col-md-8 '>
					<div className='input-group mb-3'>
						<input
							type='text'
							className='form-control'
							placeholder='Enter Employee Email Id'
							value={searchId}
							onChange={this.onChangeSearchId}
						/>
						<div className='input-group-append'>
							<button
								className='btn btn-outline-secondary'
								type='button'
								onClick={this.onsearchId}
							>
								Search
							</button>
						</div>
					</div>
				</div>

				<div className='row col-10 offset-1'>
					{istrue &&
					<div>
						{tutorials.map((tutorial) => {
							return (
							<RenderEmployee emp={tutorial} toggleMod={this.toggleModal} />
						)})}
					</div> }
				</div>

				<div>
					<RenderModal
						isModalOpen={this.state.isModalOpen}
						toggleModal={this.toggleModal}
						emprole={searchRole}
						changerole={this.onChangeSearchRole}
						empemail={searchEmail}
						handleLogin={this.handleLogin}
					/>
				</div>
			</div>
		);
	}
}
