<template>
  <div class="home-announce-topic container">
    <h1>
      <span>New Topic</span>
      is coming to
      <span>Greenwich</span>
    </h1>
    <div class="announcement-topic">
      <div>
        <img
          src="https://images.unsplash.com/photo-1618759618709-2333be0254cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
          alt="announcement" />
      </div>
      <div class="new-topic-content">
        <h2 class="new-topic_title">{{ newTopic.name }}</h2>
        <!-- <p class="new-topic_des">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p> -->
        <p class="new-topic_timeline">
          <span> Timeline posted: </span>
          {{ getStartDate }} - {{ getEndDate }}
        </p>
        <p class="route" @click="toTopicListDetails(newTopic.id)">View more<i class="bx bx-right-arrow-alt bx-fw bx-sm" /></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeAnnounceTopic",
  data() {
    return {
      newTopic: {},
    };
  },
  mounted() {
    this.$axios.get(`api/v1/Topic/newest`, this.$axios.defaults.headers["Authorization"]).then((res) => {
      this.newTopic = res.data.content;
    });
  },
  computed: {
    getStartDate() {
      const startDate = new Date(this.newTopic.startDate);
      var month = ("0" + (startDate.getMonth() + 1)).slice(-2);
      var day = ("0" + startDate.getDate()).slice(-2);
      const dm = day + "/" + month;
      return dm;
    },
    getEndDate() {
      const endDate = new Date(this.newTopic.closeIdeaDate);
      var month = ("0" + (endDate.getMonth() + 1)).slice(-2);
      var day = ("0" + endDate.getDate()).slice(-2);
      const dm = day + "/" + month;
      return dm;
    },
  },
  methods: {
    toTopicListDetails(id) {
      this.$router.push({ name: "topicListView", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 140px;
  /* transform: translate(0, 140px); */
  height: 500px;
  position: static;
  /* background: linear-gradient(to left, #C9CBFF, #F6F6F6); */
  /* -webkit-text-fill-color: transparent; */
  /* border: solid yellow; */
}

.announcement-topic {
  height: 370px;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 50% 50%;
}
h1 {
  font-size: 45px;
  text-align: center;
  letter-spacing: 2px;
  color: #34626c;
}

h1 span {
  font-size: 70px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite, slideDown ease 0.7s forwards 0.9s;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  position: relative;
}
@keyframes slideDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(40px);
    opacity: 1;
  }
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
img {
  height: 75%;
  width: 100%;
  border-radius: 10px;
}
.new-topic-content {
  position: relative;
  padding-top: 50px;
  height: 78%;
  z-index: 1;
}
.new-topic-content::after {
  content: "";
  height: 85%;
  position: absolute;
  width: calc(100% + 165px);
  top: 0;
  background: #d3f6f3;
  z-index: -1;
  left: 20px;
  margin-top: 20px;
  display: none;
}
.new-topic_title {
  color: #34626c;
  font-size: 40px;
  text-align: center;
  position: relative;
}
.new-topic_timeline {
  --font-weight-500: 500;
  text-align: center;
  padding: 15px;
  position: relative;

  font-size: 22px;
  font-weight: var(--font-weight-500);
}
.new-topic_timeline span {
  font-weight: 600;
}
.route {
  font-size: 17px;
  color: #b983ff;
  text-align: center;
  /* margin-right: 90px; */
  position: relative;
  top: 30px;
  display: block;
  font-weight: var(--font-weight-500);
}
.route:hover {
  color: darkorchid;
  cursor: pointer;
}
@media screen and (max-width: 1440px) {
  .new-topic-content::after {
    height: 72%;
    top: 30px;
  }
}
@media screen and (max-width: 1025px) {
  .announcement-topic {
    margin-top: 40px;
    height: 300px;
  }
  h1 {
    font-size: 40px;
  }
  h1 span {
    font-size: 50px;
  }
  .new-topic_title {
    font-size: 28px;
  }
  .container {
    height: 400px;
  }
  .new-topic-content {
    height: 300px;
  }
  .new-topic_timeline {
    font-size: 20px;
  }
  img {
    height: 90%;
  }
  .new-topic-content::after {
    height: 72%;
    top: 30px;
  }
}
@media screen and (max-width: 768px) {
  img {
    width: 100%;
  }
  .container {
    margin-top: 90px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .announcement-topic {
    height: 165px;
    margin-top: 30px;
  }
  .container {
    margin-top: 50px;
  }
  img {
    height: 100%;
  }
  .container {
    height: 250px;
    top: 50px;
  }
  h1 span {
    font-size: 25px;
  }
  h1 {
    font-size: 20px;
  }
  .new-topic_title {
    font-size: 14px;
  }
  .new-topic_timeline {
    font-size: 13px;
  }
  .route {
    font-size: 13px;
    margin: -30px 0px 0 0;
  }
  .new-topic-content {
    height: 90%;
  }
}
.new-topic-content::before {
  top: 20px;
}
</style>
