<template>
  <div class="header">
    <div class="header-user">
      <img src="./assets/pic/users.png" />
    </div>
  </div>
  <div class="nav">
    <ul class="nav-items">
      <li class="nav-item" @click="routeAbout">
        <span class="tooltiptext">Home</span>
        <img src="./assets/pic/House.png" />
      </li>
      <li class="nav-item">
        <span class="tooltiptext">Bag</span>
        <img src="./assets/pic/officebag.png" />
      </li>
      <li
        v-if="this.$route.name == 'about'"
        class="nav-item js-add"
        @click="modalAct()"
      >
        <span class="tooltiptext">Add</span>
        <img src="./assets/pic/Plus.png" />
      </li>
      <li class="nav-item">
        <span class="tooltiptext">Graph</span>
        <img src="./assets/pic/bargraph.png" />
      </li>
      <li class="nav-item">
        <span class="tooltiptext">Setting</span>
        <img src="./assets/pic/Setting.png" />
      </li>
    </ul>
  </div>
  <div class="router-view">
    <router-view />
  </div>

  <Modal-Form @close="modalAct()" :modalActive="modalActive" />
</template>

<script>
import ModalForm from "@/components/ModalForm.vue";
import { ref } from "vue";

export default {
  components: {
    ModalForm,
  },
  data() {
    return {};
  },

  methods: {
    routeAbout() {
      this.$router.push({ name: "about" });
    },
  },

  setup() {
    const modalActive = ref(false);

    const modalAct = () => {
      modalActive.value = !modalActive.value;
    };

    return { modalActive, modalAct };
  },
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
