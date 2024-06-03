import axios from "@/axios/axios"
import store from "@/store/store"
async function handleParamRequest(paramString, caller = 0){
    let httpVerbs = ["get", "post", "put", "delete", "patch"];
    let verb = paramString.split('|')[0];
    let target = paramString.split('|')[1];

    let result = {};
    if(verb === "dispatch"){
        result = await store.dispatch(target, caller);
    }

    let url = target + (caller ? `/${caller}` : "");
    if(httpVerbs.includes(verb)){
        result = await axios({method : verb, url})
    }

    return result;
}

export default handleParamRequest;