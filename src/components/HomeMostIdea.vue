<template>
  <div class="most-idea_react">
    <img class="img-trophy-1" src="../assets/images/trophy.png" alt="trophy" />
    <img class="img-trophy-2" src="../assets/images/trophy.png" alt="trophy" />
    <h1>Top of the Most Highest Idea's Achievement</h1>
    <div class="topic-title container">
      <ul>
        <li v-for="topic in topicList" :key="topic.id">
          <a href="#testnha"> {{ topic.name }}</a>
        </li>
      </ul>
    </div>
    <div class="idea container">
      <div class="card user-idea">
        <div class="idea-content">
          <h4 class="idea-title">Ai biet gi dau</h4>
          <p class="idea-des">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.There are many variations of
            passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which
            don't look even slightly believable.
          </p>
        </div>
        <div class="idea-summary-react-comment">
          <div class="card summary-react">
            <p>300 likes</p>
          </div>
          <div class="card summary-comment">
            <p>200 comments</p>
          </div>
        </div>
      </div>
      <div class="user-idea">
        <div class="idea-content">
          <h4 class="idea-title">idea title</h4>
          <p class="idea-des">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div class="idea-summary-react-comment">
          <div class="card summary-react">
            <p>300 likes</p>
          </div>
          <div class="card summary-comment">
            <p>200 comments</p>
          </div>
        </div>
      </div>
      <div class="user-idea" id="testnha">
        <div class="idea-content">
          <h4 class="idea-title">idea title</h4>
          <p class="idea-des">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div class="idea-summary-react-comment">
          <div class="card summary-react">
            <p>300 likes</p>
          </div>
          <div class="card summary-comment">
            <p>200 comments</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeMostIdea",
  data() {
    return {
      topicList: [],
    };
  },
  created() {
    this.$store.dispatch("fetchAccessToken");
    // this.$axios.get(`api/v1/Idea/mostReact`, this.$axios.defaults.headers["Authorization"]).then((res) => console.log(res));
    this.$axios
      .post(`api/v1/Topic/GetList`, { name: "" }, this.$axios.defaults.headers["Authorization"])
      .then((res) => (this.topicList = res.data.content));
  },
};
</script>

<style scoped>
.most-idea_react {
  margin-top: 140px;
  height: 570px;
  padding: 20px;
  /* background: #F7F6E7; */
  background: linear-gradient(to top, #fde2e2, #f4eeff, #f4eeff);
}
img {
  width: 140px;
  height: 140px;
  position: absolute;
}
.img-trophy-1 {
  left: 200px;
  transform: rotate(-20deg);
}
.img-trophy-2 {
  right: 170px;
  transform: rotate(20deg);
}
h1 {
  padding: 10px;
  margin-left: 20px;
  letter-spacing: 1.5px;
  font-size: 50px;
  text-align: center;
}
.topic-title {
  width: 50%;
  margin-top: 20px;
  /* border: solid #D8D3CD; */
  border-left: none;
  border-right: none;
}
.topic-title ul {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  overflow-y: hidden;
}
.topic-title ul li {
  border: solid fuchsia;
  text-align: center;
  width: auto;
  border-radius: 30px;
  margin: 0 20px;
  padding: 5px;
  font-weight: 500;
}
.topic-title ul li a {
  font-size: 18px;
  text-decoration: none;
}

.idea {
  display: grid;
  /* justify-content: space-evenly; */
  /* border: solid red; */
  overflow-x: auto;
  height: 85%;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 200px;
  overflow-y: hidden;
}
.idea .user-idea {
  display: grid;
  grid-template-columns: 60% 40%;
  border-radius: 20px;
  column-gap: 50px;
  position: relative;
  height: 350px;
  top: 30px;
  width: 1200px;
  padding: 25px;
  margin-left: 50px;
  /* border: solid pink; */
}
.idea-content {
  border: salmon solid;
  border-radius: 20px;
}
.idea-title {
  text-align: center;
  padding: 10px;
  border-bottom: black solid;
}
.idea-des {
  font-size: 16px;
  padding: 20px 30px 0 30px;
  text-align: left;
  /* border: olivedrab solid; */
}
.idea-summary-react-comment {
  display: grid;
  grid-template-rows: 50% 50%;
  row-gap: 10px;
}
.card {
  /* border: palevioletred solid; */
  width: 90%;
  height: 86%;
  text-align: center;
  border-radius: 15px;
}
.idea-summary-react-comment p {
  position: relative;
  top: 50px;
  color: black;
  font-size: 22px;
  font-weight: 500;
}
.summary-react {
  /* border: lightgreen solid; */
  background: linear-gradient(to top right, #f9f3df, #ffdefa, #b983ff);
  border: lavender solid;
}
.summary-comment {
  /* border: lightslategrey solid; */
  background: linear-gradient(to bottom right, #f9f3df, #caf7e3, #b5eaea);
}
</style>
