import axios from "@/axios/axios";
import router from '../../router/router';
export default{
    namespaced: true,
    state : {
        currentlyActiveRoute : "Home page",
        loaded : false,
        firstPageLoaded : false,
        links : []
    },
    actions : {
        async fetch(context){
            let result = await axios.get('/link/everyone');

            if(!result.success){
                return;
            }

            let links = result.data.links ?? result.data;
            let access_level = result.data.access_level;

            if((access_level === -1 || access_level === 0) && context.rootGetters['user/token']){
                context.commit("user/changeToken", "", {root : true});
                context.commit("messages/display", {text : "Session expired", success : false}, {root : true});
                router.push("/login").catch(()=>{});
            }

            context.commit("changeLinks", links);
            context.commit("changeLoaded", true);
        },
        async openBookPage(context, bookId){
            router.push({name : 'Book preview', params : {id : bookId}});

            return {success : true};
        }
    },
    mutations : {
        changeActiveRouteName(state, newRouteName){
            state.currentlyActiveRoute = newRouteName
        },
        changeLinks(state, newNavigationLinks){
            state.links = newNavigationLinks;
        },
        changeFirstPageLoaded(state, newState){
            state.firstPageLoaded = newState;
        },
        changeLoaded(state, newLoaded){
            state.loaded = newLoaded;
        }
    },
    getters : {
        links(state, getters, rootState, rootGetters){
            if((rootGetters['user/claims'].links)){
                return rootGetters['user/claims'].links;
            }

            return state.links;
        },
        firstPageLoaded(state){
            return state.firstPageLoaded;
        },
        loaded(state){
            return state.loaded;
        },
        activeRoute(state){
            return state.currentlyActiveRoute;
        },
        adminRouteActive(state, getters){
            return getters.activeRoute.startsWith("Admin");
        },
        headerLink(state, getters){
            return getters.links.filter(link => link.position === "header").sort((a,b) => b.weight - a.weight)[0];
        },
        userNavbar(state, getters){
            return getters.links.filter(link => link.position === "navbar").sort((a,b) => b.weight - a.weight);
        },
        userFooter(state, getters){
            return getters.links.filter(link => link.position === "footer").sort((a,b) => b.weight - a.weight);
        },
        adminNavbar(state, getters){
            return getters.links.filter(link => link.position === "adminNavbar").sort((a,b) => b.weight - a.weight);
        },
        adminFooter(state, getters){
            return getters.links.filter(link => link.position === "adminFooter").sort((a,b) => b.weight - a.weight)[0];
        }
    }
}