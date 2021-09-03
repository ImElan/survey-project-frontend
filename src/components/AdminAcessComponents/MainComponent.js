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
		<div className='col-12 col-md-6 m-1 '>
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
				<Button onClick={toggleMod} className='btn bg-primary ml-auto'>
					Edit
				</Button>
			</Card>
		</div>
	);
}

function RenderModal(props) {
	const {
		isModalOpen,
		emprole,
		empname,
		empid,
		changerole,
		changename,
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
						<Label>Employee Role</Label>

						<input
							type='text'
							className='form-control'
							placeholder='Enter New Employee Role'
							value={emprole}
							onChange={changerole}
						/>
					</div>

					{/* <div style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}
					<div className="ml-auto" style={{display: 'inline-flex',padding:2}}>
						<div style={{padding:2}}>
							<button className='btn btn-secondary' type='button' onClick={toggleModal}>
								Cancel
							</button>
						</div>

						<div style = {{padding:2}}>
							<button
								className='btn btn-primary'
								type='button'
								onClick={() => handleLogin(emprole, empname, empid)}
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
		this.onChangeSearchName = this.onChangeSearchName.bind(this);
		this.onChangeSearchRole = this.onChangeSearchRole.bind(this);
		this.onsearchId = this.onsearchId.bind(this);
		this.toggleModal = this.toggleModal.bind(this);

		this.state = {
			tutorials: [],
			isModalOpen: false,
			istrue: false,
			searchId: '',
			searchName: '',
			searchRole: '',
		};

		this.handleLogin = this.handleLogin.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
		console.log(this.state.isModalOpen);
	}

	onChangeSearchId(e) {
		const searchTitle = e.target.value;
		this.setState({
			searchId: searchTitle,
		});
	}

	onChangeSearchName(e) {
		console.log(e.target.value);
		const searchTitle = e.target.value;
		this.setState({
			searchName: searchTitle,
		});
	}

	onChangeSearchRole(e) {
		const searchTitle = e.target.value;
		this.setState({
			searchRole: searchTitle,
		});
	}

	handleLogin(emprole, empid) {
		this.toggleModal();
		AdminDataService.doUpdate(this.state.searchId, emprole)
			.then((response) => {
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e.response);
			});
	}

	onsearchId() {
		console.log(this.state.searchId);
		AdminDataService.doGetById(this.state.searchId)
			.then((response) => {
				this.setState({
					tutorials: response.data,
				});
				this.setState({
					istrue: true,
				});
				console.log(this.state.tutorials);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { searchId, tutorials, istrue, searchName, searchRole } = this.state;

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
					{istrue && <RenderEmployee emp={tutorials} toggleMod={this.toggleModal} />}
				</div>

				<div>
					<RenderModal
						isModalOpen={this.state.isModalOpen}
						toggleModal={this.toggleModal}
						emprole={searchRole}
						empname={searchName}
						changename={this.onChangeSearchName}
						changerole={this.onChangeSearchRole}
						empid={searchId}
						handleLogin={this.handleLogin}
					/>
				</div>
			</div>
		);
	}
}
