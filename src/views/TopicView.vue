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
import TopicCard from "@/components/TopicCard.vue";
import TopicInfoModal from "@/components/TopicInfoModal.vue";

export default {
  name: "TopicView",
  components: { TopicCard, TopicInfoModal },
};
//
</script>
