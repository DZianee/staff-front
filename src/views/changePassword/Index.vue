<template>
  <div class="wrap-login100 p-l-50 p-r-50 p-t-15 p-b-33">
    <form class="login100-form validate-form flex-sb flex-w">
      <span class="login100-form-title p-b-13 p-t-15 fs-16 font-weight-bold">
        Create new password
      </span>
      <div class="p-t-35 p-b-9">
        <span class="font-weight-bold"> Old password </span>
      </div>
      <PasswordInput />
      <div class="p-t-35 p-b-9">
        <span class="font-weight-bold"> New password </span>
      </div>
      <PasswordInput :isValid="false" />
      <div class="p-t-35 p-b-9">
        <span class="font-weight-bold"> Confirm new password </span>
      </div>
      <PasswordInput />
      <div class="container-login100-form-btn m-t-45 m-b-15">
        <button class="login100-form-btn">Reset password</button>
      </div>
    </form>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput";
export default {
  name: "ChangePasswordPage",
  components: {
    PasswordInput,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
