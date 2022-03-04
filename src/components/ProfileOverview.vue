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
}
.card {
  width: 70%;
}
img {
  padding: 10px;
  border-radius: 50%;
  object-fit: cover;
  width: 280px;
  height: 240px;
}
.card-body h5,
.card-body h6 {
  padding: 5px;
}
h5 {
  font-weight: 600;
}
</style>
