<template>
  <div class="profile-view">
    <div v-if="menuItem"><UserIdeas /></div>
    <div v-else><ProfileContainer :userInfo="userProfile" /></div>
    <div><ProfileMenuBar @getMenuItem="getMenuAccount($event)" /></div>
  </div>
</template>

<script>
import ProfileMenuBar from "../components/ProfileMenuBar.vue";
import ProfileContainer from "../components/ProfileContainer.vue";
import UserIdeas from "../components/UserIdeas.vue";
export default {
  name: "ProfileView",
  components: { ProfileMenuBar, ProfileContainer, UserIdeas },
  data() {
    return {
      id: "",
      userProfile: "",
      menuItem: "",
    };
  },
  created() {
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.id = data.id;
    this.$store.dispatch("fetchAccessToken");
    this.$axios.get(`api/v1/User/${this.id}`, this.$axios.defaults.headers["Authorization"]).then((res) => {
      this.userProfile = res.data.content;
    });
  },
  methods: {
    getMenuAccount(getMenuAccount) {
      this.menuItem = getMenuAccount;
    },
  },
};
</script>

<style scoped>
.profile-view {
  display: grid;
  grid-template-columns: 87% 13%;
  height: 1080px;
  width: 1400px;
  transform: translate(280px, -70px);
  /* border: solid red; */
}
div:nth-child(2) {
  position: relative;
}
@media screen and (max-width: 1366px) {
  .profile-view {
    grid-template-columns: 87% 13%;
    width: 79%;
    border: solid;
  }
}
@media screen and (max-width: 1025px) {
  .profile-view {
    grid-template-columns: 100%;
    width: 850px;
    position: relative;
    left: 80px;
    grid-template-rows: 7% 93%;
  }
  .menubar {
    height: fit-content;
  }
}
@media screen and (max-width: 769px) {
  .profile-view {
    grid-template-columns: 100%;
    width: 700px;
    left: 20px;
    height: 1380px;
  }
}
</style>
