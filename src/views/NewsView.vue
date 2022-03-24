<template>
  <div class="news container">
    <p>News Idea</p>
    <NewsTopicBar :topicList="topicList" @get-all-idea="getAllIdea" @get-idea-via-topic="getIdeaVia" />

    <div v-if="newsTitle == '' || newsTitle === 'all'">
      <div class="news-topic-idea container">
        <h1>Tat ca la tai Uchiha</h1>
      </div>
    </div>
    <div v-else>
      <div class="news-topic-idea container">
        <h1>{{ newsTitle }}</h1>
      </div>
    </div>

    <NewsIdeaList :ideaList="ideaList" :choice="choice" :ideaListViaTopic="ideaListViaTopic" />
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
      ideaList: [],
      ideaListViaTopic: [],
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

      const getIdeaList = await this.$axios.post(
        `api/v1/Idea/getList`,
        { searchTitle: "", sortTitle: "", sortCreatedDate: "", sortUserName: "" },
        this.$axios.defaults.headers["Authorization"]
      );
      this.topicList = getTopicList.data.content;
      this.ideaList = getIdeaList.data.content;
      console.log(this.ideaList);
      console.log(this.ideaList);
    } catch (e) {
      console.log("error");
    }
  },
  methods: {
    getAllIdea(item) {
      this.choice = item;
      this.newsTitle = item;
    },
    async getIdeaVia(item, name, txt) {
      this.topicId = item;
      this.choice = txt;
      this.newsTitle = name;

      this.$store.dispatch("getUser");
      this.$store.dispatch("fetchAccessToken");

      const getIdeaListviaTopic = await this.$axios.post(
        `api/v1/Idea/topic/${this.topicId}`,
        { searchTitle: "", sortTitle: "", sortCreatedDate: "", sortUserName: "" },
        {
          params: {
            PageSize: 6,
            CurrentPage: this.currentPage,
          },
        }
      );
      this.ideaListViaTopic = getIdeaListviaTopic.data.content;
    },
  },
};
</script>

<style scoped>
.news {
  height: fit-content;
  position: relative;
  left: 130px;
  border: solid;
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
  font-size: 80px;
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
</style>
