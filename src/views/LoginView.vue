<template>
  <div class="wrap-login100 p-l-50 p-r-50 p-t-15 p-b-33">
    <form class="login100-form validate-form flex-sb flex-w" @submit.prevent="login">
      <div class="p-t-5 p-b-9">
        <img class="w-full" src="@/assets/images/logo.jpg" alt="" />
      </div>
      <div class="p-t-13 p-b-9">
        <span class="font-weight-bold"> Email </span>
      </div>
      <div class="wrap-input100 validate-input" data-validate="Username is required">
        <input class="input100" type="text" name="email" placeholder="Enter your email" v-model="username" />
      </div>

      <div class="p-t-35 p-b-9">
        <span class="font-weight-bold"> Password </span>
      </div>
      <PasswordInput v-model:value="password" />
      <div class="container-login100-form-btn m-t-37">
        <button class="login100-form-btn" tag="button" type="submit" to="/change-password" :disabled="loading">
          <span class="spinner-border spinner-border-sm m-r-10" role="status" aria-hidden="true" v-if="loading"></span>
          {{ loading ? "Logging In... " : "Log In" }}
        </button>
      </div>
      <p class="Error-Message" v-if="LoginError == true">Wrong username or password</p>
    </form>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput";
import sha256 from "js-sha256";

export default {
  name: "LoginPage",
  components: {
    PasswordInput,
  },
  data() {
    return {
      username: "",
      password: "",
      LoginError: false,
      loading: false,
    };
  },
  created() {
    document.title = "Login";
  },
  computed: {},
  methods: {
    async login() {
      try {
        const auth = { username: this.username, password: sha256(this.password) };
        // const header = { "Access-Control-Allow-Origin": "*", "Content-type": "application/json" };
        this.loading = true;
        const res = await this.$axios.post(`api/v1/User/Login`, auth);
        if (res.status === 200) {
          this.$store.dispatch("login", res.data);
          const { content } = res.data;
          if (!content.user.isActive) {
            this.$router.push({ name: "changePass" });
          } else {
            this.$store.dispatch("attachUser", res.data);
            this.$router.push({ name: "home" });
          }
        }
        this.loading = false;
      } catch (e) {
        this.LoginError = true;
        this.loading = false;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");
* {
  font-family: "Roboto";
  font-size: 15px;
}
.wrap-login100 {
  width: 30%;
  position: relative;
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
  background: #e0e0e0;
}
.forgot-password:hover {
  color: rgb(34, 17, 17);
  text-decoration: underline;
  cursor: pointer;
}
.login100-form-btn {
  font-size: 17px;
}
.login100-form-btn:hover {
  background: #0277bd;
}
@media screen and (max-width: 1366px) {
  .wrap-login100 {
    width: 35%;
  }
}
@media screen and (max-width: 780px) {
  .wrap-login100 {
    width: 60%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .wrap-login100 {
    width: 95%;
    top: -5px;
    padding-right: 25px;
    padding-left: 25px;
  }
}
</style>
