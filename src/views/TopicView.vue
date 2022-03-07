<template>
  <div class="topic">
    <h1>testing</h1>
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
