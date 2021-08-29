// import Header from './components/ThankYoupageComponents/Header';
// import CreateFormContainer from './containers/CreateFormContainer';
// import ThankYouContainer from './containers/ThankYouContainer';
// import Displayforms from './components/DisplayallformHrComponents/Displayforms';
// function App() {
// 	return (
// 		<div>
// 			{/* <CreateFormContainer /> */}
// 			<Displayforms/>
// 		</div>
// 	);
// }

// export default App;

import CreateFormContainer from './containers/CreateFormContainer';
import ResponseFormContainer from './containers/ResponseFormContainer';
import PreviewFormContainer from './containers/PreviewFormContainer';
import ViewFormContainer from './containers/ViewFormContainer';
import LoginPage from './components/TakeSurveyComponents/GoogleLogin/LoginPage';
// import { LoginProvider } from './components/TakeSurveyComponents/GoogleLogin/LoginContext';
import ThankYouContainer from './containers/ThankYouContainer';
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
				<Route exact path='/' component={LoginPage}/>
				<Route exact strict path='/form/create' component={CreateFormContainer} />
				<Route exact strict path='/form/preview' component={PreviewFormContainer} />
				<Route exact strict path='/Form/fill/:id' component={ViewFormContainer} />
				<Route exact strict path='/form/thankyou' component={ThankYouContainer} />
				<Route exact strict path = '/loginSuccess' component = {Displayforms} />
			</Router>
			<div>
				{/* <ResponseFormContainer/> */}
				{/* <ViewFormContainer/> */}
			</div>
		</div>
	)
}
export default App;
