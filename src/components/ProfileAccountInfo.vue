<template>
  <div class="profile-account-details container">
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
            <div class="btn" data-bs-toggle="modal" @click="openModal">
              <ul>
                <li><i class="bx-fw bx bx-lock bx-sm bx-tada-hover" /></li>
                <li>Change password</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <component
        :is="'confirm-modal'"
        title="Change Password"
        :ConfirmModalActive="isOpenModal"
        confirmText="Agree"
        @submitModal="submit"
        @closeModal="closeModal">
        <div class="content-form p-l-15 p-r-15">
          <form class="login100-form validate-form flex-sb flex-w" @submit.prevent="submit">
            <div class="p-t-15 p-b-9">
              <span class="font-weight-bold"> Old password </span>
            </div>
            <PasswordInput v-model:value="oldPassword" />
            <div class="p-t-15 p-b-9">
              <span class="font-weight-bold"> New password </span>
            </div>
            <PasswordInput v-model:value="newPassword" />
            <div class="p-t-15 p-b-9">
              <span class="font-weight-bold"> Confirm new password </span>
            </div>
            <PasswordInput v-model:value="reNewPassword" />
            <span class="error-label" v-if="NewPassError" style="color: red">New and Confirm Password do not match</span>
            <div class="container-login100-form-btn m-t-30 m-b-15">
              <button class="login100-form-btn" :disabled="NewPassError">Activate change</button>
            </div>
          </form>
        </div>
        <br />
      </component>
    </div>
  </div>
</template>

<script>
import sha256 from "js-sha256";
import PasswordInput from "./PasswordInput.vue";

export default {
  name: "ProfileAccountInfo",
  components: { PasswordInput },
  props: {
    accountInfo: Object,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      NewPassError: false,
      isOpenModal: false,
      isActiveConfirm: false,
    };
  },
  methods: {
    closeModal() {
      this.isOpenModal = false;
    },
    openModal() {
      this.isOpenModal = true;
    },
    async submit() {
      try {
        const user = JSON.parse(this.$store.state.user);
        this.$store.dispatch("fetchAccessToken");
        const res = await this.$axios.put(
          `api/v1/User/${user.id}/changePassword`,
          {
            oldPassword: sha256(this.oldPassword),
            newPassword: sha256(this.newPassword),
          },
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status === 200) {
          this.$router.push({ name: "login" });
          this.isOpenModal = true;
        }
      } catch (e) {
        console.log("Error");
      }
    },
  },
  watch: {
    reNewPassword(newValue) {
      if (newValue !== this.newPassword) {
        this.NewPassError = true;
      } else {
        this.NewPassError = false;
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  position: relative;
  width: 100%;
  height: fit-content;
  overflow: visible;
}
.card-header {
  width: 360px;
  position: absolute;
  z-index: 1;
  left: 110px;
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
  font-size: 14px;
  color: rgb(124, 117, 117);
  font-weight: 800;
  letter-spacing: 1.2px;
  margin-bottom: 9px;
}
input {
  width: 50%;
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
  font-size: 17px;
  font-weight: bold;
  border-radius: 10px;
  position: relative;
  left: 50px;
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
  justify-content: center;
}
.btn ul li {
  padding: 3px 10px 0 0;
}
.btn:hover {
  color: white;
}
@media screen and (max-width: 1440px) {
  .card-header {
    left: 80px;
  }
  .username label,
  .username input {
    margin-left: 0;
  }
  .username label {
    padding-top: 10px;
    margin-left: 40px;
  }
  .username {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  input {
    width: 100%;
  }
  .btn ul li {
    padding-right: 14px;
  }
}

@media screen and (max-width: 1366px) {
  .card-header {
    left: 60px;
  }
}
@media screen and (max-width: 1025px) {
  .card-header {
    left: 130px;
  }
  .username label {
    margin-left: 60px;
  }
  .btn ul li {
    padding-right: 16px;
  }
}
@media screen and (max-width: 769px) {
  .card-header {
    left: 90px;
    width: 300px;
  }
  .btn {
    left: 40px;
  }
}
@media screen and (min-width: 320px) and (max-width: 483px) {
  .card-header {
    left: 60px;
    width: 270px;
  }
  .username label {
    margin-left: 50px;
  }
}
/* 
modal
*/

.font-weight-bold {
  font-weight: 500 !important;
  font-size: 17px !important;
}

.profile-account-details /deep/ .Confirm-Modal-container {
  min-height: 520px;
  height: 520px;
}
.profile-account-details /deep/ .remove-btns {
  display: none;
}
.error-label {
  font-size: 15px;
}
</style>
