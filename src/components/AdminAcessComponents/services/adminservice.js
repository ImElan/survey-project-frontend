import http from "./http-common";


class AdminDataService{
    doGetById(id){
        return http.get(`/${id}`);
    }

    doUpdate(id, data){
        return http.put(`/${id}`,data);
    }
}

export default new AdminDataService();

