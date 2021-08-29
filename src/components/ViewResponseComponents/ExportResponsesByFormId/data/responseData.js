import axios from 'axios';

const baseUrl = 'http://localhost:8080/response/';

export const getResponsesByFormId = async(formId) => {
    try {
        const {data} = await axios.get(baseUrl + formId);
        return data;
    } 
    catch (error) {
        throw error;
    }
}
