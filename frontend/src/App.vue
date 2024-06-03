<script>
import PageLayoutUser from "./components/PageLayoutUser.vue"
import PageLayoutAdmin from "./components/PageLayoutAdmin.vue";
import ButtonBackToTop from "./components/ButtonBackToTop.vue";
import MessageDisplay from "./components/MessageDisplay.vue";
import PageLoading from "./components/PageLoading.vue";
export default {
  name: 'App',
  components: {
    PageLayoutUser,
    PageLayoutAdmin,
    ButtonBackToTop,
    MessageDisplay,
    PageLoading
  },
  data() {
    return {
    }
  },
  computed: {
    adminRouteActive: function () {
      return this.$store.getters['navigation/adminRouteActive'];
    },
    loaded: function () {
      return this.$store.getters['navigation/loaded'] && this.$store.getters['navigation/firstPageLoaded'];
    }
  },

  async mounted() {
    this.$store.commit("user/changeToken", localStorage.getItem("token") ?? "");
    await this.$store.dispatch("navigation/fetch");
  }
}
</script>

<template>
  <div>
    <PageLoading :class="{ hidden: loaded }" />
    <div :class="{ hidden: !loaded }" id="app">
      <PageLayoutUser v-if="!adminRouteActive" />
      <PageLayoutAdmin v-if="adminRouteActive" />
      <ButtonBackToTop />
      <MessageDisplay />
    </div>
  </div>
</template>

<style>
@import '@/assets/styles/main.css'
</style>
