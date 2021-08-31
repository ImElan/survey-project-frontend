import axios from 'axios';

const baseUrl = 'http://localhost:8080/response/';

export const getResponsesByFormId = async (formId) => {
    const idToken = localStorage.getItem('accessToken');

    try {
        const { data } = await axios.get(baseUrl + formId, {
            headers: {
                "Authorization": `Bearer ${idToken}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return data;
    }
    catch (error) {
        throw error;
    }
}
