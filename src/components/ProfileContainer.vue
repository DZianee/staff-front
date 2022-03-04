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
  grid-template-columns: 40% 55%;
  column-gap: 40px;
  position: absolute;
  top: 58px;
}
</style>
