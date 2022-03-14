<template>
  <div class="header">
    <img class="header-logo-image" src="../assets/images/logo.jpg" />
    <div class="header-user">
      <!-- <img class="header-user-image" src="../assets/pic/users.png" /> -->
      <img class="header-user-image" src=" https://i.pinimg.com/236x/e8/48/4d/e8484d6b06aa3f16206627c023a159fd.jpg" alt="user avatar" />

      <ul class="header-user-info">
        <li class="user-emails">{{user.username}}</li>
        <li @click="showProfile">My Profile</li>
        <li class="header-user-logout" @click="logout">
          <i class="bx bx-log-out bx-xs bx-fw" />
          Logout
        </li>
      </ul>
    </div>
  </div>
  <Nav-Form :id="user.id"/>

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
      user: {},
    };
  },
  created() {
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.user = data;
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
      this.$router.push({ name: "profileView", params: { id: this.user.id } });
    },
  },
};
</script>
