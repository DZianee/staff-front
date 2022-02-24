<template>
  <div class="header">
    <div class="header-user">
      <img src="./assets/pic/users.png" />
    </div>
  </div>
  <div class="router-view">
    <router-view />
  </div>

  <Nav-Form />
</template>

<script>
import NavForm from "@/components/NavForm.vue";

export default {
  components: {
    NavForm,
  },
  data() {
    return {};
  },

  methods: {},

  setup() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 1000px;
}
@import "./assets/style/main.css";
</style>
