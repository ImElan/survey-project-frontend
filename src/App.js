import CreateFormContainer from './containers/CreateFormContainer';
import PreviewFormContainer from './containers/PreviewFormContainer';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'

function App() {
	return (
		<div>
		<Router>
				<Route exact path = '/' component = {CreateFormContainer} />
				<Route exact path = '/preview' component = {PreviewFormContainer} />
			</Router>

		</div>
	);
}

export default App;
