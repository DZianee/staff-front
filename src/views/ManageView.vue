<template>
  <div class="management-view container">
    <h1>Welcome to Management Stage</h1>
    <div class="card-option">
      <div class="card not-hover" @click="TopicRoute">
        <div class="card-body">
          <h4 class="card-title">Topic Management</h4>
          <p class="card-text">Available to create, modify and delete topic along with manage ideas inside each topic</p>
        </div>
      </div>
      <div class="card" @click="UserRoute">
        <div class="card-body">
          <h4 class="card-title">User Management</h4>
          <p class="card-text">All the users interact inside the system are monitored and created</p>
        </div>
      </div>
    </div>
  </div>
  <img src="../assets/images/Wonder-Learners-Math-Class.png" alt="img" />
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
    TopicRoute() {
      this.$router.push({ name: "topicView" });
    },
    UserRoute() {
      this.$router.push({ name: "userView" });
    },
  },
};
</script>

<style scoped>
h1 {
  position: relative;
  left: 80px;
}
.card-option {
  display: flex;
  position: relative;
  top: 80px;
  left: 80px;
  justify-content: space-around;
  flex-direction: row;
}
.card-option .card:first-child {
  background: #f4ff81;
}
.card-option .card:last-child {
  background: #b2ff59;
}
.card {
  border: solid;
  width: 30%;
  transition: ease 0.5s;
  box-shadow: none;
  padding: 10px;
}
.card:hover {
  cursor: pointer;
  transform: scale(1.2, 1.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.card-text {
  font-size: 15px;
}
img {
  position: relative;
  bottom: 0;
  left: 90px;
  top: 200px;
  width: 50%;
}
@media screen and (max-width: 1366px) {
  h1 {
    left: 120px;
  }
  .card-option {
    left: 120px;
  }
  .card {
    width: 32%;
  }
}
@media screen and (max-width: 1025px) {
  h1 {
    left: 50px;
  }
  .card-option {
    left: 50px;
  }
  .card {
    width: 34%;
  }
  img {
    left: 50px;
    width: 60%;
  }
}
@media screen and (max-width: 769px) {
  .card-option {
    left: -38px;
    width: 700px;
  }
  .card {
    width: 38%;
  }
  img {
    left: 50px;
    width: 70%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  h1 {
    left: 10px;
    top: 50px;
  }
  .card-option {
    left: 25px;
    height: 400px;
    width: 400px;
    align-content: space-around;
    flex-direction: column;
  }
  .card {
    width: 100%;
  }
  img {
    left: 0;
    width: 70%;
    top: 120px;
  }
  .card:hover {
  transform: scale(1.1, 1.1);
}
}
</style>
