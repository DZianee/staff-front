<template>
  <div class="home-announce-topic container">
    <h1>
      <span>New Topic</span>
      is coming to
      <span>Greenwich</span>
    </h1>
    <div class="announcement-topic">
      <div><img src="../assets/images/environment.jpg" alt="anvironment man" /></div>
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
        <a href="#">Click to view more<i class="bx bx-right-arrow-alt bx-fw bx-sm" /></a>
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
  created() {
    this.$store.dispatch("fetchAccessToken");
    this.$axios.get(`api/v1/Topic/newest`, this.$axios.defaults.headers["Authorization"]).then((res) => {
      this.newTopic = res.data.content;
      console.log(this.newTopic);
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
};
</script>

<style scoped>
.container {
  margin-top: 140px;
  /* transform: translate(0, 140px); */
  height: 500px;
  border-radius: 20px;
  position: static;
  /* background: linear-gradient(to left, #C9CBFF, #F6F6F6); */
  /* -webkit-text-fill-color: transparent; */
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
  color: #b97a95;
}

h1 span {
  font-size: 70px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  height: 78%;
  width: 100%;
  border-radius: 20px;
}
.new-topic-content {
  padding-top: 50px;
  height: 78%;
}
.new-topic_title {
  color: #34626c;
  font-size: 40px;
  text-align: center;
}
/* .new-topic_des, */
.new-topic_timeline {
  --font-weight-500: 500;
  text-align: center;
  padding: 15px;
  font-size: 22px;
  font-weight: var(--font-weight-500);
}
.new-topic_timeline span {
  font-weight: 600;
}
a {
  font-size: 17px;
  color: #b983ff;
  text-align: right;
  margin-right: 90px;
  position: relative;
  top: 30px;
  display: block;
  font-weight: var(--font-weight-500);
}
a:hover {
  color: darkorchid;
}
@media screen and (max-width: 1025px) {
  .announcement-topic {
    margin-top: 40px;
    height: 300px;
  }
  h1 {
    font-size: 30px;
  }
  h1 span {
    font-size: 40px;
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
}
@media screen and (max-width: 768px) {
  img {
    width: 100%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .announcement-topic {
    margin-top: 20px;
    height: 200px;
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
    font-size: 18px;
  }
  .new-topic_des {
    display: none;
  }
  .new-topic_timeline {
    font-size: 14px;
  }
  a {
    font-size: 14px;
    float: none;
    margin: -20px 20px 0 0;
  }
  .new-topic-content {
    height: 200px;
  }
}
</style>
