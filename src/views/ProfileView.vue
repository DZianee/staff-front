<template>
  <div class="profile-view body-content container" v-if="userProfile && ideaUser">
    <!-- <div><ProfileContainer :userInfo="userProfile" /></div> -->
    <ProfileMenuBar @open-option="openProfile" @open-options="openIdea" />
    <ProfileOverview :user="userProfile" />
    <div v-if="choice === 'profile'">
      <ProfileInfo :userDetails="userProfile" />
    </div>
    <div v-else-if="choice === 'idea'">
      <UserIdeas :userIdea="ideaUser" />
    </div>
    <div v-else>
      <ProfileInfo :userDetails="userProfile" />
    </div>
  </div>
</template>

<script>
import ProfileMenuBar from "../components/ProfileMenuBar.vue";
// import ProfileContainer from "../components/ProfileContainer.vue";
import UserIdeas from "../components/UserIdeas.vue";
import ProfileOverview from "../components/ProfileOverview.vue";
import ProfileInfo from "../components/ProfileInfo.vue";
export default {
  name: "ProfileView",
  components: {
    ProfileOverview,
    ProfileInfo,
    ProfileMenuBar,
    UserIdeas,
  },
  data() {
    return {
      id: "",
      userProfile: "",
      menuItem: "",
      choice: "",
      ideaUser: "",
    };
  },
  created() {
    document.title = "Profile";
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.id = data.id;
    this.$store.dispatch("fetchAccessToken");
    this.$axios.get(`api/v1/User/${this.id}`, this.$axios.defaults.headers["Authorization"]).then((res) => {
      this.userProfile = res.data.content;
    });
    this.$axios
      .post(
        `api/v1/Idea/user/${this.id}`,
        { searchTitle: "", sortTitle: "", sortCreatedDate: "", sortUserName: "" },
        this.$axios.defaults.headers["Authorization"]
      )
      .then((res) => {
        this.ideaUser = res.data.content;
        // for (var idea of this.ideaUser) {
        // }
        // this.ideaUser.startDate = new Date(this.ideaUser.startDate).toLocaleString();
      });
  },
  methods: {
    openProfile(e) {
      this.choice = e;
    },
    openIdea(e) {
      this.choice = e;
    },
  },
  // methods: {
  //   getMenuAccount(getMenuAccount) {
  //     this.menuItem = getMenuAccount;
  //   },
  //   openProfile(id) {
  //     this.$emit("getMenuItem", id);
  //   },
  //   openIdea(id) {
  //     this.$emit("getMenuItem", id);
  //   },
  // },
};
</script>

<style scoped>
.profile-view {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  column-gap: 10px;
  height: 100%;
  position: relative;
  top: 50px;
}
@media screen and (max-width: 1440px) {
  .profile-view {
    grid-template-columns: 0.7fr 1.8fr 3.2fr;
    /* width: 79%; */
  }
}
@media screen and (max-width: 1025px) {
  .profile-view {
    grid-template-columns: 100%;
    grid-template-rows: 0.5fr 1.5fr 3fr;
    top: 20px;
  }
}
@media screen and (max-width: 769px) {
  .profile-view {
    width: 100%;
    grid-template-rows: 0.2fr 1.3fr 3fr;
  }
}
@media screen and (min-width: 320px) and (max-width: 483px) {
  .profile-view {
    grid-template-rows: 0.2fr 0.9fr 3fr;
    top: 100px;
  }
}
</style>
