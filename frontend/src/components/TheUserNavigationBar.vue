<script>
import SmartRouteLink from './SmartRouteLink.vue';
export default {
  name: 'TheUserNavigationBar',

  components : {
    SmartRouteLink
  },

  props: {
    links: Array,
    header_link: Object
  },

  methods : {
    async attemptLogout(){
            await this.$store.dispatch("user/attemptLogout");
        }
  }
}
</script>
<template>
    <header class="container-fluid">
        <div class="row">
            <nav class="navbar navbar-expand-lg navbar-dark mk-background">
                <div class="container-fluid" id="actual-navbar">
                    <SmartRouteLink v-if="header_link" :link="header_link" class="h4"/>
                    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span class="navbar-toggler-icon"></span>
                   </button>
                <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li v-for="link, key in links" :key="key" class="nav-item">
                            <SmartRouteLink :link="link"/>
                        </li>
                        <li>
                            <a href="" @click.prevent="attemptLogout" class="nav-link" v-showto="1"><span>Log out</span></a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>