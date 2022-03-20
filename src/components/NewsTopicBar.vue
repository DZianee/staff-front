<template>
  <div class="news-topic-bar">
    <ul>
      <li>Naruto</li>
      <li>Sasuke</li>
      <li>Itachi</li>
      <li>Obito</li>
      <li>Shikamaru</li>
      <li>Kakashi</li>
      <li>Obito</li>
      <li>Shikamaru</li>
      <li>Kakashi</li>
      <li>Obito</li>
      <li>Shikamaru</li>
      <li>Kakashi</li>
      <li>Obito</li>
      <li>Shikamaru</li>
      <li>Kakashi</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NewsTopicBar",
};
</script>

<style scoped>
.news-topic-bar {
  border-top: solid rgb(191, 202, 214);
  border-bottom: solid;
  width: 100%;
}
.news-topic-bar ul {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
.news-topic-bar ul {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}
.news-topic-bar ul::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
.news-topic-bar ul li {
  text-align: center;
  /* border: solid pink; */
  padding: 5px;
  margin: 0 20px;
  font-weight: 500;
  color: rgb(126, 126, 126);
}
</style>
