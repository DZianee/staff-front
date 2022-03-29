<template>
  <div class="nav">
    <div class="uni-logo">
      <img class="navbar-logo-image" src="../assets/images/FGW_logo_d.jpeg" />
    </div>
    <ul class="nav-items">
      <li class="nav-item" @click="HomeRoute">
        <i class="bx bx-home bx-sm bx-fw" />
        <span>Home</span>
        <span class="tooltiptext">Home</span>
      </li>
      <li class="nav-item" @click="NewsRoute">
        <i class="bx bx-news bx-sm bx-fw" />
        <span>News</span>
        <span class="tooltiptext">News</span>
      </li>
      <li class="nav-item" @click="TopicListsRoute">
        <i class="bx bx-library bx-sm bx-fw" />
        <span>Topic's Store</span>
        <span class="tooltiptext">Topic's Store</span>
      </li>
      <!-- <li class="nav-item" @click="ManageRoute"> -->
      <li class="nav-item" @click="ManageRoute" v-if="userStored.roleName == 'Manager'">
        <i class="bx bx-briefcase bx-sm bx-fw" />
        <span>Manage</span>
        <span class="tooltiptext">Manage</span>
      </li>
      <li class="nav-item" v-if="userStored.roleName == 'Manager'" @click="$router.push({ path: 'report' })">
        <i class="bx bx-bar-chart-alt-2 bx-sm bx-fw" />
        <span>Statistic</span>
        <span class="tooltiptext">Statistic</span>
      </li>
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
          <img class="avatar" :src="`https://${user.profileImage}`" alt="user avatar" />
          <div class="user-avatar-info">
            <span class="user-fullname"> {{ user.firstname }} {{ user.lastname }}</span>
            <span class="user-email">{{ user.username }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <!-- <Topic-Modal-Form @close="modalActt()" :modalActive="modalActive" /> -->
</template>

<script>
// let self = this;
// import TopicModalForm from "@/components/TopicModalForm.vue";
import { ref } from "vue";

export default {
  components: {
    // TopicModalForm,
  },
  props: {
    id: String,
  },
  data() {
    return {
      user: {},
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    userStored() {
      return JSON.parse(this.$store.state.user);
    },
  },
  created() {
    this.$store.dispatch("fetchAccessToken");
    this.$axios.get(`api/v1/User/${this.id}`, this.$axios.defaults.headers["Authorization"]).then((res) => {
      this.user = res.data.content;
    });
  },
  methods: {
    HomeRoute() {
      this.$router.push({ name: "home" });
    },
    NewsRoute() {
      this.$router.push({ name: "newsView" });
    },
    TopicListsRoute() {
      this.$router.push({ name: "topicListsView" });
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
/* .user {
  justify-content: space-between;
} */
.user-avatar-info {
  margin: 0;
}
@media screen and (max-width: 1025px) {
  .user {
    justify-content: center;
    padding: 0;
  }
}
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
