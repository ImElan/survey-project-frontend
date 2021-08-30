import http from "./http-common";


class AdminDataService{
    doGetById(id){
        return http.get(`/${id}`);
    }

    doUpdate(id, role){
        // console.log(id);
        // console.log(role);
        return http.put(`/${id}`,role);
    }
}

export default new AdminDataService();

