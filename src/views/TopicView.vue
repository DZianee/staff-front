<template>
  <div class="topic">
    <h1>testing</h1>
    <TopicCard />
    <TopicInfoModal />
  </div>
</template>

//
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import TopicCard from "@/components/TopicCard.vue";
import TopicInfoModal from "@/components/TopicInfoModal.vue";
// import Button from "@/components/Button.vue";

export default {
  name: "TopicView",
  components: { TopicCard, TopicInfoModal },
  //   components: {
  //     HelloWorld,
  //   },
};
//
</script>
