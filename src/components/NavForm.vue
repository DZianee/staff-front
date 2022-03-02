<template>
  <div class="nav">
    <ul class="nav-items">
      <router-link to="/">
        <li class="nav-item">
          <img src="../assets/pic/House.png" />
          <span class="tooltiptext">Home</span>
        </li>
      </router-link>
      <router-link to="/topic-view">
        <li class="nav-item">
          <img src="../assets/pic/officebag.png" />
          <span class="tooltiptext">Bag</span>
        </li>
      </router-link>
      <li v-if="this.$route.name == 'topicView'" class="nav-item js-add" @click="modalAct()">
        <img src="../assets/pic/Plus.png" />
      </li>
      <!-- <router-link to="/"> -->
      <li class="nav-item">
        <img src="../assets/pic/bargraph.png" />
        <span class="tooltiptext">Statistic</span>
      </li>
      <!-- </router-link> -->
      <li class="nav-item">
        <img src="../assets/pic/Setting.png" />
        <span class="tooltiptext">Setting</span>
      </li>
    </ul>
  </div>

  <Topic-Modal-Form @close="modalAct()" :modalActive="modalActive" />
</template>

<script>
import TopicModalForm from "@/components/TopicModalForm.vue";
import { ref } from "vue";

export default {
  components: {
    TopicModalForm,
  },
  data() {
    return {};
  },

  methods: {},

  setup() {
    const modalActive = ref(false);

    const modalAct = () => {
      modalActive.value = !modalActive.value;
    };

    return { modalActive, modalAct };
  },
};
</script>

<style></style>
