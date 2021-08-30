import React, { useEffect, useState, useContext } from 'react';
import './LoginPage.css'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useHistory, Redirect } from "react-router-dom";

function LoginPage() {

  const [redirectEmployee, setRedirectEmployee] = useState(false)
  const [redirectHr, setRedirectHr] = useState(false)
  const [inValid, setInValid] = useState(false);

  let history = useHistory();
  let formid = 1;

  let formid = 1;

  useEffect(() => {
    var x = localStorage.getItem('isEmployee');
    var y = localStorage.getItem('isHr');
    if (x == "true") {
      console.log("Employee Path " + x);
      setRedirectEmployee(true);
    }
    if (y == "true") {
      console.log("Hr Path" + y);
      setRedirectHr(true);
    }
  })

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      let refreshToken = localStorage.getItem("refreshToken");
      if (
        refreshToken &&
        error.response.message === 'ACCESS_TOKEN_EXPIRED' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return axios
          .get('http://localhost:8080/api/auth/refreshToken/getToken', {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          })
          .then((res) => {
            if (res.status === 200 || res.status === 400) {
              localStorage.setItem("accessToken", res.data.accessToken);
              console.log("Access token refreshed!");
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );

  const responseSuccessGoogle = (response) => {
    console.log(response)
    var idToken = response.tokenId;
    console.log(idToken);
    axios.get('http://localhost:8080/api/auth/login/oauth/google', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(elan => {
      console.log(elan);
      let { accessToken, refreshToken, user } = elan;
      var check = elan.data.user.role ;
      console.log(check);
      if (check == "EMPLOYEE") {
        localStorage.setItem('isEmployee', true);
        setRedirectEmployee(true);
      } else if (check == "HR"){
        localStorage.setItem('isHr', true);
        setRedirectHr(true);
      }
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
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
        <h2>Survey Tool</h2>
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
      <div>
        {
          redirectEmployee ? <Redirect to={{
            pathname: `/form/fill/${formid}`,
            state: { from: history.location.pathname }
          }}
          /> : null
        }
      </div>
      <div>
        {
          redirectHr ? <Redirect to={{
            pathname: `/form/create`,
            state: { from: history.location.pathname }
          }}
          /> : null
        }
      </div>
    </div>
  )
}
export default LoginPage;
