<template>
  <div class="header">
    <img class="header-logo-image" src="../assets/images/logo.jpg" />
    <div class="header-user">
      <!-- <img class="header-user-image" src="../assets/pic/users.png" /> -->
      <img class="header-user-image" src=" https://i.pinimg.com/236x/e8/48/4d/e8484d6b06aa3f16206627c023a159fd.jpg" alt="user avatar" />

      <ul class="header-user-info">
        <li class="user-emails">{{username}}</li>
        <li @click="showProfile">My Profile</li>
        <li class="header-user-logout" @click="logout">Logout</li>
      </ul>
    </div>
  </div>
  <Nav-Form :id="id"/>

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
      username: "",
    };
  },
  created() {
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.id = data.id;
    this.username = data.username;
  },
  computed: {
    User() {
      return JSON.parse(this.$store.state.user);
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
    showProfile() {
      this.$router.push({ name: "profileView", params: { id: this.id } });
    },
  },
};
</script>
