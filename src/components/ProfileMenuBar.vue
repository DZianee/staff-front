<template>
  <div class="profile_sidebar">
    <ul class="sidebar-items">
      <li class="nav-item profile">
        <div class="nav-link active my-profile">
          <span>
            <i class="bx bx-user-pin bx-sm"></i>
          </span>
          My profile
        </div>
      </li>
      <li class="nav-item ideas">
        <div class="nav-link" @click="getMenuAccount">
          <span>
            <i class="bx bx-news bx-sm"></i>
          </span>
          Ideas posted
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// const t = document.getElementsByClassName("nav-item");
// const x = document.getElementsByClassName("nav-link");
// for (var i = 0; i < x.length; i++) {
//   x[i].addEventListener("click", () => {
//     var curr = document.getElementsByClassName("active");
//     curr[0].className = curr[0].className.replace("active");
//     this.className += "active";
//   });
// }
export default {
  name: "ProfileMenuBar",
  props: {},
  methods: {
    getMenuAccount() {
      this.$emit("getMenuItem", "Account info");
    },
  },
};
</script>

<style scoped>
.profile_sidebar {
  position: fixed;
  border-right: solid #f5f5f5;
  height: 100%;
  width: 220px;
  background-color: #e3f2fd;
}
.sidebar-items {
  margin-top: 37px;
}
.nav-item {
  padding: 3px;
  margin-left: -22px;
  border-radius: 10px;
  width: 200px;
  transition: ease-in 0.3s;
}
.nav-item:hover {
  background: #fafafa;
  transition: ease 0.4s;
  cursor: pointer;
}
.nav-link {
  color: #6f848f;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
}
.nav-link:hover {
  color: black;
}
.nav-link span {
  padding-right: 10px;
}
.active {
  font-weight: 600;
  font-size: 16px;
  color: black;
}
@media screen and (max-width: 1430px) {
  .profile_sidebar {
    width: 200px;
  }
}
@media screen and (max-width: 1025px) {
  .profile_sidebar {
    position: relative;
    height: 50px;
    width: 50%;
    border: solid 2px;
    border-radius: 23px;
    left: 200px;
    top: 30px;
  }
  .sidebar-items {
    margin-top: 0;
    display: flex;
    width: 423px;
    border-radius: 23px;
    justify-content: space-around;
    height: 50px;
    padding: 0;
  }
  .nav-item {
    padding: 0;
    width: 50%;
    height: 48px;
    margin-left: 0;
  }
  .profile {
    margin-right: 0;
    border-bottom-left-radius: 23px;
    border-right: solid;
    border-top-left-radius: 23px;
  }
  .ideas {
    border-bottom-right-radius: 23px;
    border-top-right-radius: 23px;
    border-left: solid;
  }
  .nav-link {
    font-weight: 600;
    font-size: 16px;
    position: relative;
    left: 30px;
  }
  .my-profile {
    left: 48px;
  }
}
@media screen and (max-width: 769px) {
  .profile_sidebar {
    width: 60%;
    left: 140px;
  }
}
@media screen and (min-width: 320px) and (max-width: 483px) {
  .profile_sidebar {
    width: 55%;
    left: 25px;
  }
}
</style>
