<template>
  <div class="profile-info">
    <div><ProfileDetails :userDetails="userDetails" /></div>
    <div><ProfileAccountInfo :accountInfo="userDetails" /></div>
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
  /* border: solid lawngreen; */
  background-color: #e3f2fd;
  border-radius: 12px;
  padding: 35px;
}
div:not(:first-child) {
  margin-top: 90px;
}
</style>
