import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';

import LandingPage from "../components/PageLanding.vue";
import BooksPage from "../components/PageBooksSearch.vue";
import BookPage from "../components/PageBookSingle.vue";
import YourBooks from "../components/PageUserBooks.vue";
import LoginPage from "../components/PageUserLogin.vue";
import RegistrationPage from "../components/PageUserRegister.vue";
import PageContact from "@/components/PageContact.vue";
import PageAuthor from "@/components/PageAuthor.vue";

import PageAdminDashboard from "../components/PageAdminDashboard.vue"
import PageAdminControl from "../components/PageAdminControl.vue"
import PageAdminLogs from "../components/PageAdminLogs.vue"

const routes = [
    {
      path : "/", component: LandingPage, name : "Home"
    },
    {
      path : "/books", component: BooksPage, name : "Books"
    },
    {
      path : "/book/:id", component: BookPage, name : "Book preview"
    },
    {
      path : "/yourbooks", component : YourBooks, name : "Your books"
    },
    {
      path : "/login", component : LoginPage, name : "Login"
    },
    {
      path : "/register", component : RegistrationPage, name : "Register"
    },
    {
      path : "/contact", component : PageContact, name : "Contact"
    },
    {
      path : "/author", component : PageAuthor, name : "Author"
    },
    {
      path : "/admin", component : PageAdminDashboard, name : "Admin Dashboard"
    },
    {
      path : "/admin/control", component : PageAdminControl, name : "Admin Control"
    },
    {
      path : "/admin/logs", component : PageAdminLogs, name : "Admin Logs"
    }
  ]

Vue.use(Router);
  
const router = new Router({
    mode: 'history',
    routes
})

async function routerBeforeEach(to, from, next){
  if(!store.getters['navigation/loaded']){
    setTimeout(() => {routerBeforeEach(to, from, next)}, 10);
    return;
  }
  let requestedPage = to.name;
  let userAllowedAccess = store.getters['navigation/links'].some(link => link.to === requestedPage);
  if(userAllowedAccess){
    document.title = to.name;
    store.commit("navigation/changeActiveRouteName", requestedPage);
    next();
    return;
  }
  router.push("/").catch(()=>{});
  console.warn("You're not allowed to see the requested page");
}

router.beforeEach((to, from, next) => routerBeforeEach(to, from, next));


export default router