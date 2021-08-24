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
} from 'react-router-dom'

function App() {
	return (
		<div>
			{/* <div>
				<LoginPage />
			</div> */}
			<Router>
				<Route exact path='/login' component={LoginPage}/>
				<Route exact path='/' component={CreateFormContainer} />
				<Route exact path='/preview' component={PreviewFormContainer} />
				<Route exact path='/fillForm' component={ViewFormContainer} />
				<Route exact path='/thankyou' component={ThankYouContainer} />
			</Router>
			<div>
				{/* <ResponseFormContainer/> */}
				{/* <ViewFormContainer/> */}
			</div>
		</div>
	)
}
export default App;