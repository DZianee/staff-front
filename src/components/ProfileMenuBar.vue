<template>
  <div class="profile_sidebar">
    <ul class="sidebar-items">
      <li class="nav-item">
        <a class="nav-link active" href="#">My profile</a>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link" href="#">Account</a>
      </li> -->
      <li class="nav-item">
        <a class="nav-link" href="#">Ideas posted</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProfileMenuBar",
};
</script>

<style scoped>
.profile_sidebar {
  position: fixed;
  border-right: solid #f5f5f5;
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 220px;
  background-color: #e3f2fd;
}
.sidebar-items {
  margin-top: 37px;
}
.nav-item {
  left: 0;
  padding: 7px;
  display: flex;
  justify-content: flex-start;
  margin-left: -32px;
}
.nav-item:hover {
  border-left: solid #448aff 5px;
  transition: ease 0.4s;
}
.nav-link {
  color: #90a4ae;
  font-weight: 500;
  font-size: 14px;
}
.nav-link:hover {
  color: #607d8b;
}
.nav-link.active {
  font-weight: 600;
  font-size: 15px;
  color: black;
}
</style>
