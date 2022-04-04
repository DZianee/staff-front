<template>
  <div class="profile_sidebar">
    <ul class="sidebar-items">
      <li class="nav-item profile">
        <div class="nav-link active my-profile" id="profile" @click="openOption()">
          <span>
            <i class="bx bx-user-pin bx-sm bx-fw"></i>
          </span>
          My profile
        </div>
      </li>
      <li class="nav-item ideas">
        <div class="nav-link" id="idea" @click="openOptions()">
          <span>
            <i class="bx bx-news bx-sm bx-fw"></i>
          </span>
          Ideas posted
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProfileMenuBar",
  props: {},
  methods: {
    openOption() {
      this.$emit("open-option", "profile");
    },
    openOptions() {
      this.$emit("open-options", "idea");
    },
  },
};
</script>

<style scoped>
.profile_sidebar {
  position: sticky;
  border-right: solid #f2ebeb;
  height: fit-content;
  width: 220px;
  margin-top: 25px;
  /* left: 50% !important;
  transform: translateX(-50%) !important; */
}
.sidebar-items {
  margin-top: 37px;
}
.nav-item {
  padding: 3px;
  margin-left: -28px;
  border-radius: 10px;
  width: 200px;
  transition: ease-in 0.3s;
  display: flex;
  justify-content: flex-start;
}
.nav-item:hover {
  background: white;
  /* transition: ease 0.4s; */
  font-weight: 500;
  cursor: pointer;
}
.nav-link {
  /* color: #6f848f; */
  /* font-weight: 500; */
  font-size: 15px;
}
.nav-link:hover {
  color: black;
}
.nav-link span {
  padding-right: 10px;
}
/* .active {
  font-weight: 600;
  font-size: 16px;
  color: black;
} */
@media screen and (max-width: 1440px) {
  .profile_sidebar {
    width: 180px;
  }
  .nav-item {
    padding: 0;
    width: 170px;
    transition: ease-in 0.3s;
  }
}
@media screen and (max-width: 1025px) {
  .profile_sidebar {
    position: relative;
    height: 54px;
    width: 50%;
    border: solid 2px;
    border-radius: 23px;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
  }
  .sidebar-items {
    margin-top: -2px;
    display: flex;
    border-radius: 23px;
    height: 50px;
    padding: 0;
    position: relative;
  }
  .nav-item {
    padding: 0;
    width: 50%;
    height: 45px;
    border-radius: 0;
    margin: 5px 0;
    justify-content: center;
  }
  .profile {
    margin-right: 0;
    border-bottom-left-radius: 23px;
    /* border-right: solid; */
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
    left: 0 !important;
    padding: 0;
    color: black;
  }
  .my-profile {
    left: 48px;
  }
}
@media screen and (max-width: 769px) {
  .profile_sidebar {
    width: 60%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .profile_sidebar {
    width: 70%;
    height: 44px;
    top: -30px;
    background: #e3f2fd;
  }
  .nav-item {
    margin: 0 0;
    line-height: 0;
    width: 200px;
  }
  .nav-item:hover {
    background: none;
    border-top: none;
  }
  .profile {
    padding: 0;
    margin-right: 0;
  }
  .nav-link span i {
    display: none;
  }
  .nav-link {
    font-size: 14px;
    left: 40px;
  }
  #idea {
    left: 35px;
  }
  #profile {
    left: 50px;
  }
}
</style>
