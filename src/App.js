import CreateFormContainer from './containers/CreateFormContainer';
import ResponseFormContainer from './containers/ResponseFormContainer';
import PreviewFormContainer from './containers/PreviewFormContainer';
import ViewFormContainer from './containers/ViewFormContainer';
import LoginPage from './components/TakeSurveyComponents/GoogleLogin/LoginPage';
// import { LoginProvider } from './components/TakeSurveyComponents/GoogleLogin/LoginContext';
import ThankYouContainer from './containers/ThankYouContainer';


import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Link
} from 'react-router-dom';
import HRContainer from './containers/HRContainer';
import App2 from './containers/testing';

function App() {
	return (
		<div>
			<div>
				<App2 />
				{/* <HRContainer/> */}
			</div>
			{/* <Router>
				<Route exact path='/' component={CreateFormContainer} />
				<Route exact path='/preview' component={PreviewFormContainer} />
				<Route exact path='/fillForm' component={ViewFormContainer} />
				<Route exact path='/thankyou' component={ThankYouContainer} />
				<Route exact path='/hr' component={HRContainer} />

			</Router> */}
			<div>
				{/* <ResponseFormContainer/> */}
				{/* <ViewFormContainer/> */}
			</div>
		</div>
	)
}
export default App;