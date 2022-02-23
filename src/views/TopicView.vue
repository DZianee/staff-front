<template>
  <div class="topic">
    <h1>testing</h1>
    <TopicCard />
  </div>
</template>

//
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import TopicCard from "@/components/TopicCard.vue";
// import Button from "@/components/Button.vue";

export default {
  name: "TopicView",
  components: { TopicCard },
  //   components: {
  //     HelloWorld,
  //   },
};
//
</script>
