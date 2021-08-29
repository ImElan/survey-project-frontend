import React, { useEffect, useState, useContext } from 'react';
import './LoginPage.css'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function LoginPage() {

  const [inValid, setInValid] = useState(false);

  let history = useHistory();

  useEffect(() => {
    var x = localStorage.getItem('isEmployee');
    var y = localStorage.getItem('isHr');
    if(x == "true"){
      console.log("Employee Path " + x);
      //history.push("/Employee_Path");                     // Aman please add the route to Take Survey Form Page here replacing "Employee_Path"
    }
    if(y == "true"){
      console.log("Hr Path" + y);
      //history.push("/Hr_Path");                          // Aman please add the route to Create Survey Form Page here replacing "Hr_Path"
    }
  })

  const responseSuccessGoogle = (response) => {
    console.log(response)
    var idToken = response.tokenId ;
    console.log(idToken);
    axios.get('http://localhost:8080/api/auth/login/oauth/google', {      
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(elan => {
      console.log(elan)
      var check = elan.data.user.role ;
      console.log(check);
      if ( check == "EMPLOYEE") {                      
        localStorage.setItem('isEmployee', true);
        //history.push("/Employee_Path");                     // Aman please add the route to Take Survey Form Page here replacing "Employee_Path"
      } else {
        localStorage.setItem('isHr', true);
        //history.push("/Hr_Path");                          // Aman please add the route to Create Survey Form Page here replacing "Hr_Path"
      }
      localStorage.setItem('apiResponse', JSON.stringify(response));
      localStorage.setItem('backEndResponse', JSON.stringify(elan));
      localStorage.setItem('isLoggedIn', true);
    })
  }

  const responseErrorGoogle = (response) => {
    console.log(response)
    setInValid(true)
  }

  return (
    <div className='div-login'>
      <div className='Title'>
        <h2>Survey Form</h2>
        <div className="newuser">
          <GoogleLogin className="google"
            clientId="104208248429-bt7t5eo6pce3db752p4rbdh9ica46ap1.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>

      <div className="company">
        <h3 className="accolite">Accolite</h3>
        <h3 className="digital">Digital</h3>
      </div>
      <div className="message">
        {
          inValid ? <h4 className="tryagain">Please try again!</h4>
            : null
        }
      </div>
    </div>
  )
}
export default LoginPage;