<template>
  <div class="profile-info">
    <ProfileDetails :userDetails="userDetails" />
    <ProfileAccountInfo :accountInfo="userDetails" />
  </div>
</template>

<script>
import ProfileDetails from "./ProfileDetails.vue";
import ProfileAccountInfo from "./ProfileAccountInfo.vue";
export default {
  name: "ProfileInfo",
  components: { ProfileDetails, ProfileAccountInfo },
  props: {
    userDetails: Object,
  },
};
</script>

<style scoped>
.profile-info {
  /* border: solid blue; */
  background-color: #e3f2fd;
  border-radius: 12px;
  padding: 25px;
  margin-top: 10px;
}
div:not(:first-child) {
  margin-top: 95px;
}
@media screen and (max-width: 1440px) {
  .profile-info {
    margin-top: 10px;
  }
}
@media screen and (max-width: 1366px) {
  .profile-info {
    width: 100%;
  }
}
@media screen and (max-width: 1025px) {
  .profile-info {
    width: 80%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 35px;
    margin-top: 30px;
  }
}
@media screen and (max-width: 769px) {
  .profile-info {
    width: 84%;
    margin-top: 50px;
    padding: 35px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .profile-info {
    width: 100%;
    /* height: calc(100% + 40px); */
    margin-top: 30px;
    padding: 15px;
  }
}
</style>
