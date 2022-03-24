<template>
  <div class="news-topic-bar">
    <div class="create-idea"></div>
    <ul>
      <li @click="getAllIdea()">All</li>
      <li @click="getIdeaViaTopic(topic.id,topic.name)" v-for="topic in topicList" :key="topic.index">{{ topic.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NewsTopicBar",
  props: {
    topicList: Array,
  },
  methods: {
    getAllIdea() {
      this.$emit("get-all-idea", "all");
    },
    getIdeaViaTopic(id,name) {
      this.$emit("get-idea-via-topic", id, name,"via");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.news-topic-bar {
  border-top: solid rgb(191, 202, 214);
  border-bottom: solid;
  width: 100%;
  padding: 7px;
}
.news-topic-bar ul {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
.news-topic-bar ul {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.news-topic-bar ul::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.news-topic-bar ul li {
  text-align: center;
  padding: 5px;
  margin: 0 20px;
  font-weight: 500;
  color: rgb(126, 126, 126);
  border: solid rgb(185, 184, 184);
  border-radius: 10px;
}
.news-topic-bar ul li:hover {
  cursor: pointer;
  color: darkblue;
  font-weight: 500;
}
</style>
