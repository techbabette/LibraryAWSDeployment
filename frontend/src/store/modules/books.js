import axios from "@/axios/axios";
import Vue from "vue";
export default{
    namespaced: true,
    state : {
        books : {

        },
        searchData : {
            sort : "created_at_desc",
            title : "",
            categories : [],
            authors : [],
            maximumPage : 1,
            page : 1,
            years : [],
        },
    },
    actions : {
        async fetch({state}, additionalOptions){
            let params = additionalOptions.params;

            let result = (await axios.get("/book", {params}));
            if(!result.success){
                return result;
            }

            let books = result.data.body.data;
            
            Vue.set(state.books, additionalOptions.name, books);
            return result;
        },
    },
    mutations : {
        setSearchParam(state, info){
            let {name, value} = info;
            state.searchData[name] = value;
        },
        clearSearchParams(state){
            state.searchData.title = "";
            state.searchData.sort = 0;
            state.searchData.categories = [];
            state.searchData.authors = [];
        },
        setSearchPage(state, newPage){
            state.searchData.currentPage = newPage;
        },
    },
    getters : {
        get: (state) => (alias) => {
            return state.books[alias];
        },
        getSearchParam : (state) => (param) => {
            return state.searchData[param];
        },
    },
}