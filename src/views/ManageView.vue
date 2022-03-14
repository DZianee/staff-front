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
    <img src="../assets/images/Wonder-Learners-Math-Class.png" alt="img" />
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
.container {
  /* background: #94A2F2; */
  height: 834px;
  left: 108px;
  border: solid;
}
h1 {
  position: relative;
  left: 30px;
  background: linear-gradient(to left, #87c7df, #649866);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-option {
  display: flex;
  position: relative;
  top: 80px;
  left: 50px;
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
  left: 50px;
  top: 200px;
  width: 50%;
}
@media screen and (max-width: 1366px) {
  .container {
    left: 140px;
    width: 1090px;
  }
  h1 {
    left: 30px;
  }
  .card-option {
    left: 10px;
  }
  .card {
    width: 33%;
  }
  img {
    bottom: 0;
    left: 20px;
    width: 70%;
  }
}
@media screen and (max-width: 1025px) {
  .container {
    left: 40px;
    width: 930px;
  }
  h1 {
    left: 30px;
  }
  .card-option {
    left: 10px;
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
    width: 500px;
    height: 50%;
    top: 10px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  h1 {
    left: 5px;
  }
  .card {
    width: 90%;
  }
  img {
    /* left: 0px; */
    top: 100px;
    width: 90%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .container {
    left: 0;
    width: 478px;
  }
  h1 {
    left: 10px;
    top: 50px;
  }
  .card-option {
    left: 25px;
    height: 400px;
    width: 400px;
    top: 70px;
    align-content: space-around;
    flex-direction: column;
  }
  .card {
    width: 100%;
    border: solid firebrick;
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
