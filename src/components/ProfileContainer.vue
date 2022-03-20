<template>
  <div class="profile-container">
    <!-- <div v-case="'profile'"><ProfileInfo :userDetails="userInfo" /></div> -->
    <!-- <div v-case="'idea'"><UserIdeas /></div> -->
    <!-- <div class="profile_sidebar">
    <ul class="sidebar-items">
      <li class="nav-item profile">
        <div class="nav-link active my-profile">
          <span>
            <i class="bx bx-user-pin bx-sm"></i>
          </span>
          My profile
        </div>
      </li>
      <li class="nav-item ideas">
        <div class="nav-link" @click="getMenuAccount">
          <span>
            <i class="bx bx-news bx-sm"></i>
          </span>
          Ideas posted
        </div>
      </li>
    </ul>
  </div> -->
  </div>
</template>

<script>
// import ProfileInfo from "./ProfileInfo.vue";
// import UserIdeas from "./UserIdeas.vue";
export default {
  name: "ProfileContainer",
  components: {
    // ProfileOverview,
    // ProfileInfo,
    // UserIdeas
  },
  props: {
    userInfo: Object,
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
/* .profile-container {
  display: grid;
  grid-template-columns: 30% 62%;
  column-gap: 10px;
  left: -40px;
  position: absolute;
  top: 78px;
} */
@media screen and (max-width: 1430px) {
  .profile-container {
    top: 30px;
    grid-template-columns: 30% 60%;
    left: 40px;
  }
}
@media screen and (max-width: 1366px) {
  .profile-container {
    top: 30px;
    grid-template-columns: 30% 60%;
    left: 0;
  }
}
@media screen and (max-width: 1280px) {
  .profile-container {
    top: 30px;
    grid-template-columns: 30% 58%;
    left: 40px;
  }
}
@media screen and (max-width: 1025px) {
  .profile-container {
    grid-template-columns: 100%;
    position: absolute;
    top: 30px;
    row-gap: 50px;
  }
}
</style>
