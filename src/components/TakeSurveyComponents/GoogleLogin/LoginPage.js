import React, {useEffect,useState} from 'react';
import { button, FormControl, FormGroup } from 'react-bootstrap';
import './LoginPage.css'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function LoginPage() {

  const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

  const handleChange1 = (e) => {
    setUsername(e.target.value)
    console.log(username);
  }
 
  const handleChange2 = (e) => {
    setPassword(e.target.value)
    console.log(password);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username + " " + password)
  }

  const responseSuccessGoogle = (response) => {
		console.log(response)
    axios({
      method: "POST",
      url : "http://localhost/api/googlelogin",
      data : {tokenId : response.tokenId}
    }).then(response => {
      console.log(response)
    })
	}
  
	const responseErrorGoogle = (response) => {
	  console.log(response)
	}

              return(
                  <div className='div-login'>
                      <div className = 'Title'>
                          <h2>Survey Form</h2>
                          {/* <div>
                            <form onSubmit={handleSubmit}>
                                  <input type='email' name='email' placeholder='email...' required onChange={() =>handleChange1}/>
                            
                                  <input type='password' name='pwd' placeholder='password...' required onChange={() =>handleChange2}/>

                                  <button type = 'submit' >Sign in</button>
                            </form>
                          </div> */}
                          <div className = "newuser">
                          <GoogleLogin className = "google"
                              clientId="104208248429-bt7t5eo6pce3db752p4rbdh9ica46ap1.apps.googleusercontent.com"
                              buttonText="Login with Google"
                              onSuccess={responseSuccessGoogle}
                              onFailure={responseErrorGoogle}
                              cookiePolicy={'single_host_origin'}
                          />
                          </div>
                      </div>
                  </div>
              )      
  }
export default LoginPage;