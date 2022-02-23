<template>
  <div class="wrap-login100 p-l-50 p-r-50 p-t-15 p-b-33">
    <form
      class="login100-form validate-form flex-sb flex-w"
      @submit.prevent="login"
    >
      <div class="p-t-5 p-b-9">
        <img class="w-full" src="@/assets/images/logo.jpg" alt="" />
      </div>
      <div class="p-t-13 p-b-9">
        <span class="font-weight-bold"> Email </span>
      </div>
      <div
        class="wrap-input100 validate-input"
        data-validate="Username is required"
      >
        <input
          class="input100"
          type="text"
          name="email"
          placeholder="Enter your email"
          v-model="username"
        />
      </div>

      <div class="p-t-35 p-b-9">
        <span class="font-weight-bold"> Password </span>
      </div>
      <PasswordInput :isValid="true" v-model="password" />

      <div class="w-full text-right p-t-15 p-r-10">
        <span class="font-weight-bold"> Forgot Password </span>
      </div>

      <div class="container-login100-form-btn m-t-17">
        <button tag="button" class="login100-form-btn" to="/change-password">
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput";

export default {
  name: "LoginPage",
  components: {
    PasswordInput,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {},
  methods: {
    async login() {
      try {
        const auth = { username: this.username, password: this.password };
        const res = await this.$axios.post(`api/v1/User/Login`, auth);
        console.log(res);
        if (res.status === 200) {
          this.$router.push({ name: "changePass" });
        }
      } catch (e) {
        console.log(e.response);
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
