<template>
  <div class="wrap-login100 p-l-50 p-r-50 p-t-15 p-b-33">
    <form class="login100-form validate-form flex-sb flex-w" @submit.prevent="submit">
      <span class="login100-form-title p-b-13 p-t-15 fs-16 font-weight-bold"> Create new password </span>
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
      <div class="container-login100-form-btn m-t-45 m-b-15">
        <button class="login100-form-btn" :disabled="NewPassError">Reset password</button>
      </div>
      <Modal title="Confirm change password" :modalActive="isOpenModal" confirmText="Agree" @submit="confirm" @close="closeModal">
        <p>Your password will change. Click 'Agree' to confirm and update new password</p>
        <br />
      </Modal>
    </form>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput";
import Modal from "@/components/Modal.vue";
export default {
  name: "ChangePasswordPage",
  components: {
    PasswordInput,
    Modal,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      NewPassError: false,
      isOpenModal: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
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
        const res = await this.$axios.put(`api/v1/User/${this.user.id}/changePassword`, {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });
        if (res.status === 200) {
          this.$router.push({ name: "login" });
        }
        this.closeModal();
      } catch (e) {
        //
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

<style scoped></style>
