<template>
  <div class="profile-account-details">
    <div class="card">
      <h4 class="card-header">Account Information</h4>
      <div class="card-body">
        <h5 class="card-title"></h5>
        <div class="user-account">
          <div class="username">
            <label for="username">Username</label>
            <input type="text" :value="accountInfo.username" disabled />
          </div>
          <div class="password">
            <button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalLabel">
              <ul>
                <li><i class="bx-fw bx bx-lock bx-sm bx-tada-hover" /></li>
                <li>Change password</li>
              </ul>
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>
            <a href="#" data-reveal-id="myModal">Click Me For A Modal</a>

            <div id="myModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
              <h2 id="modalTitle">Awesome. I have it.</h2>
              <p class="lead">Your couch. It is mine.</p>
              <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
              <a class="close-reveal-modal" aria-label="Close">&#215;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ChangePassModal />
  </div>
</template>

<script>
import ChangePassModal from "./ChangePassModal.vue";

export default {
  name: "ProfileAccountInfo",
  components: { ChangePassModal },
  props: {
    accountInfo: Object,
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  position: relative;
}
.card-header {
  width: 360px;
  position: absolute;
  z-index: 1;
  left: 180px;
  top: -30px;
}
.card-body {
  margin-top: 10px;
}
h4 {
  display: flex;
  justify-content: center;
  font-weight: 600;
}
.username {
  display: block;
}
.username label,
.username input {
  display: inline-block;
  /* padding: 10px; */
  margin-top: 20px;
  margin-left: 20px;
}
label {
  font-size: 15px;
  color: rgb(124, 117, 117);
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 9px;
}
input {
  width: 80%;
  height: 40px;
  border-radius: 5px;
  outline-color: rgb(255, 255, 255);
  background-color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 14px;
}
.password {
  padding-top: 15px;
}
.btn {
  background: #ffccbc;
  width: 80%;
  height: 44px;
  color: #263238;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  position: relative;
  transition: ease-in 0.35s;
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
}
.btn:hover:after {
  width: 100%;
}
.btn ul {
  display: flex;
  justify-content: center;
}
.btn ul li {
  padding-right: 10px;
  position: relative;
  z-index: 1;
}
.btn:hover {
  color: white;
}
@media screen and (max-width: 1430px) {
  .card-header {
    left: 150px;
  }
}
@media screen and (max-width: 1280px) {
  .card-header {
    left: 100px;
  }
  .username label,
  .username input {
    margin-top: 20px;
    margin-left: 12px;
  }
}
@media screen and (max-width: 1025px) {
  .card-header {
    left: 150px;
  }
}
@media screen and (max-width: 769px) {
  .card-header {
    left: 90px;
  }
}
@media screen and (min-width: 320px) and (max-width: 483px) {
  .card-header {
    left: 60px;
    width: 270px;
  }
  input {
    width: 60%;
  }
  .username {
    border-bottom: solid #e0e0e0;
  }
  .btn {
    font-size: 17px;
    height: 40px;
    width: 100%;
  }
  .btn ul li {
    padding-right: 15px;
  }
}
</style>
