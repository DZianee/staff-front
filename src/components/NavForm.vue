<template>
  <div class="nav">
    <div class="uni-logo">
      <img class="navbar-logo-image" src="../assets/images/logo.jpg" />
    </div>
    <ul class="nav-items">
      <!-- <router-link to="/" style="text-decoration: none"> -->
      <li class="nav-item" @click="HomeRoute">
        <i class="bx bx-home bx-sm bx-fw" />
        <span>Home</span>
        <span class="tooltiptext">Home</span>
      </li>
      <!-- </router-link> -->
      <li class="nav-item">
        <i class="bx bx-news bx-sm bx-fw" />
        <span>News</span>
        <span class="tooltiptext">News</span>
      </li>
      <li class="nav-item" @click="ManageRoute">
        <i class="bx bx-briefcase bx-sm bx-fw" />
        <span>Manage</span>
        <span class="tooltiptext">Manage</span>

        <!-- <ul class="nav-item-manage">
          <li class="nav-item-manage-item" @click="TopicRoute">Topic</li>
          <li class="nav-item-manage-item" @click="ManageRoute">Manage User</li>
        </ul>
        <span class="bagText">Bag</span> -->
      </li>
      <!-- <li v-if="this.$route.name == 'topicView' || this.$route.name == 'manageview'" class="nav-item js-add" @click="modalAct(this.$route.name)">
        <img src="../assets/pic/Plus.png" />
      </li> -->
      <!-- <router-link to="/"> -->
      <li class="nav-item">
        <i class="bx bx-bar-chart-alt-2 bx-sm bx-fw" />
        <span>Statistic</span>
        <span class="tooltiptext">Statistic</span>
      </li>
      <!-- </router-link> -->
      <li class="nav-item">
        <i class="bx bx-cog bx-sm bx-fw" />
        <span>Setting</span>
        <span class="tooltiptext">Setting</span>
      </li>
      <li class="nav-item log-out" @click="logout">
        <i class="bx bx-log-out bx-sm bx-fw" />
        <span>Log-out</span>
        <span class="tooltiptext">Log-out</span>
      </li>
      <li class="user-shortcut" @click="ProfileRoute">
        <div class="user">
          <img class="avatar" src=" https://i.pinimg.com/236x/e8/48/4d/e8484d6b06aa3f16206627c023a159fd.jpg" alt="user avatar" />
          <div class="user-avatar-info">
            <span class="user-fullname">Chaone nha</span>
            <span class="user-email">Chao123@gmail.com</span>
          </div>
        </div>
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
  props: {
    id: String,
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
    HomeRoute() {
      this.$router.push({ name: "home" });
    },
    // NewsRoute(){
    //   this.$router.push({name:''});
    // },
    TopicRoute() {
      this.$router.push({ name: "topicView" });
    },
    ManageRoute() {
      this.$router.push({ name: "manageView" });
    },
    ProfileRoute() {
      this.$router.push({ name: "profileView", params: { id: this.id } });
    },
    // StatisticRoute(){
    //   this.$router.push({name:''});
    // },
    async logout() {
      try {
        this.$store.dispatch("fetchAccessToken");
        await this.$axios.delete(`api/v1/User/RevokeSelfToken`);
        this.$store.dispatch("logout");
        this.$router.push({ name: "login" });
      } catch (e) {
        //
      }
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
  },
};
</script>

<style scoped>
/* .bagText {
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
} */
</style>
