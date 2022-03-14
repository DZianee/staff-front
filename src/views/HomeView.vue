<template>
  <div class="home">
    <nav class="navbar">
      <div class="menu-bar">
        <i class="bx bx-menu bx-lg" />
        <ul>
          <li @click="showHome">Home</li>
          <li @click="showNews">News</li>
          <li @click="showManagement">Management</li>
          <li>Statistic</li>
          <li>Setting</li>
          <li @click="showProfile">My Profile</li>
          <li @click="logout">Log out</li>
        </ul>
      </div>
      <div class="logo">
        <img src="../assets/images/FGW_logo_d.jpeg" alt="logo" />
      </div>
    </nav>

    <HomeOpenTitle />
    <HomeAnnounceTopic />
    <HomeMostIdea :topicList="topicList" />
    <HomeTopicCounter />
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
import HomeOpenTitle from "@/components/HomeOpenTitle.vue";
import HomeAnnounceTopic from "@/components/HomeAnnounceTopic.vue";
import HomeMostIdea from "@/components/HomeMostIdea.vue";
import HomeTopicCounter from "@/components/HomeTopicCounter.vue";

export default {
  name: "HomeView",
  components: {
    HomeOpenTitle,
    HomeAnnounceTopic,
    HomeMostIdea,
    HomeTopicCounter,
  },
  data() {
    return {
      user: {},
      topicList: [],
    };
  },
  created() {
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.user = data;
    console.log(this.user);

    this.$store.dispatch("fetchAccessToken");
    this.$axios
      .post(`api/v1/Topic/GetList`, { searchName: "" }, this.$axios.defaults.headers["Authorization"])
      .then((res) => (this.topicList = res.data.content));
  },
  methods: {
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
    showHome() {
      this.$router.push({ name: "home" });
    },
    showProfile() {
      this.$router.push({ name: "profileView", params: { id: this.user.id } });
    },
    showNews() {
      this.$router.push({ name: "newsView" });
    },
    showManagement() {
      this.$router.push({ name: "manageView" });
    },
  },
};
</script>

<style scoped>
.logo {
  text-align: center;
  position: relative;
  left: -100px;
}
img {
  width: 17%;
  height: auto;
}
.menu-bar {
  position: relative;
  padding: 10px;
}
.menu-bar:hover ul {
  display: block;
  cursor: pointer;
}
ul {
  position: absolute;
  top: 67px;
  left: 0;
  background: white;
  width: 220px;
  height: 460px;
  border: solid grey;
  display: none;
}
ul li {
  padding: 20px;
  font-size: 17px;
}
ul li:hover {
  font-weight: 500;
  cursor: pointer;
}

@media screen and (max-width: 1440px) {
  .logo {
    width: 90%;
    left: -70px;
  }
}
@media screen and (max-width: 1025px) {
  img {
    width: 20%;
  }
  .logo {
    left: -30px;
  }
}
@media screen and (max-width: 769px) {
  .logo {
    width: 85%;
    left: -40px;
  }
  img {
    width: 30%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .logo {
    width: 78%;
    left: -50px;
  }
  img {
    width: 45%;
  }
  .menu-bar {
    width: 40px;
    height: 40px;
    padding: 0;
  }
  .bx {
    font-size: 20px;
  }
  ul {
    top: 45px;
    width: 186px;
    height: 300px;
    z-index: 10;
  }

  ul li {
    padding: 10px;
    font-size: 14px;
    padding-left: 0;
  }
}
</style>
