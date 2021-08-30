import React from 'react';
import './LoginPage.css';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LoginPage() {
	let history = useHistory();
	const formId = history.location?.state?.formId;

	const responseSuccessGoogle = async (response) => {
		var idToken = response.tokenId;
		try {
			const tokenResponse = await axios.get(
				'http://localhost:8080/api/auth/login/oauth/google',
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				}
			);
			// console.log(tokenResponse);
			localStorage.setItem('accessToken', tokenResponse.data.accessToken.tokenId);
			localStorage.setItem('refreshToken', tokenResponse.data.refreshToken.tokenId);
			localStorage.setItem(
				'accessTokenExpiration',
				tokenResponse.data.accessToken.expiration
			);
			localStorage.setItem(
				'refreshTokenExpiration',
				tokenResponse.data.refreshToken.expiration
			);
			localStorage.setItem('userId', tokenResponse.data.user.id);
			localStorage.setItem('role', tokenResponse.data.user.role);

			if (tokenResponse.data.user.role === 'HR') {
				history.push('/loginSuccess');
			} else if (tokenResponse.data.user.role === 'EMPLOYEE') {
				console.log(formId);
				if (formId) {
					history.push(`/Form/fill/${formId}`);
				}
			}
		} catch (error) {
			console.log(error.response);
		}
	};

	const responseErrorGoogle = (response) => {
		console.log(response);
	};

	return (
		<div className='div-login'>
			<div className='Title'>
				<h2>Survey Tool</h2>
				<div className='newuser'>
					<GoogleLogin
						className='google'
						clientId='7751709943-jf6qisb7dh788olfmi5v92g2civ7u4dv.apps.googleusercontent.com'
						buttonText='Login with Google'
						onSuccess={responseSuccessGoogle}
						onFailure={responseErrorGoogle}
						cookiePolicy={'single_host_origin'}
					/>
				</div>
			</div>

			<div className='company'>
				<h3 className='accolite'>Accolite</h3>
				<h3 className='digital'>Digital</h3>
			</div>
		</div>
	);
}
export default LoginPage;
