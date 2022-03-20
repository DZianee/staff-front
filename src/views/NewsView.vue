<template>
  <div class="news container">
    this is new pages
    <NewsTopicBar />
    <div class="news-topic-idea container">Hokage-Dai hoi Lang La</div>
    <NewsIdeaList />
  </div>
</template>

<script>
import NewsTopicBar from "../components/NewsTopicBar.vue";
import NewsIdeaList from "../components/NewsIdeaList.vue";
export default {
  name: "NewsPage",
  components: { NewsTopicBar, NewsIdeaList },
};
</script>

<style scoped>
.news {
  height: fit-content;
  position: relative;
  left: 130px;
  border: solid;
}
.news-topic-idea {
  text-align: center;
  line-height: 300px;
  height: 350px;
  border: #d18ce0 solid;
  border-radius: 20px;
  position: relative;
  width: 97%;
  color: white;
  font-size: 70px;
  background: linear-gradient(to right, #b983ff, #cab8ff, #cab8ff, #f0d9ff);
  /* background: url('https://cdn.dribbble.com/users/1751513/screenshots/17289559/media/32076081c246b426282b21c85cdb934a.png?compress=1&resize=1200x900&vertical=top') 0 -150px; */
  opacity: 0.75;

  /* left: 20px; */
}
/* .news-topic-idea::after{
  content: '';
  width: 1317px;
  font-size: 80px;
  color: white;
  height: 350px;
  border-radius: 12px;
   position: absolute;
  left: 0;
  border: solid red;
  opacity: 1;

} */
</style>
