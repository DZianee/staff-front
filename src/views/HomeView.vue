<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <h2>this is a homepage</h2> -->
    <div class="home-open">
      <HomeOpenTitle />
    </div>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
import HomeOpenTitle from "@/components/HomeOpenTitle.vue";

export default {
  name: "HomeView",
  components: {
    HomeOpenTitle,
  },
};
</script>
<style scoped>
/* .home-open {
  border: solid red;
} */
</style>
