import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/ThankYoupageComponents/Header';
function ThankYouContainer(props) {
	const title = props.location.state.title;
	const isFormEditable = props.location.state.isFormEditable;
	console.log(isFormEditable);
	console.log(title + ' urray');
	// const isEditable = true;
	const formId = props.location.state.formId;
	const userId = props.location.state.userId;
	return (
		<div
			style={{
				height: '100%',
				backgroundColor: 'white',
				position: 'absolute',
				width: '100%',
				top: '0',
				left: '0',
			}}
		>
			<Container fluid>
				<Row className='justify-content-md-center'>
					<Col xs={12} sm={6}>
						<Header
							title={title}
							isFormEditable={isFormEditable}
							formId={formId}
							userId={userId}
							history={props.history}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
export default ThankYouContainer;
