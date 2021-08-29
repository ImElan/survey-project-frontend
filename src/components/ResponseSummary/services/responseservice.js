import http from "./http-common";


class ResponseService {
    doGetById(formId) {
        return http.get(`response/${formId}`);
    }

}

export default new ResponseService();

