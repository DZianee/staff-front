<template>
  <div class="header">
    <img class="header-logo-image" src="../assets/images/FGW_logo_d.jpeg" />
    <div class="header-user">
      <!-- <img class="header-user-image" src="../assets/pic/users.png" /> -->
      <img class="header-user-image" :src="`https://${user.profileImage}`" alt="user avatar" />

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
      user: {},
      id:'',
    };
  },  
  created() {
    // this.$store.dispatch("getUser");
    // const data = JSON.parse(this.$store.state.user);
    // this.user = data;
    try {
      this.$store.dispatch("getUser");
      const data = JSON.parse(this.$store.state.user);
      this.$axios.get(`api/v1/User/${data.id}`, this.$axios.defaults.headers["Authorization"]).then((res) => {
        this.user = res.data.content;
        this.id = this.user.id;
        console.log(this.id)
      });
    } catch {
      //
    }
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
