import http from "./http-common";


class AdminDataService{
    doGetById(email){
        // return http.get(`/${email}`);

        return http.get(`/api/auth/user/${email}`);
    }

    doUpdate(emaill, rolee){
        // console.log(id);
        // console.log(role);
        // return http.put(`/${emaill}`,{role: rolee});   
        // role = {"role":"PM"}
        // {role: "PM","HR"}

        var objj = {email: emaill, role: rolee}
        let tokenn = localStorage.getItem("accessToken");
        return http.patch(`/api/auth/grantAccess`,objj,{
            headers:{
                Authorization : tokenn 
            }
        });
    }
}

export default new AdminDataService();

