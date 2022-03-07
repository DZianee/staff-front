<template>
  <div class="change-pass_modal">
    <div class="modal fade" id="changePassModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="login100-form validate-form flex-sb flex-w" @submit.prevent="submit">
              <div class="p-t-35 p-b-9">
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
              <span v-if="NewPassError" style="color: red">New and Confirm Password do not match</span>
              <div class="container-login100-form-btn m-t-45 m-b-15">
                <button class="login100-form-btn" :disabled="NewPassError">Activate change</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordInput from "./PasswordInput.vue";

export default {
  name: "ChangePassModal",
  components: {
    PasswordInput,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      NewPassError: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async submit() {
      try {
        const res = await this.$axios.put(`api/v1/User/${this.user.id}/changePassword`, {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });
        if (res.status === 200) {
          this.$router.push({ name: "login" });
        }
      } catch (e) {
        //
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
.modal {
  margin-top: 100px;
}
.modal-title {
  position: relative;
  left: 140px;
  font-weight: bold;
}
button:hover {
  background: #303f9f;
}
span {
  font-size: 15px;
  color: rgb(141, 129, 129);
  font-weight: 700;
  letter-spacing: 0.5px;
}
</style>
