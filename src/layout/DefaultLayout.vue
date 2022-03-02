<template>
  <div class="header">
    <img class="header-logo-image" src="../assets/images/logo.jpg" />
    <div class="header-user">
      <img class="header-user-image" src="../assets/pic/users.png" />
      <ul class="header-user-info">
        <li style="border-bottom: 2px solid black; padding: 0 4px" @click="userss">Admin</li>
        <li class="header-user-logout" @click="logout">Logout</li>
      </ul>
    </div>
  </div>
  <Nav-Form />

  <div class="router-view">
    <slot />
  </div>
</template>

<script>
import NavForm from "@/components/NavForm.vue";

export default {
  components: {
    NavForm,
  },
  data() {
    return {};
  },
  computed: {
    User() {
      return JSON.parse(sessionStorage.getItem("Auth"));
      // return null;
    },
  },

  methods: {
    // logout() {

    //   this.$store.dispatch("logout");
    //   this.$router.push({ name: "login" });
    // },
    async logout() {
      try {
        this.$store.dispatch("fetchAccessToken");
        await this.$axios.delete(`api/v1/User/RevokeSelfToken`);
        this.$store.dispatch("logout");
        this.$router.push({ name: "login" });
      } catch (e) {
        //
      }
    },
  },
};
</script>
