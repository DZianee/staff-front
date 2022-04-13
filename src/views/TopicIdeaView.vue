<template>
  <div class="ideaView">
    <TopicIdea />
  </div>
</template>

<script>
import TopicIdea from "../components/TopicIdea.vue";
export default {
  name: "IdeaView",
  components: { TopicIdea },
  created() {
    document.title = "Topic-Idea Management";
  },
};
</script>

<style scoped>
.ideaView {
  position: relative;
  left: 270px;
  width: calc(100% - 270px);
}
@media (min-width: 481px) and (max-width: 1025px) {
  .ideaView {
    position: relative;
    left: 80px;
    width: calc(100% - 80px);
  }
}
@media screen and (max-width: 480px) {
  .ideaView {
    position: relative;
    left: 0px;
    top: 70px;
    width: 100%;
  }
}
</style>
