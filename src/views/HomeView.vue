<template>
  <div class="home">
    <!-- <nav class="header header-nav"> -->
    <nav class="nav-bar">
      <div class="logo">
        <img src="../assets/images/FGW_logo_d.jpeg" alt="logo" class="logo-img" />
      </div>

      <div class="menu-bar" @click="isHiddenNav = !isHiddenNav">
        <i class="bx bx-menu bx-lg" />
        <ul v-if="!isHiddenNav">
          <li>
            <i class="bx bx-home bx-sm bx-fw" />
            Home
          </li>
          <li @click="showNews">
            <i class="bx bx-news bx-sm bx-fw" />
            News
          </li>
          <li @click="showTopicLists">
            <i class="bx bx-library bx-sm bx-fw" />
            Topic's Store
          </li>
          <li v-if="userStored.roleName == 'Manager'" @click="showManagement">
            <i class="bx bx-briefcase bx-sm bx-fw" />
            Management
          </li>
          <li v-if="userStored.roleName == 'Manager'">
            <i class="bx bx-bar-chart-alt-2 bx-sm bx-fw" />
            Statistic
          </li>
          <li>
            <i class="bx bx-cog bx-sm bx-fw" />
            Setting
          </li>
        </ul>
      </div>
      <div class="user-avatar">
        <img
          class="avatar"
          src=" https://i.pinimg.com/236x/e8/48/4d/e8484d6b06aa3f16206627c023a159fd.jpg"
          alt="user avatar"
          @click="isHiddenUser = !isHiddenUser" />
        <div class="user-avatar-info" v-if="!isHiddenUser">
          <ul>
            <span class="user-email">{{ user.username }}</span>
            <li @click="showProfile">
              <i class="bx bx-user-pin bx-sm bx-fw" />
              My Profile
            </li>
            <li @click="logout">
              <i class="bx bx-log-out bx-sm bx-fw" />
              Log-out
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- </nav> -->

    <HomeOpenTitle />
    <HomeAnnounceTopic />
    <HomeMostIdea :topicList="topicList" />
    <HomeTopicCounter :totalIdea="totalIdea" :totalTopic="totalTopic" />
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
      totalIdea: 0,
      totalTopic: 0,
      isHiddenNav: true,
      isHiddenUser: true,
    };
  },
  computed: {
    userStored() {
      return JSON.parse(this.$store.state.user);
    },
  },
  async created() {
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.user = data;
    try {
      this.$store.dispatch("fetchAccessToken");
      const getTopicList = await this.$axios.post(`api/v1/Topic/GetList`, { searchName: "" }, this.$axios.defaults.headers["Authorization"]);
      const getIdeaList = await this.$axios.post(
        `api/v1/Idea/getList`,
        { searchTitle: "", sortTitle: "", sortCreatedDate: "", sortUserName: "" },
        this.$axios.defaults.headers["Authorization"]
      );
      this.topicList = getTopicList.data.content;
      this.totalTopic = this.topicList.length;
      this.totalIdea = getIdeaList.data.content.length;
    } catch (e) {
      console.log("error");
    }
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
    showTopicLists() {
      this.$router.push({ name: "topicListsView" });
    },
    showManagement() {
      this.$router.push({ name: "manageView" });
    },
  },
};
</script>

<style scoped>
.header-nav {
  display: block;
}
.nav-bar {
  border-bottom: solid rgb(111, 109, 109);
  padding: 7px;
  position: fixed;
  height: 80px;
  top: 0;
  width: 100%;
  overflow: hidden;
  z-index: 15;
  background: white;
}
.logo {
  display: flex;
  justify-content: center;
}
.logo-img {
  width: 15%;
  height: auto;
}
.menu-bar {
  position: relative;
  width: fit-content;
  top: -60px;
}
.menu-bar:hover {
  cursor: pointer;
}
.menu-bar:hover ul {
  display: block;
  cursor: pointer;
}
.menu-bar ul {
  position: fixed;
  top: 80px;
  left: 0;
  background: white;
  width: 220px;
  height: fit-content;
  border: solid grey;
}
.menu-bar ul li {
  padding: 20px;
  margin-left: -30px;
  font-size: 17px;
}
.menu-bar ul li:hover {
  font-weight: 500;
  cursor: pointer;
  border-left: solid 6px rgb(135, 199, 220);
}
.user-avatar {
  position: relative;
  float: right;
  top: -120px;
  width: 200px;
}
.user-avatar:hover {
  cursor: pointer;
}
.user-avatar img {
  width: 24%;
  float: right;
  margin-top: 10px;
  margin-right: 50px;
  border-radius: 50%;
  border: solid gray;
}
.user-avatar-info {
  position: fixed;
  top: 80px;
  padding: 12px;
  background: #f6def6;
  border-radius: 10px;
  right: 0;
}
.user-avatar-info::after {
  --background: #f6def6;
  content: "";
  position: absolute;
  right: 70px;
  top: -20px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 0px solid transparent;
  border-bottom: 17px var(--background) solid;
  width: 20px;
  height: 20px;
}
.user-avatar-info ul {
  margin: 10px auto;
}
.user-avatar-info ul li,
.user-email {
  margin: 10px auto;
  padding: 5px;
  margin-left: -35px;
  font-weight: normal;
  font-size: 16px;
}
.user-avatar-info ul li:hover {
  font-weight: 500;
  background: #fdfaf6;
  color: black;
  cursor: pointer;
}
@media screen and (max-width: 1440px) {
  .nav-bar {
    height: 70px;
  }
  .menu-bar ul {
    top: 68px;
  }
}
@media screen and (max-width: 1025px) {
  .logo-img {
    width: 25%;
  }
  .nav-bar {
    height: 80px;
  }
  .user-avatar img {
    margin-right: 10px;
    width: 20%;
    margin-top: 5px;
  }
  .user-avatar-info::after {
    right: 14px;
  }
  .menu-bar ul {
    top: 75px;
  }
}
@media screen and (max-width: 769px) {
  .logo-img {
    width: 27%;
  }
  .nav-bar {
    height: 70px;
    line-height: 40px;
  }
  .user-avatar img {
    width: 19%;
  }
  .user-avatar-info {
    height: 150px;
    width: 170px;
    top: 60px;
  }
  .user-avatar-info::after {
    right: 22px;
  }
  .user-avatar-info ul {
    margin: 0 auto;
  }
  .user-avatar-info ul li,
  .user-email {
    margin: 0px auto;
    padding: 0;
    font-size: 15px;
    margin-left: -20px;
  }
  .menu-bar ul {
    width: 200px;
    /* height: 370px; */
    top: 66px;
  }
  .menu-bar ul li {
    padding: 10px;
    margin-left: -30px;
    font-size: 15px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .logo-img {
    width: 39%;
  }
  .nav-bar {
    height: 65px;
    line-height: 30px;
    overflow: hidden;
    /* width: 447px; */
  }
  .menu-bar .bx-menu {
    padding-top: 10px;
  }
  .menu-bar ul {
    width: 150px;
    /* height: 310px; */
    top: 65px;
  }
  .menu-bar ul li {
    padding: 10px;
    margin-left: -30px;
    font-size: 15px;
  }
  .user-avatar-info {
    height: 140px;
  }
  .user-avatar-info ul li,
  .user-email {
    padding: 5px;
  }
}
</style>
