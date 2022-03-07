<template>
  <div class="header">
    <img class="header-logo-image" src="../assets/images/logo.jpg" />
    <div class="header-user">
      <img class="header-user-image" src="../assets/pic/users.png" />
      <ul class="header-user-info">
        <li style="border-bottom: 2px solid black; padding: 0 4px, cursor: pointer" @click="showProfile">Profile</li>
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
    return {
      id: "",
    };
  },
  created() {
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.id = data.id;
  },
  computed: {
    User() {
      return JSON.parse(sessionStorage.getItem("Auth"));
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
    showProfile() {
      this.$router.push({ name: "profileView", params: { id: this.id } });
    },
  },
};
</script>
