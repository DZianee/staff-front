<template>
  <div class="news container">
    <p>New Activity</p>
    <NewsTopicBar :topicList="topicList" @get-all-idea="getAllIdea" @get-idea-via-topic="getIdeaVia" />

    <div v-if="newsTitle == '' || newsTitle === 'all'">
      <div class="news-topic-idea container">
        <h1>Mixed it up !!!</h1>
      </div>
    </div>
    <div v-else>
      <div class="news-topic-idea container">
        <h1>{{ newsTitle }}</h1>
      </div>
    </div>

    <NewsIdeaList :choice="choice" :id="topicId" />
  </div>
</template>

<script>
import NewsTopicBar from "../components/NewsTopicBar.vue";
import NewsIdeaList from "../components/NewsIdeaList.vue";
export default {
  name: "NewsPage",
  data() {
    return {
      choice: "",
      topicList: [],
      topicId: "",
      newsTitle: "",
    };
  },
  components: { NewsTopicBar, NewsIdeaList },
  async created() {
    this.$store.dispatch("getUser");
    try {
      this.$store.dispatch("fetchAccessToken");
      const getTopicList = await this.$axios.post(`api/v1/Topic/GetList`, { searchName: "" }, this.$axios.defaults.headers["Authorization"]);
      this.topicList = getTopicList.data.content;
    } catch (e) {
      console.log("error");
    }
  },
  methods: {
    getAllIdea(item) {
      this.choice = item;
      this.newsTitle = item;
    },
    getIdeaVia(item, name, txt) {
      this.topicId = item;
      this.choice = txt;
      this.newsTitle = name;
      console.log(this.topicId);
    },
  },
};
</script>

<style scoped>
.news {
  height: fit-content;
  position: relative;
  right: -8.1%;
  /* border: solid; */
}
.news p {
  font-size: 20px;
  padding: 10px;
  color: black;
  font-weight: 500;
}
h1 {
  position: relative;
  top: 32%;
  z-index: 1;
  font-size: 60px;
  color: white;
}
.news-topic-idea {
  text-align: center;
  line-height: 300px;
  height: 300px;
  border-radius: 20px;
  position: relative;
  width: 97%;
  background: url("https://cdn.dribbble.com/users/1355613/screenshots/15349243/media/71e74eb3be96c50e3769c5fc5c8ba995.jpg?compress=1&resize=1200x900&vertical=top")
    20px -120px;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.news-topic-idea::after {
  content: "";
  width: 100%;
  height: 300px;
  border-radius: 12px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.8;
  background: linear-gradient(to right, #11324d, #ff7878, #c490e4, #c1ffd7);
  animation: gradient 15s ease infinite;
  background-size: 400% 400%;
}
@media screen and (max-width: 1440px) {
  .news {
    width: 81%;
  }
  h1 {
  top: 28%;
}
}
@media screen and (max-width: 1366px) {
  .news {
    width: 78%;
    right: -9%;
  }
}
@media screen and (max-width: 1025px) {
  .news {
    width: 90%;
    right: -4%;
  }
  .news-topic-idea {
    background-position: -50px -120px;
  }
}
@media screen and (max-width: 768px) {
  .news {
    width: 88%;
    right: -5%;
  }
  .news-topic-idea {
    background-position: -50px -120px;
    height: 250px;
  }
  .news-topic-idea::after {
    height: 250px;
  }
  h1{
    font-size: 45px;
  }
}
@media screen and (max-width: 480px) {
  .news {
    width: 100%;
    right: 0;
    top: 80px;
    height: 3640px;
  }
  h1 {
  font-size: 35px;
  top: 35%;
}
}
@media screen and (max-width: 412px) {
  .news {
    width: 100%;
    right: 0;
    top: 80px;
    height: 3480px;
  }
}
</style>
