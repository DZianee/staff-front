<template>
  <div class="ideaView">
    <TopicIdeaView />
  </div>
</template>

<script>
import TopicIdeaView from "../components/TopicIdeaView.vue";
export default {
  name: "IdeaView",
  components: { TopicIdeaView },
};
</script>

<style>
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
    width: 100%;
  }
}
</style>
