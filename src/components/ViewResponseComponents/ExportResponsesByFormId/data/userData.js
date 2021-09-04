import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/user/';

export const getUserById = async (uid) => {
    //const idToken = localStorage.getItem('accessToken');

    try {
        let user;
        await axios.get(baseUrl + uid)
        .then(
            response => {
                user = response.data;   
            }
        )    
        return user;
    }

    catch (error) {
        console.log(error.response);
    }
}
