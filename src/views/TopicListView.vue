<template>
  <div class="topic-lists container">
    <section class="lastest-topic">
      <div class="lastest-topic-header"><h2>Lastest Topic</h2></div>
      <div class="lastest-topic-wrap">
        <div class="lastest-topic-content">
          <h2 class="title">{{ lastestTopic.name }}</h2>
          <p>{{ getStartDate }} - {{ getEndDate }}</p>
        </div>
        <div class="lastest-topic-img">
          <img
            src="https://cdn.dribbble.com/users/823181/screenshots/16719702/media/b986bfb7f5cae8342bb9e89aaf17bdcf.png?compress=1&resize=1200x900&vertical=top"
            alt="Topic lastest img" />
        </div>
      </div>
    </section>
    <section class="other-topics">
      <div class="other-topic-header"><h2>Other Topics</h2></div>
      <div class="other-topic-wrap container">
        <div class="topic-item" v-for="item in topicList" :key="item.index">
          <div class="item-img">
            <img
              src="https://cdn.dribbble.com/users/823181/screenshots/14754851/media/b4f38450eb494e4e37beb8b206c7f9c0.png?compress=1&resize=1200x900&vertical=top"
              alt="item image" />
          </div>
          <div class="item-des">
            <p>{{ item.name }}</p>
            <p class="time">{{ item.totalIdea }} ideas</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "topicLists",
  data() {
    return {
      lastestTopic: {},
      topicList: [],
    };
  },
  async created() {
    try {
      //   this.$store.dispatch("fetchAccessToken");
      const getTopicList = await this.$axios.post(`api/v1/Topic/GetList`, { searchName: "" }, this.$axios.defaults.headers["Authorization"]);
      const getLastesTopic = await this.$axios.get(`api/v1/Topic/newest`, this.$axios.defaults.headers["Authorization"]);

      this.lastestTopic = getLastesTopic.data.content;
      console.log(this.lastestTopic);
      this.topicList = getTopicList.data.content;
      console.log(this.topicList);
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    getStartDate() {
      const startDate = new Date(this.lastestTopic.startDate);
      var month = ("0" + (startDate.getMonth() + 1)).slice(-2);
      var day = ("0" + startDate.getDate()).slice(-2);
      const dm = day + "/" + month;
      return dm;
    },
    getEndDate() {
      const endDate = new Date(this.lastestTopic.closeIdeaDate);
      var month = ("0" + (endDate.getMonth() + 1)).slice(-2);
      var day = ("0" + endDate.getDate()).slice(-2);
      const dm = day + "/" + month;
      return dm;
    },
  },
};
</script>

<style scoped>
.topic-lists {
  right: -8.1%;
  width: calc(100% - 137px);
  /* left: 50%; */
  /* transform: translateX(-50%); */
  padding-top: 2%;
}
.lastest-topic-header {
  text-align: left;
  border-bottom: solid 1px rgb(129, 128, 128);
  margin-bottom: 2%;
  letter-spacing: 0.5px;
  background: linear-gradient(to left, #FBF8F1, #649866);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.lastest-topic-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: fit-content;
}
.lastest-topic-content {
  text-align: center;
  margin: auto;
  padding: 10px;
}
.lastest-topic-content .title {
  font-weight: 500;
  font-size: 34px;
}
.lastest-topic-content .title:hover {
  font-size: 40px;
  cursor: pointer;
  color: #3d5afe;
  text-decoration: underline;
}
.lastest-topic-content p {
  font-size: 22px;
}
.other-topics {
  margin-top: 5%;
}
.other-topics .other-topic-header {
  text-align: center;
  border-bottom: solid 1px rgb(129, 123, 123);
  letter-spacing: 0.8px;
  background: linear-gradient(to left, #FBF8F1, #649866);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.other-topic-wrap {
  margin-top: 30px;
  margin-bottom: 40px;
  height: 695px;
  overflow-y: auto;
  scroll-behavior: smooth;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 40px;
  row-gap: 40px;
  padding-left: 4.2%;
}
.item-img {
  width: 88%;
}
.item-des {
  text-align: left;
  width: 88%;
  padding: 5px;
  height: fit-content;
}
.item-des p {
  font-size: 20px;
  font-weight: 500;
  color: black;
}
.item-des p:not(.item-des .time):hover {
  cursor: pointer;
  color: #3d5afe;
  text-decoration: underline;
}
.item-des .time {
  font-size: 16px;
  font-weight: 500;
  color: gray;
}
@media screen and (max-width: 1440px) {
  .topic-lists {
    width: calc(100% - 272px);
  }
}
@media screen and (max-width: 1366px) {
  .topic-lists {
    width: calc(100% - 300px);
    right: -9%;
  }
}
@media screen and (max-width: 1025px) {
  .topic-lists {
    width: calc(100% - 101px);
    right: -4%;
  }
}
@media screen and (max-width: 768px) {
  .topic-lists {
    width: calc(100% - 92px);
    right: -5%;
  }
  .lastest-topic-content .title {
    font-size: 24px;
  }
  .lastest-topic-content .title:hover {
    font-size: 24px;
  }
  .lastest-topic-content p {
    font-size: 18px;
  }
  h2 {
    font-size: 25px;
  }
  .other-topics {
    margin-top: 10%;
  }
  .other-topics .other-topic-header {
    font-size: 25px;
  }
  .other-topic-wrap {
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    row-gap: 40px;
    padding-left: 7%;
  }
}
@media screen and (max-width: 480px) {
  .topic-lists {
    width: 100%;
    right: 0;
    top: 90px;
    height: 1100px;
  }
  .other-topic-wrap {
    grid-template-columns: 100%;
    row-gap: 40px;
    padding-left: 15%;
    height: 700px;
  }
  .lastest-topic-content .title {
    font-size: 20px;
  }
  .lastest-topic-content .title:hover {
    font-size: 20px;
  }
  .lastest-topic-content p {
    font-size: 15px;
  }
  h2 {
    font-size: 22px;
  }
  .other-topics {
    margin-top: 10%;
  }
  .other-topics .other-topic-header {
    font-size: 22px;
  }
}
</style>
