// import CreateFormContainer from './containers/CreateFormContainer';
import { useEffect, useState } from 'react';
import ResponseFormContainer from './containers/ResponseFormContain';

function App() {
	const [submitted, setSubmitted] = useState(false);
	/*useEffect(() => {
		const data = axios.get(path,requestbody)
		if (data!=null) setSubmitted(true)
	},[])*/
	return (
		<div>
			{/* <div>
				<CreateFormContainer />
			</div> */
			!submitted && <div>
				<ResponseFormContainer setSubmitted = {setSubmitted}/>
			</div>
			/*submitted && <div>
				<ThanksContainer />
			</div> */}
		</div>
	);
}

export default App;
