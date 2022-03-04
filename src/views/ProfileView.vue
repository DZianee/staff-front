<template>
  <div class="profile-view">
    <div><ProfileMenuBar /></div>
    <div><ProfileContainer :userInfo="userProfile" /></div>
  </div>
</template>

<script>
import ProfileMenuBar from "../components/ProfileMenuBar.vue";
import ProfileContainer from "../components/ProfileContainer.vue";
export default {
  name: "ProfileView",
  components: { ProfileMenuBar, ProfileContainer },
  data() {
    return {
      id: "",
      userProfile: "",
    };
  },
  created() {
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.id = data.id;
    // alert("it is" + this.id);
    this.$store.dispatch("fetchAccessToken");
    this.$axios.get(`api/v1/User/${this.id}`, this.$axios.defaults.headers["Authorization"]).then((res) => {
      this.userProfile = res.data.content;
      console.log(res.data.content.username);
    });
  },
  methods: {},
};
</script>

<style scoped>
.profile-view {
  display: grid;
  grid-template-columns: 13% 80%;
  height: 500px;
}
div:nth-child(2) {
  position: relative;
}
button {
  /* color: black; */
  background-color: red;
  margin-left: 240px;
  color: blue;
  border: solid;
  width: 100px;
}
</style>
