<template>
  <div class="container-left">
    <div class="management-view container body-content">
      <h1>Welcome to Management Stage</h1>
      <div class="card-option">
        <div class="card not-hover" @click="Route('topicView')">
          <div class="card-body">
            <h4 class="card-title">Topic Management</h4>
            <p class="card-text">Available to create, modify and delete topic along with manage ideas inside each topic</p>
          </div>
        </div>
        <div class="card" @click="Route('userView')">
          <div class="card-body">
            <h4 class="card-title">User Management</h4>
            <p class="card-text">All the users interact inside the system are monitored and created</p>
          </div>
        </div>
        <div class="card" @click="Route('RoleView')">
          <div class="card-body">
            <h4 class="card-title">Role Management</h4>
            <p class="card-text">All the roles inside the system are monitored and created</p>
          </div>
        </div>
        <div class="card" @click="Route('DepartmentView')">
          <div class="card-body">
            <h4 class="card-title">Department Management</h4>
            <p class="card-text">All the departments inside the system are monitored and created</p>
          </div>
        </div>
      </div>
      <!-- <img src="../assets/images/Wonder-Learners-Math-Class.png" alt="img" /> -->
    </div>

    <!-- <img src="../assets/images/Wonder-Learners-Math-Class.png" alt="img" /> -->
  </div>
  <!-- <UserManage /> -->
</template>

<script>
// import UserManage from "../components/UserManage.vue";
export default {
  name: "ManageView",
  // components: {
  //   UserManage,
  // },
  methods: {
    Route(value) {
      this.$router.push({ name: value });
    },
  },
};
</script>

<style scoped>
.body-content {
  left: 50% !important;
  transform: translateX(-50%);
  margin: 0 !important;
}
.container {
  width: 100% !important;
}
/* .management-view {
  height: 700px;
} */
h1 {
  text-align: center;
  margin-top: 20px;
  background: linear-gradient(to left, #87c7df, #649866);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-option {
  display: flex;
  gap: 16px;
  position: relative;
  top: 80px;
  /* left: 50px; */
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
}
.card-option .card:first-child {
  background: #f4ff81;
}
.card-option .card:last-child {
  background: #b2ff59;
}
.card {
  width: 40%;
  transition: ease 0.5s;
  box-shadow: none;
  padding: 10px;
  height: 180px;
}
.card:hover {
  cursor: pointer;
  transform: scale(1.2, 1.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.card-title {
  text-align: center;
}
.card-text {
  font-size: 15px;
}
img {
  position: relative;
  bottom: 0;
  left: 50px;
  top: 200px;
  width: 50%;
}
@media screen and (max-width: 1366px) {
  .container {
    /* left: 140px;
    width: 1090px; */
    width: 90%;
    margin: 0;
  }
  .card {
    width: 33%;
  }
  .card-option {
    /* left: -7px; */
  }
  img {
    bottom: 0;
    left: 20px;
    width: 70%;
  }
}
@media screen and (max-width: 1025px) {
  .container {
    /* left: 80px; */
    /* width: 930px; */
    width: 90%;
  }
  .card {
    width: 38%;
  }
  img {
    left: 10px;
  }
}
@media screen and (max-width: 769px) {
  .card-option {
    /* width: 500px; */
    width: 100%;
    height: 50%;
    top: 30px;
    /* left: 100px; */
    /* flex-direction: column; */
    justify-content: space-around;
    align-items: center;
    padding-bottom: 80px;
  }
  .card {
    /* width: 90%; */
    width: 98%;
  }
  img {
    /* left: 0px; */
    top: 100px;
    width: 90%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .management-view {
    left: 0;
    width: 100%;
    /* width: 478px; */
  }
  .body-content {
    top: 10px !important;
  }
  .card-option {
    /* left: 25px; */
    left: 50%;
    transform: translateX(-50%);
    /* height: 400px; */
    width: 92%;
    top: 40px;
    align-content: space-around;
    padding-bottom: 80px;
    /* flex-direction: column; */
  }
  .card {
    width: 100%;
  }
  img {
    left: 0;
    width: 90%;
    top: 120px;
  }
  .card:hover {
    transform: scale(1.1, 1.1);
  }
}
</style>
