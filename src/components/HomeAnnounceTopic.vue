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
        <h2 class="new-topic_title">Hana and Chao in Barbie world</h2>
        <p class="new-topic_des">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <p class="new-topic_timeline">
          <span> Timeline idea posted: </span>
          {{}} --- {{}}
        </p>
        <a href="#">Click to view more<i class="bx bx-right-arrow-alt bx-fw bx-sm" /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeAnnounceTopic",
  data(){
    return{
      newTopic:{},
    }
  },
  created(){
    this.$store.dispatch("fetchAccessToken");
    this.$axios.get(`api/v1/Topic/newest`, this.$axios.defaults.headers["Authorization"]).then((res) => {
      this.newTopic = res.data.content;
      console.log(this.newTopic)
    });
  }
};
</script>

<style scoped>
.container {
  border: solid lightcoral;
  position: relative;
  top: 120px;
  height: 520px;
  border-radius: 20px;
}

.announcement-topic {
  height: 350px;
  border: solid blue;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 50% 50%;
}
h1 {
  font-size: clamp(0.2rem, 1vw + 1.1rem, 1.7rem);
  text-align: center;
  letter-spacing: 2px;
  color: #b97a95;
}
h1 span {
  font-size: 50px;
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
  height: 81%;
  width: 100%;
  border-radius: 20px;
}
.new-topic_title {
  color: black;
  font-size: clamp(1rem, 1vw + 1rem, 2.5rem);
  text-align: center;
}
.new-topic_des,
.new-topic_timeline {
  text-align: left;
  padding: 15px;
  font-size: clamp(0.3rem, 1vw + 1rem, 0.9rem);
  font-weight: 500;
}
.new-topic_timeline span {
  font-weight: 600;
}
a {
  font-size: 17px;
  color: #b983ff;
  text-align: right;
  margin-right: 30px;
  display: block;
  font-weight: 500;
}
a:hover {
  color: darkorchid;
}
@media screen and (max-width: 1025px) {
  .announcement-topic {
    margin-top: 40px;
  }
}
@media screen and (max-width: 768px) {
  .announcement-topic {
    margin-top: 30px;
  }
  img {
    height: 78%;
    width: 100%;
    border-radius: 20px;
  }
  .container {
    height: 450px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .announcement-topic {
    margin-top: 20px;height: 200px;
  }
  img {
    height: 100%;
    width: 100%;
  }
  .container {
    height: 250px;
    top: 50px;
  }
  h1 span{
    font-size: 25px;
  }
  .new-topic_title{
    font-size: 16px;
  }
  .new-topic_des{
    display: none;
  }
  .new-topic_timeline{
    font-size: 14px;
  }
  a{
    font-size: 13px;
    float: none;
  }
  .new-topic-content{
    margin-top: 20px;
    padding: 5px;
  }
}
</style>
