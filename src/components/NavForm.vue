<template>
  <div class="nav">
    <ul class="nav-items">
      <router-link to="/">
        <li class="nav-item" :class="isHome ? 'pageSignal' : ''">
          <span class="tooltiptext">Home</span>
          <img src="../assets/pic/House.png" />
        </li>
      </router-link>
      <router-link to="/about">
        <li class="nav-item" :class="isTopic ? 'pageSignal' : ''">
          <span class="tooltiptext">Bag</span>
          <img src="../assets/pic/officebag.png" />
        </li>
      </router-link>
      <li
        v-if="this.$route.name == 'about'"
        class="nav-item js-add"
        @click="modalAct()"
      >
        <span class="tooltiptext">Add</span>
        <img src="../assets/pic/Plus.png" />
      </li>
      <router-link to="/">
        <li class="nav-item">
          <span class="tooltiptext">Graph</span>
          <img src="../assets/pic/bargraph.png" />
        </li>
      </router-link>
      <li class="nav-item">
        <span class="tooltiptext">Setting</span>
        <img src="../assets/pic/Setting.png" />
      </li>
    </ul>
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
    return {
      isHome: false,
      isTopic: false,
      isGraph: false,
    };
  },

  methods: {},

  setup() {
    const modalActive = ref(false);

    const modalAct = () => {
      modalActive.value = !modalActive.value;
    };

    return { modalActive, modalAct };
  },

  watch: {
    $route() {
      switch (this.$route.name) {
        case "home":
          this.isHome = true;
          this.isTopic = false;
          this.isGraph = false;
          break;
        case "about":
          this.isHome = false;
          this.isTopic = true;
          this.isGraph = false;
          break;
      }
    },
  },
};
</script>
