<template>
  <div class="profile-container container">
    <div><ProfileOverview :user="userInfo" /></div>
    <div><ProfileInfo :userDetails="userInfo" /></div>
  </div>
</template>

<script>
import ProfileOverview from "./ProfileOverview.vue";
import ProfileInfo from "./ProfileInfo.vue";
export default {
  name: "ProfileContainer",
  components: {
    ProfileOverview,
    ProfileInfo,
  },
  props: {
    userInfo: Object,
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.profile-container {
  display: grid;
  grid-template-columns: 32% 62%;
  column-gap: 30px;
  position: absolute;
  top: 58px;
  left: 30px;
}
@media screen and (max-width: 1430px) {
  .profile-container {
    top: 30px;
    grid-template-columns: 30% 60%;
    left: 40px;
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
