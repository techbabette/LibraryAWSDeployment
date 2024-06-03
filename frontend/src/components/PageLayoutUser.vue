  <script>
  import TheUserNavigationBar from "./TheUserNavigationBar.vue";
  import TheUserFooterBar from "./TheUserFooterBar.vue";
  export default {
    name: 'UserLayout',
    components : {
      TheUserNavigationBar,
      TheUserFooterBar,
    },
    data(){
      return {
      }
    },
    computed : {
      navbarLinks : function(){
        return this.$store.getters['navigation/userNavbar'];
      },
      footerLinks : function(){
        return this.$store.getters['navigation/userFooter'];
      },
      HeaderLink : function(){
          return this.$store.getters['navigation/headerLink'];
      },
    }
  }
  </script>
  
  <template>
    <div>
      <TheUserNavigationBar :links="navbarLinks" :header_link="HeaderLink"/>
      <router-view></router-view>
      <TheUserFooterBar :links="footerLinks"/>
    </div>
  </template>

  <style>
  </style>
  