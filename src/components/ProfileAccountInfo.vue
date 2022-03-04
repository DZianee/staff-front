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
            <label for="password">Password</label>
            <input type="text" value="123okela" disabled />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAccountInfo",
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
  width: max-content;
  position: absolute;
  z-index: 1;
  left: 200px;
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
.username,
.password {
  display: block;
}
.username label,
.username input,
.password label,
.password input {
  display: inline-block;
  /* padding: 10px; */
  margin-top: 20px;
  margin-left: 20px;
}
label {
  font-size: 16px;
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
</style>
