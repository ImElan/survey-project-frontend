import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/ThankYoupageComponents/Header';
function ThankYouContainer() {
    return (
		<div style = {{
				height: '100%',
				backgroundColor : 'rgb(246 235 254)',
				position : 'absolute',
				width : '100%',
				top : '0',
				left : '0'
			}}>
			<Container fluid>
				<Row
					className='justify-content-md-center'
				>
					<Col xs={12} sm={6}>
						<Header title = "Survey Form" isEditable = "true"/> 
					</Col>
				</Row>
			</Container>
		</div>
    )
}
export default ThankYouContainer;