<template>
  <div class="nav">
    <ul class="nav-items">
      <router-link to="/">
        <li class="nav-item">
          <img src="../assets/pic/House.png" />
          <span class="tooltiptext">Home</span>
        </li>
      </router-link>
      <li class="nav-item">
        <img src="../assets/pic/officebag.png" />
        <ul class="nav-item-manage">
          <li class="nav-item-manage-item" @click="TopicRoute">Topic</li>
          <li class="nav-item-manage-item" @click="ManageRoute">Manage User</li>
        </ul>
        <span class="bagText">Bag</span>
      </li>
      <li v-if="this.$route.name == 'topicView' || this.$route.name == 'manageview'" class="nav-item js-add" @click="modalAct(this.$route.name)">
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

  <Topic-Modal-Form @close="modalActt()" :modalActive="modalActive" />
</template>

<script>
// let self = this;
import TopicModalForm from "@/components/TopicModalForm.vue";
import { ref } from "vue";

export default {
  components: {
    TopicModalForm,
  },
  data() {
    return {};
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    TopicRoute() {
      this.$router.push({ name: "topicView" });
    },
    ManageRoute() {
      this.$router.push({ name: "manageView" });
    },
  },

  setup() {
    const modalActive = ref(false);

    const modalAct = (value) => {
      if (value == "topicView") {
        modalActive.value = !modalActive.value;
      } else {
        console.log("aaa");
      }
    };

    const modalActt = () => {
      modalActive.value = !modalActive.value;
    };

    return { modalActive, modalAct, modalActt };
  },
};
</script>

<style>
.bagText {
  display: none;
}
@media (max-width: 740px) {
  .bagText {
    display: block;
  }
  .nav-item-manage {
    top: -136%;
    right: 50%;
  }
  .nav .nav-item .nav-item-manage {
    list-style-type: none;
    display: none;
    min-width: 140px;
    height: 86px;
    position: absolute;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: right;
    color: black;
    line-height: 44px;
    border-radius: 5px;
    padding: 0;
  }
}
</style>
