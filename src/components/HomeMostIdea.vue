<template>
  <div class="most-idea_react">
    <img class="img-trophy-1" src="../assets/images/trophy.png" alt="trophy" />
    <img class="img-trophy-2" src="../assets/images/trophy.png" alt="trophy" />
    <h1>Top of the Most Highest Idea's Achievement</h1>
    <div class="idea container">
      <div class="idea-info" v-for="idea in ideaList" :key="idea.index" :id="idea.topicName">
        <div class="topic-name" :style="{ backgroundColor: idea.colorCode }">{{ idea.topicName }}</div>
        <div class="card user-idea">
          <div class="idea-content">
            <h4 class="idea-title">{{ idea.idea.title }}</h4>
            <p class="idea-des">
              <!-- Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.There are many variations
              of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words
              which don't look even slightly believable. of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words
              which don't look even slightly believable. of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words
              which don't look even slightly believable. of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words
              which don't look even slightly believable. -->
              {{ idea.idea.description }}
            </p>
          </div>
          <div class="idea-summary-react-comment">
            <div class="card summary-react">
              <p>{{ idea.idea.totalLike }} likes</p>
            </div>
            <div class="card summary-comment">
              <p>{{ idea.idea.totalComments }} comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const scrollContainer = document.querySelector(".idea");

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
});
export default {
  name: "HomeMostIdea",
  data() {
    return {
      ideaList: [],
    };
  },
  props: {
    topicList: Array,
  },
  mounted() {
    this.$axios.get(`api/v1/Idea/mostReact`, this.$axios.defaults.headers["Authorization"]).then((res) => {
      this.ideaList = res.data.content;
    });
  },
};
</script>

<style scoped>
.most-idea_react {
  margin-top: 140px;
  height: 570px;
  padding: 20px;
  background: #fbf8f1;
  /* background: linear-gradient(to top, #fde2e2, #f4eeff, #f4eeff); */
}
img {
  width: 140px;
  height: 140px;
  position: absolute;
  display: none;
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

.idea {
  display: grid;
  overflow-x: auto;
  height: 78%;
  width: 74%;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  overflow-y: hidden;
  scroll-behavior: smooth;
}
.idea {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.idea::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
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
  background: #fefbf3;
}
.topic-name {
  text-align: center;
  height: fit-content;
  text-align: center;
  font-size: 22px;
  font-weight: 500;
}
.idea-content {
  border-radius: 20px;
}
.idea-title {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  padding: 10px;
  border-bottom: black solid;
  /* background: #79b4b7; */
  color: black;
}
.idea-des {
  font-size: 16px;
  padding: 20px 30px 0 30px;
  text-align: left;
  height: 240px;
  overflow: hidden;
}
.idea-summary-react-comment {
  display: grid;
  grid-template-rows: 50% 50%;
  row-gap: 10px;
}
.card {
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
@media screen and (max-width: 1440px) {
  .img-trophy-1 {
    left: 90px;
  }
  .img-trophy-2 {
    right: 70px;
  }
  .idea {
    width: 88%;
    margin-left: 90px;
  }
}
@media screen and (max-width: 1025px) {
  .img-trophy-1 {
    left: 20px;
  }
  .img-trophy-2 {
    right: 10px;
  }
  img {
    width: 100px;
    height: 100px;
  }
  h1 {
    font-size: 40px;
  }
  .idea {
    width: 80%;
    margin-left: 110px;
  }
  .idea .user-idea {
    width: 750px;
  }
  .idea-content {
    border-radius: 20px;
  }
  .idea-title {
    padding: 12px;
    font-size: 22px;
  }
  .idea-des {
    font-size: 14px;
  }
  .card {
    width: 80%;
    height: 84%;
  }
  .idea-summary-react-comment p {
    font-size: 18px;
  }
}
@media screen and (max-width: 769px) {
  .idea {
    width: 100%;
    margin-left: 0;
  }
  .idea .user-idea {
    width: 650px;
    margin-left: 25px;
    height: 370px;
    column-gap: 30px;
  }
  h1 {
    font-size: 40px;
  }
  img {
    width: 60px;
    height: 60px;
  }
  .idea-title {
    padding: 12px;
    font-size: 20px;
  }
  .most-idea_react {
    height: 610px;
    padding: 20px;
  }
  .topic-title {
    margin-top: 10px;
  }
  .topic-title ul li a {
    font-size: 16px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .most-idea_react {
    margin-top: 40px;
    height: 420px;
  }
  .topic-name {
    font-size: 20px;
  }
  img {
    width: 40px;
    height: 40px;
  }
  h1 {
    font-size: 25px;
  }
  .topic-title {
    width: 80%;
    margin-top: 0;
  }
  .topic-title ul li {
    margin: 0 7px;
    padding: 0;
    width: max-content;
    height: 33px;
  }
  .topic-title ul li a {
    font-size: 13px;
    padding: 5px;
  }
  .idea-title {
    font-size: 15px;
  }
  .idea .user-idea {
    width: 420px;
    top: 12px;
    margin-left: 5px;
    height: 240px;
    column-gap: 12px;
  }
  .idea-des {
    font-size: 13px;
    padding-top: 2px;
    height: 110px;
  }
  .summary-react {
    height: 80px;
  }
  .idea-summary-react-comment {
    row-gap: 10px;
    width: 180px;
  }
  .idea-content {
    height: 190px;
  }
  .idea-summary-react-comment p {
    top: 24px;
    font-size: 13px;
  }
}
</style>
