<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>{{ this.id }}</div>
  <button @click="showProfile">show profile</button><br />
  <button @click="showId">show id</button>
</template>

<script>
export default {
  name: "aboutPage",
  data() {
    return {
      id: "",
    };
  },
  created() {
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.id = data.id;
    alert(this.id);
  },
  methods: {
    showProfile() {
      this.$router.push({ name: "profileView", params: { id: this.id } });
    },
    // showId() {
    //   console.log("get id");
    //   console.log(this.id);
    // },
  },
};
</script>
<style scoped>
button {
  background-color: blue;
  color: white;
}
</style>
