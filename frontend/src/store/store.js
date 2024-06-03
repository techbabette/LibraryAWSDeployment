import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/axios/axios";

import navigation from "./modules/navigation"
import user from './modules/user';
import books from './modules/books'
import messages from './modules/messages'
import admin from "./modules/admin"

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        navigation,
        user,
        books,
        messages,
        admin
    },
    actions : {
        async fetch(context, options){
            let {url, params} = options;

            let result = await axios.get(url, {params});

            return result;
        }
    }
})