<template>
  <div class="topic">
    <TopicCard />
  </div>
</template>

<script>
// @ is an alias to /src
import TopicCard from "@/components/TopicCard.vue";

export default {
  name: "TopicView",
  components: { TopicCard },
};
//
</script>

<style scoped>
.topic {
  position: relative;
  left: 270px;
  top: 40px;
  width: calc(100% - 270px);
}
@media (min-width: 481px) and (max-width: 1025px) {
  .topic {
    position: relative;
    left: 80px;
    width: calc(100% - 80px);
  }
}
@media screen and (max-width: 480px) {
  .topic {
    position: relative;
    left: 0px;
    top: 100px;
    width: 100%;
  }
}
</style>
