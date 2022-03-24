<template>
  <div class="news-topic-bar">
    <div class="create-idea"></div>
    <ul>
      <li @click="getAllIdea()" class="border-gradient">All</li>
      <li @click="getIdeaViaTopic(topic.id, topic.name)" class="border-gradient" v-for="topic in topicList" :key="topic.index">{{ topic.name }}</li>
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
    getIdeaViaTopic(id, name) {
      this.$emit("get-idea-via-topic", id, name, "via");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.border-gradient {
  border: 2px solid;
  /* border-image-source: linear-gradient(50deg, #f44336, #ffff00, #448aff, #651fff); */
  border-image-slice: 1;
  border-image-source: linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9,
    #f6f621
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.news-topic-bar {
  border-top: 1px solid rgb(191, 202, 214);
  /* border-bottom: solid; */
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
  width: fit-content;
  height: 34px;
  padding: 5px;
  margin: 0 20px;
  font-weight: 500;
  color: rgb(126, 126, 126);
}
.news-topic-bar ul li:hover {
  cursor: pointer;
  color: darkblue;
  font-weight: 500;
}
</style>
