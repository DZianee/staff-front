<template>
  <div class="topic">
    <h1>testing</h1>
    <TopicCard />
    <TopicInfoModal />
    <RemoveModal />
    <RemoveErrorModal />
  </div>
</template>

//
<script>
// @ is an alias to /src
import TopicCard from "@/components/TopicCard.vue";
import TopicInfoModal from "@/components/TopicInfoModal.vue";
import RemoveModal from "@/components/RemoveModal.vue";
import RemoveErrorModal from "@/components/RemoveErrorModal.vue";

export default {
  name: "TopicView",
  components: { TopicCard, TopicInfoModal, RemoveModal, RemoveErrorModal },
};
//
</script>
