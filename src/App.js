import CreateFormContainer from './containers/CreateFormContainer';
import ResponseFormContainer from './containers/ResponseFormContainer';
import PreviewFormContainer from './containers/PreviewFormContainer';
import ViewFormContainer from './containers/ViewFormContainer';
import LoginPage from './components/TakeSurveyComponents/GoogleLogin/LoginPage';
import ThankYouContainer from './containers/ThankYouContainer';
import AdminAcessContainer from './containers/AdminAcessContainer';


import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Link
} from 'react-router-dom'

function App() {
	return (
		<div>
			{/* <Router>
				<Route exact path='/' component={LoginPage}/>
				<Route exact strict path='/form/create' component={CreateFormContainer} />
				<Route exact strict path='/form/preview' component={PreviewFormContainer} />
				<Route exact strict path='/Form/fill/:id' component={ViewFormContainer} />
				<Route exact strict path='/form/thankyou' component={ThankYouContainer} />
				<Route exact strict path='/form/adminacess' component={AdminAcessContainer} />
			</Router> */}
			<div>
				{/* <h1>hi</h1> */}
				<ResponseFormContainer/>
				{/* <ViewFormContainer/> */}
			</div>
		</div>
	)
}
export default App;