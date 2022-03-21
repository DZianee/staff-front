<template>
  <div class="profile-overview container">
    <div class="card">
      <div class="user-avatar">
        <img src="https://i.9mobi.vn/cf/Images/tt/2021/8/20/anh-avatar-dep-54.jpg" class="card-img-top" alt="user avatar" />
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ user.username }}</h5>
        <h6 class="card-text">{{ user.departmentName }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileOverview",
  props: {
    user: Object,
  },
};
</script>

<style scoped>
.profile-overview {
  display: flex;
  justify-content: center;
  width: 90%;
  height: fit-content;
  position: relative;
  top: 80px;
}
.card {
  width: 80%;
  height: fit-content;
  border-radius: 12px;
}
img {
  padding: 10px;
  border-radius: 50%;
  object-fit: cover;
  width: 240px;
  height: 240px;
  position: relative;
  left: 25px;
}
.card-body h5,
.card-body h6 {
  text-align: center;
  padding: 5px;
}
h5 {
  font-weight: 600;
}
@media screen and (max-width: 1440px) {
  .card {
    width: 100%;
    height: 300px;
  }
  img {
    left: 25px;
    width: 220px;
    height: 200px;
  }
}
@media screen and (max-width: 1366px) {
  img {
     left: 18px;
  }
}
@media screen and (max-width: 1025px) {
  .card {
    width: 40%;
    margin-left: 20px;
  }
  .profile-overview {
    width: 90%;
    top: 40px;
  }
  img{
    width: 230px;
    height: 200px;
    left: 40px;
  }
}
@media screen and (max-width: 769px) {
  .card {
    width: 50%;
    height: 260px;
    margin-left: -30px;
  }
  .profile-overview {
    width: 80%;
    left: 30px;
  }
  img{
    width: 210px;
    height: 160px;
    left: 25px;
  }
  h5{
    font-size: 18px;
  }
  h6{
    font-size: 16px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .profile-overview {
    left: 5px;
    top: 0px;
  }
  .card {
    width: 74%;
    height: 200px;
    margin-left: 0px;
  }
  img{
    width: 180px;
    height: 140px;
    left: 32px;
  }
  .card-body{
    position: relative;
    top: -28px;
  }
  h5{
    font-size: 16px;
  }
  h6{
    font-size: 14px;
  }
}
</style>
