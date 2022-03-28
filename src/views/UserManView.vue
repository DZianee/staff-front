<template>
  <div class="user-management container">
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

<style scoped>
.user-management {
  right: -8.1%;
  width: calc(100% - 137px);
  padding-top: 2%;
}
@media screen and (max-width: 1440px) {
  .user-management {
    width: calc(100% - 272px);
  }
}
@media screen and (max-width: 1366px) {
  .user-management {
    width: calc(100% - 300px);
    right: -9%;
  }
}
@media screen and (max-width: 1025px) {
  .user-management {
    width: calc(100% - 101px);
    right: -4%;
  }
}
@media screen and (max-width: 768px) {
  .user-management {
    width: calc(100% - 92px);
    right: -5%;
  }
}
@media screen and (max-width: 765px) {
  .user-management {
    width: calc(100% - 224px);
    right: -5%;
  }
}
@media screen and (max-width: 480px) {
  .user-management {
    width: 100%;
    right: 0;
    top: 80px;
    height: 2650px;
  }
}
@media screen and (max-width: 450px) {
  .user-management {
    width: 100%;
    right: 0;
    top: 80px;
    height: 2650px;
  }
}
/* @media (min-width: 481px) and (max-width: 1025px) {
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
    top: 70px;
    width: 100%;
  }
} */
</style>
