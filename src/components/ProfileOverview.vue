<template>
  <div class="profile-overview container">
    <div class="card">
      <div class="user-avatar" style="text-align: center">
        <img :src="`https://${user.profileImage}`" class="card-img-top" alt="user avatar" />
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ user.username }}</h5>
        <h6 class="card-text">{{ user.departmentName }}</h6>
      </div>
      <div class="password" style="padding-bottom: 15px">
        <div class="btn">
          <ul style="padding-left: 0" @click="$refs.fileInput.click()">
            <li><i class="bi bi-image"></i></li>
            <li>Change avatar</li>
          </ul>
          <input v-show="false" type="file" ref="fileInput" accept="image/*" @change="changeAvatar" />
        </div>
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
  methods: {
    async changeAvatar(event) {
      try {
        const avatar = new FormData();
        avatar.append("file", event.target.files[0]);
        const res = await this.$axios.post(`api/v1/User/${this.user.id}/uploadProfieImage`, avatar, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status == 200) {
          this.$router.go();
        }
      } catch (e) {
        //
      }
    },
  },
};
</script>

<style scoped>
.profile-overview {
  /* display: flex; */
  /* justify-content: center; */
  width: 100%;
  height: fit-content;
  position: relative;
  /* left: 50% !important;
  transform: translateX(-50%); */
  top: 10px !important;
}
.card {
  width: fit-content;
  height: fit-content;
  border-radius: 12px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
}
img {
  padding: 10px;
  border-radius: 50%;
  object-fit: cover;
  width: 240px;
  height: 240px;
  position: relative;
  /* left: 25px; */
}
.card-body h5,
.card-body h6 {
  text-align: center;
  padding: 5px;
}
.card-body h5 {
  font-weight: 600;
}
.password .btn {
  background: #ffccbc;
  width: 80%;
  height: fit-content;
  color: #263238;
  font-size: 17px;
  font-weight: bold;
  border-radius: 10px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  transition: ease-in 0.35s;
  z-index: 0;
}
.btn:after {
  content: "";
  position: absolute;
  height: inherit;
  background: #ff8a65;
  top: 0;
  left: 0;
  width: 0;
  border-radius: 10px;
  transition: ease-in 0.5s;
  z-index: -2;
}
.btn:hover:after {
  width: 100%;
}
.btn ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.btn ul li {
  /* padding: 3px 10px 0 0; */
  padding: 0 !important;
}
.btn:hover {
  color: white;
}
@media screen and (max-width: 1440px) {
  img {
    /* left: 25px; */
    width: 220px;
    height: 200px;
  }
}
@media screen and (max-width: 1366px) {
  /* img {
     left: 18px;
  } */
}
@media screen and (max-width: 1025px) {
  /* .card {
    margin-left: 20px;
  } */
  .profile-overview {
    /* width: 90%; */
    top: 40px;
  }
}
@media screen and (max-width: 769px) {
  /* .card {
    margin-left: -10%;
  } */
  .profile-overview {
    /* width: 80%; */
    left: 50%;
    transform: translateX(-50%);
  }
  img {
    width: 210px;
  }
  h5 {
    font-size: 18px;
  }
  h6 {
    font-size: 16px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .profile-overview {
    left: 50%;
    transform: translateX(-50%);
    top: 0px;
  }
  .card {
    margin-left: 0px;
    padding: 0;
  }
  img {
    width: 180px;
    height: 160px;
  }
  .card-body {
    position: relative;
  }
  h5 {
    font-size: 16px;
  }
  h6 {
    font-size: 14px;
  }
}
</style>
