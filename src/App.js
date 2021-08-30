import CreateFormContainer from './containers/CreateFormContainer';
import ResponseFormContainer from './containers/ResponseFormContainer';
import PreviewFormContainer from './containers/PreviewFormContainer';
import ViewFormContainer from './containers/ViewFormContainer';
import LoginPage from './components/TakeSurveyComponents/GoogleLogin/LoginPage';
// import { LoginProvider } from './components/TakeSurveyComponents/GoogleLogin/LoginContext';
import ThankYouContainer from './containers/ThankYouContainer';
import FormResponseContainer from './containers/FormResponseContainer';
import ResponseSummary from './components/ResponseSummary/responseSummary';
import AdminAcessContainer from './containers/AdminAcessContainer';

import EditResponse from './components/EditResponse/EditResponse';
import Displayforms from './components/DisplayallformHrComponents/Displayforms';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Link
} from 'react-router-dom'

function App() {
	return (
		<div>
			<Router>
				<Route exact path='/' component={LoginPage} />
				<Route exact strict path='/form/create' component={CreateFormContainer} />
				<Route exact strict path='/preview' component={PreviewFormContainer} />
				<Route exact strict path='/Form/fill/:id' component={ViewFormContainer} />
				<Route exact strict path='/form/thankyou' component={ThankYouContainer} />
				<Route exact strict path='/form/adminacess' component={AdminAcessContainer} />
				<Route exact strict path='/loginSuccess' component={Displayforms} />
				<Route exact strict path='/viewresponses' component={ResponseSummary}></Route>
				<Route exact strict path='/editresponse/:formId/:userId' component={EditResponse}></Route>

			</Router>
			<div>
				{/* <h1>hi</h1> */}
				{/* <ResponseFormContainer /> */}
				{/* <ViewFormContainer/> */}
			</div>

		</div>
	)
}
export default App;