<template>
  <div class="topic">
    <UserManage />
  </div>
</template>

<script>
import UserManage from "../components/UserManage.vue";
export default {
  name: "ManageView",
  components: {
    UserManage,
  },
};
</script>

<style>
.topic {
  position: relative;
  left: 270px;
  width: calc(100% - 270px);
}
@media (min-width: 481px) and (max-width: 1025px) {
  .topic {
    position: relative;
    left: 80px;
    width: calc(100% - 80px);
  }
}
@media screen and (max-width: 480px) {
  .topic {
    position: relative;
    left: 0px;
    width: 100%;
  }
}
</style>
