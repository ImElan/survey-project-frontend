import CreateFormContainer from './containers/CreateFormContainer';
import ResponseFormContainer from './containers/ResponseFormContainer';
import PreviewFormContainer from './containers/PreviewFormContainer';
import ViewFormContainer from './containers/ViewFormContainer';
import LoginPage from './components/TakeSurveyComponents/GoogleLogin/LoginPage';
// import { LoginProvider } from './components/TakeSurveyComponents/GoogleLogin/LoginContext';
import ThankYouContainer from './containers/ThankYouContainer';
import FormResponseContainer from './containers/FormResponseContainer';


import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Link
} from 'react-router-dom'
import EditResponse from './components/EditResponse/EditResponse';

function App() {
	return (
		<div>
			<Router>
				<Route exact path='/' component={LoginPage}/>
				<Route exact strict path='/form/create' component={CreateFormContainer} />
				<Route exact strict path='/form/preview' component={PreviewFormContainer} />
				<Route exact strict path='/Form/fill/:id' component={ViewFormContainer} />
				<Route exact strict path='/form/thankyou' component={ThankYouContainer} />
				<Route exact strict path='/form/:formid/responses' component={FormResponseContainer} />
				<Route exact strict path='/form/edit' component={EditResponse} />

			</Router>
			<div>
				{/* <ResponseFormContainer/> */}
				{/* <ViewFormContainer/> */}
			</div>
		</div>
	)
}
export default App;