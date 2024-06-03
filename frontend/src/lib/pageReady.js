import store from "@/store/store";

function pageReady(){
    store.commit("navigation/changeFirstPageLoaded", true);
}

export default pageReady;