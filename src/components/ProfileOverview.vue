<template>
  <div class="profile-overview">
    <div class="card">
      <div class="user-avatar">
        <img src="https://i.9mobi.vn/cf/Images/tt/2021/8/20/anh-avatar-dep-54.jpg" class="card-img-top" alt="user avatar" />
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ user.username }}</h5>
        <h6 class="card-text">{{ user.department }}</h6>
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
  /* border: solid palegreen; */
  transform: translate(20px,0);
}
.card {
  width: 80%;
  border-radius: 12px;
}
img {
  padding: 10px;
  border-radius: 50%;
  object-fit: cover;
  width: 240px;
  height: 240px;
}
.card-body h5,
.card-body h6 {
  padding: 5px;
}
h5 {
  font-weight: 600;
}
@media screen and (max-width: 1430px) {
  .card {
    width: 85%;
  }
}
@media screen and (max-width: 1366px) {
  .card {
    width: 87%;
    transform: translate(-30px,0);
    height: 300px;
  }
  img {
  width: 200px;
  height: 200px;
}
}
@media screen and (max-width: 1280px) {
  .card {
    width: 90%;
  }
}
@media screen and (max-width: 1025px) {
  .card {
    width: 50%;
  }
  .profile-overview {
    width: 90%;
  }
}
@media screen and (max-width: 769px) {
  .card {
    width: 70%;
  }
  .profile-overview {
    width: 80%;
    position: relative;
    left: 30px;
  }
}
@media screen and (min-width: 320px) and (max-width: 483px) {
  .profile-overview {
    width: 65%;
    left: -50px;
  }
}
</style>
