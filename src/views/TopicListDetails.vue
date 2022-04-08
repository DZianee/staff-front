<template>
  <div class="topic-list-details container">
    <nav aria-label="breadcrumb" style="padding-top: 20px">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" @click="TopicListRoute">Topic's Store</li>
        <li class="breadcrumb-item active" aria-current="page">Topic details</li>
      </ol>
    </nav>
    <div class="topic-details container">
      <div class="topic-detail-header">
        <div class="detail-title">
          <h1>{{ topicDetail.name }}</h1>
          <p class="create-datetime">Published on {{ getStartDate(topicDetail.startDate) }}</p>
        </div>
      </div>
      <div class="detail-content-wrap">
        <div class="topic-detail-des">
          <div class="detail-img">
            <img :src="`https://${topicDetail.image}`" alt="detail image" />
          </div>
          <div class="detail-des" v-html="topicDetail.description"></div>
          <p class="view-topic-idea" @click="NewsRoute">Move to the News</p>
        </div>
        <div class="other-topic-list">
          <div class="other-topic-header"><h2>Other Topics</h2></div>
          <div class="other-topic-wrap container">
            <div class="topic-item" v-for="item in topicList" :key="item.index">
              <div class="item-img">
                <img v-if="item.topicImage != null && item.topicImage" :src="`https://${item.topicImage}`" alt="item image" />
                <img
                  v-else
                  src="https://cdn.dribbble.com/users/823181/screenshots/14754851/media/b4f38450eb494e4e37beb8b206c7f9c0.png?compress=1&resize=1200x900&vertical=top"
                  alt="item image" />
              </div>
              <div class="item-des">
                <p @click="openTopic(item.id)">{{ item.name }}</p>
                <p class="time">{{ item.totalIdea }} ideas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicListDetails",
  props: {
    topicId: String,
  },
  data() {
    return {
      topicDetail: {},
      id: this.$route.params.id,
      topicList: [],
    };
  },
  async created() {
    try {
      const getTopicList = await this.$axios.post(`api/v1/Topic/GetList`, { searchName: "" }, this.$axios.defaults.headers["Authorization"]);
      this.topicList = getTopicList.data.content;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    TopicListRoute() {
      this.$router.push({ name: "topicListsView" });
    },
    NewsRoute() {
      this.$router.push({ name: "newsView", params: { id: this.id } });
    },
    getStartDate(date) {
      const dateCreate = new Date(date);
      const dmy = dateCreate.toLocaleString();
      return dmy;
    },
    openTopic(id) {
      this.id = id;
    },
    async getTopicDetails() {
      try {
        const getTopicDetail = await this.$axios.get(`api/v1/Topic/${this.id}`, this.$axios.defaults.headers["Authorization"]);
        this.topicDetail = getTopicDetail.data.content;
        console.log(this.topicDetail);
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    id() {
      this.getTopicDetails();
    },
  },
  mounted() {
    this.getTopicDetails();
  },
};
</script>

<style scoped>
.breadcrumb-item:hover {
  font-weight: 500;
  cursor: pointer;
}
.breadcrumb-item.active {
  color: rgb(67, 139, 255);
  font-weight: 500;
  text-decoration: underline;
}
.topic-list-details {
  padding-top: 40px;
  right: -8.1%;
  width: calc(100% - 137px);
}
.detail-title .create-datetime {
  font-size: 16px;
  padding-top: 10px;
}
.detail-content-wrap {
  margin-top: 2%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 40px;
}
img {
  height: max(556px);
  width: max(825px);
  object-fit: contain;
}
.detail-des {
  padding: 20px;
  line-height: 40px;
  font-size: 20px;
  text-align: justify;
}
.view-topic-idea {
  font-size: 16px;
  padding: 20px;
  color: black;
}
.view-topic-idea:hover {
  text-decoration: underline;
  cursor: pointer;
  color: rgb(228, 85, 85);
}
/* p {
  font-size: 18px;
} */
.other-topic-header h2 {
  padding: 10px;
  font-size: 24px;
}
.other-topic-list {
  border-left: 1px solid rgb(179, 179, 179);
}
.other-topic-wrap {
  display: grid;
  row-gap: 40px;
  height: 900px;
  overflow: hidden;
  overflow-y: auto;
}
.other-topic-wrap .topic-item {
  margin-top: 2%;
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  column-gap: 10px;
}
.item-img img {
  width: max(88%);
  height: max(110px);
  object-fit: cover;
}
.item-des p:not(.time) {
  font-size: 18px;
  color: black;
  font-weight: 500;
}
.item-des p:not(.time):hover {
  cursor: pointer;
  color: #3d5afe;
  text-decoration: underline;
}
@media screen and (max-width: 1440px) {
  .topic-list-details {
    width: calc(100% - 272px);
  }
}
@media screen and (max-width: 1025px) {
  .topic-list-details {
    width: calc(100% - 101px);
    right: -4%;
  }
  img {
    height: max(380px);
  }
  .item-img img {
    width: max(100%);
    height: max(90px);
  }
}
@media screen and (max-width: 768px) {
  .topic-list-details {
    width: calc(100% - 92px);
    right: -5%;
  }
  .detail-content-wrap {
    margin-top: 2%;
    display: grid;
    grid-template-columns: 100%;
  }
  /* img {
  height: max(36px);
  width: max(825px);
} */
  .other-topic-list {
    border-left: none;
  }
  .other-topic-wrap {
    row-gap: 30px;
    height: 400px;
  }
  .item-des p:not(.time) {
    font-size: 19px;
  }
  .item-des p:not(:nth-child(1)) {
    font-size: 16px;
  }
  .detail-des {
    font-size: 18px;
  }
  .item-img img {
    width: max(90%);
    height: max(100px);
  }
}
@media screen and (max-width: 480px) {
  .topic-list-details {
    width: 100%;
    right: 0;
    top: 50px;
  }
  .topic-detail-header .detail-title h1 {
    font-size: 24px;
    line-height: 30px;
  }
  .detail-title .create-datetime {
    font-size: 15px;
  }
  .other-topic-wrap {
    row-gap: 30px;
    height: 350px;
  }
  .other-topic-list {
    height: 480px;
  }
  .detail-des {
    font-size: 16px;
  }
}
</style>
