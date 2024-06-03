import axios from "axios";
import store from "../store/store";
import router from "../router/router";

const axiosInstance = axios.create({baseURL : process.env.VUE_APP_API_URL});

axiosInstance.interceptors.request.use(
    function(config){
        store.commit("user/checkToken");
        config.headers["Authorization"] = "bearer " + store.getters['user/token'];
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "multipart/form-data";
        config.params = {...config.params, _method : `${config.method}`};
        if(config.method != 'get'){
            config.method = 'post';            
        }
        return config;
    }, function (error){
        console.log(error);
    }
)


axiosInstance.interceptors.response.use(
function (response){
    if(response.data){
        return {success : true, data : response.data, message : response.data.message, body : response.data.body};
    }
}, 
function(error){
    let response = {success : false};
    if(typeof error.response === undefined){
        return response;
    }
    if((error.response.status === 401) && store.getters['user/token']){
        store.commit("user/changeToken", "");
        router.push("/login").catch(()=>{});
    }
    store.commit("messages/display", {text : error.response.data.message ?? error.response.data.error, success : false});
    if(!error.response.data.errors){
        return response;
    }
    response.errors = {};
    for(let key of Object.keys(error.response.data.errors)){
        response.errors[key] = error.response.data.errors[key][0];
    }
    return response;
}
);

export default axiosInstance;