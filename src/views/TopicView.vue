<template>
  <div class="topic container">
    <TopicCard />
  </div>
</template>

<script>
// @ is an alias to /src
import TopicCard from "@/components/TopicCard.vue";

export default {
  name: "TopicView",
  components: { TopicCard },
  created() {
    document.title = "Topic Management";
  },
};
//
</script>

<style scoped>
.topic {
  position: relative;
  top: 20px;
  right: -8.1%;
  width: calc(100% - 336px);
}
@media screen and (max-width: 1440px) {
  .topic {
    width: calc(100% - 272px);
  }
}
@media screen and (max-width: 1025px) {
  .topic {
    width: calc(100% - 101px);
    right: -4%;
  }
}
@media screen and (max-width: 780px) {
  .topic {
    width: calc(100% - 92px);
    right: -5%;
  }
}
@media screen and (max-width: 765px) {
  .topic {
    width: calc(100% - 224px);
    right: -5%;
  }
}
@media screen and (max-width: 480px) {
  .topic {
    width: 100%;
    right: 0;
    top: 80px;
    /* height: 360px; */
  }
}
/* @media (min-width: 481px) and (max-width: 1025px) {
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
    top: 78px;
    width: 100%;
  }
} */
</style>
