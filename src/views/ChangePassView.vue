<template>
  <div class="wrap-login100 p-l-40 p-r-40 p-t-15 p-b-33">
    <form class="login100-form validate-form flex-sb flex-w" @submit.prevent="submit">
      <span class="login100-form-title p-b-13 p-t-15 fs-16 font-weight-bold"> Create new password </span>
      <div class="p-t-27 p-b-9">
        <span class="font-weight-bold"> Old password </span>
      </div>
      <PasswordInput v-model:value="oldPassword" />
      <div class="p-t-35 p-b-9">
        <span class="font-weight-bold"> New password </span>
      </div>
      <PasswordInput v-model:value="newPassword" />
      <div class="p-t-35 p-b-9">
        <span class="font-weight-bold"> Confirm new password </span>
      </div>
      <PasswordInput v-model:value="reNewPassword" />
      <div class="container-login100-form-btn m-t-38 m-b-15">
        <button class="login100-form-btn" :disabled="NewPassError">Reset password</button>
      </div>
      <component
        :is="'confirm-modal'"
        title="Confirm change password"
        :ConfirmModalActive="isOpenModal"
        confirmText="Agree"
        @submitModal="confirm"
        @closeModal="closeModal">
        <p>Your password will change. Click 'Agree' to confirm and update new password</p>
        <br />
      </component>
    </form>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput";
import sha256 from "js-sha256";

export default {
  name: "ChangePasswordPage",
  components: {
    PasswordInput,
    // Modal,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      NewPassError: true,
      isOpenModal: false,
    };
  },
  computed: {
    user() {
      return JSON.parse(this.$store.state.user);
    },
  },
  methods: {
    closeModal() {
      this.isOpenModal = false;
    },
    submit() {
      this.isOpenModal = true;
    },
    async confirm() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const res = await this.$axios.put(
          `api/v1/User/${this.user.id}/changePassword`,
          {
            oldPassword: sha256(this.oldPassword),
            newPassword: sha256(this.newPassword),
          },
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status === 200) {
          this.$router.push({ name: "login" });
        }
      } catch (e) {
        console.log("Error");
      }
    },
  },
  created() {},
  mounted() {},
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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");
* {
  font-family: "Roboto";
  font-size: 15px;
}
.wrap-login100 {
    width: 28%;
    border-radius: 12px;
  }
.font-weight-bold {
  font-weight: 500;
}
.forgot-password {
  font-size: 14px;
  color: rgb(110, 105, 105);
}
.input100 {
  font-size: 15px;
}
.forgot-password:hover {
  color: rgb(34, 17, 17);
  text-decoration: underline;
  cursor: pointer;
}
.login100-form-btn {
  font-size: 17px;
  letter-spacing: 1px;
  height: 50px;
}
.login100-form-title {
  font-size: 22px;
}
.login100-form-btn:hover {
  background: #0277bd;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .wrap-login100 {
    width: 95%;
    position: relative;
    top: -100px;
    padding-left: 38px;
    padding-right: 38px;
  }
  .wrap-login100{
    height: 43%;
  }
  
}
</style>
