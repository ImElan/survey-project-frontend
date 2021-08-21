import React, {useEffect,useState} from 'react';
import './LoginPage.css'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function LoginPage() {

  const [isEmployee,setEmployee] = useState(false);
  const [isHr,setHr] = useState(false);
  const [isValid,setValid] = useState(false);
  const [inValid,setInValid] = useState(false);

  const responseSuccessGoogle = (response) => {
		console.log(response)
    axios.get('http://localhost:3000/api/auth/login/oauth/google', {
      headers : {
        Authorization : 'Bearer ${idToken}'
      }
    }).then(response => {
      console.log(response)
      if(response.user.role.equals("EMPLOYEE")){
        setEmployee(true);
      }else{
        setHr(true);
      }
    })
    setValid(true);
    window.localStorage.setItem("googleResponse", JSON.stringify(response));
	}
  
	const responseErrorGoogle = (response) => {
	  console.log(response)
     setInValid(true)
	}

              return(
                  <div className='div-login'>
                      <div className = 'Title'>
                          <h2>Survey Form</h2>
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
                      
                      <div className = "company">
                            <h3 className= "accolite">Accolite</h3>
                            <h3 className= "digital">Digital</h3>
                      </div>
                      <div className= "message">
                      {isValid ?
                        <h4>LogIn Successful</h4>
                        : null
                      }
                      {
                        inValid ? <h4 className = "tryagain">Please try again!</h4> 
                        : null
                      }
                      </div>
                  </div>
              )      
  }
export default LoginPage;