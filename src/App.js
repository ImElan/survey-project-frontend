import CreateFormContainer from './containers/CreateFormContainer';
import ResponseFormContainer from './containers/ResponseFormContainer';
import PreviewFormContainer from './containers/PreviewFormContainer';
import ViewFormContainer from './containers/ViewFormContainer';
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
				<Route exact path = '/' component = {CreateFormContainer} />
				<Route exact path = '/preview' component = {PreviewFormContainer} />
				<Route exact path = '/fillForm' component = {ViewFormContainer} />
			</Router>
			<div>
				{/* <ResponseFormContainer/> */}
				{/* <ViewFormContainer/> */}
			</div>
		</div>
	);
}

export default App;
