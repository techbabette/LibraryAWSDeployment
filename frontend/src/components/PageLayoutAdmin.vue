<script>
import TheAdminSidebar from './TheAdminSidebar.vue';
export default {
  name: 'AdminLayout',
  components: {
    TheAdminSidebar
  },
  data() {
    return {
    }
  },
  computed: {
    navbarLinks: function () {
      return this.$store.getters['navigation/adminNavbar'];
    },
    footerLinks: function () {
      return this.$store.getters['navigation/adminFooter'];
    },
  }
}
</script>

<template>
  <div class="d-flex flex-row min-vh-100">
    <TheAdminSidebar :navigation_links="navbarLinks" :footer_link="footerLinks" />
    <router-view class="admin-page col-12 px-2 py-1"></router-view>
  </div>
</template>

<style scoped>
.admin-page {
  max-width: 80vw;
}

@media only screen and (min-width: 600px) {
  .admin-page {
    max-width: 90vw;
  }
}
</style>
