<template>
  <div class="topic-card">
    <div v-for="topic in Topics" :key="topic.id">
      <div class="card">
        <div class="card-content" :style="{ backgroundColor: topic.colorCode }">
          <div class="topic-card_adjust">
            <button
              class="icon icon_info"
              :style="{ backgroundColor: topic.colorCode }"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="topicInfoAct(topic)">
              <i class="bx bx-info-circle bx-sm" />
            </button>
            <button
              v-if="topic.totalIdea <= 0"
              class="icon icon_delete"
              :style="{ backgroundColor: topic.colorCode }"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
              @click="topicInfoAct(topic)">
              <i class="bx bx-x bx-sm" />
            </button>
            <button
              v-if="topic.totalIdea > 0"
              :style="{ backgroundColor: topic.colorCode }"
              class="icon icon_delete"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2">
              <i class="bx bx-x bx-sm" />
            </button>
          </div>
          <br />
          <div class="content">
            <h1>{{ topic.name }}</h1>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item total-ideas" @click="manageIdea(topic.id)">{{ topic.totalIdea }} ideas</p>
        </footer>
      </div>
    </div>

    <div class="pagination-container">
      <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange"> </component>
    </div>

    <TopicInfoModal :topicInfo="topicInfoActive" />
    <RemoveModal :topicInfo="topicInfoActive" />
    <RemoveErrorModal />
  </div>
</template>

<script>
import TopicInfoModal from "@/components/TopicInfoModal.vue";
import RemoveModal from "@/components/RemoveModal.vue";
import RemoveErrorModal from "@/components/RemoveErrorModal.vue";
import { ref } from "vue";

// var a;

export default {
  name: "TopicCard",
  components: { TopicInfoModal, RemoveModal, RemoveErrorModal },
  data() {
    return {
      topicName: "",
      Topics: [],
      currentPage: 1,
      totalPage: 1,
    };
  },
  methods: {
    manageIdea(value) {
      console.log(value);
      this.$router.push({ name: "ideaView", params: { id: value } });
    },
    onPageChange(page) {
      this.currentPage = page;
      this.GetTopics();
    },
    async GetTopics() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const res = await this.$axios.post(
          `api/v1/Topic/GetList`,
          { name: this.topicName }
          // {
          //   params: {
          //     PageSize: 6,
          //     CurrentPage: this.currentPage,
          //   },
          // }
        );
        this.Topics = res.data.content;
        this.totalPage = res.data.totalPage;
      } catch (e) {
        //
      }
    },
  },
  setup() {
    const topicInfoActive = ref({});
    const topicInfoAct = (value) => {
      topicInfoActive.value = value;
      console.log(topicInfoActive);
    };
    return { topicInfoActive, topicInfoAct };
  },
  mounted() {
    this.GetTopics();
    // a = setInterval(() => this.GetTopics(), 60 * 1000);
  },
  // beforeUnmount() {
  //   clearInterval(a);
  // },
};
</script>

<style scoped>
.topic-card {
  display: grid;
  grid-template-columns: repeat(4, 21%);
  column-gap: 40px;
  row-gap: 80px;
  padding: 50px 0 0 90px;
}
.card_border--effect {
  width: 370px;
  padding: 8px;
  border-radius: 23px;
  position: relative;
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
a {
  text-decoration: none;
}
.card {
  width: 370px;
  height: 268px;
  border-radius: 23px;
}
.card:hover {
  transform: scale(1.1, 1.1);
  transition: ease-in-out 0.6s;
}
.card-content {
  border-bottom-color: black;
  border-top-right-radius: 23px;
  border-top-left-radius: 23px;
  background-color: rgb(231, 245, 231);
}
.topic-card_adjust {
  line-height: 10px;
  position: relative;
  height: 27px;
}
button {
  border: none;
  background-color: rgb(231, 245, 231);
}
button:hover {
  background-color: rgb(236, 229, 229);
}
span:hover {
  background-color: rgb(236, 229, 229);
}
.icon_info {
  position: absolute;
  left: 0;
}
.icon_delete {
  position: absolute;
  right: 0;
}
.icon_delete:hover {
  color: red;
}
.content {
  overflow: hidden;
  height: 115px;
  border-radius: 23px;
}
h1 {
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 110px;
}
.card-footer {
  border-top-color: rgb(177, 177, 177);
  background-color: white;
  height: 40px;
  cursor: pointer;
}
.card-footer p {
  font-size: 18px;
  font-weight: 750;
  padding-top: 18px;
}
@media screen and (max-width: 1440px) {
  .topic-card {
    display: grid;
    grid-template-columns: repeat(3, 28%);
    column-gap: 50px;
    row-gap: 100px;
  }
  .card {
    width: 340px;
    height: 268px;
  }
}
@media screen and (max-width: 1280px) {
  .topic-card {
    display: grid;
    grid-template-columns: repeat(3, 27%);
    column-gap: 50px;
    row-gap: 100px;
  }
  .card {
    width: 355px;
    height: 268px;
  }
  .card_border--effect {
    width: 355px;
  }
}
@media screen and (max-width: 1025px) {
  .topic-card {
    display: grid;
    grid-template-columns: repeat(3, 28%);
    column-gap: 30px;
    row-gap: 100px;
    padding-left: 24px;
  }
  .card {
    width: 355px;
    height: 268px;
  }
  .card_border--effect {
    width: 355px;
  }
}
@media screen and (max-width: 780px) {
  .topic-card {
    display: grid;
    grid-template-columns: repeat(2, 47%);
    column-gap: 34px;
    row-gap: 70px;
    padding: 50px;
  }
  .card {
    width: 295px;
    height: 268px;
  }
  h1 {
    font-size: 16px;
  }
  .card-footer p {
    font-size: 14px;
    padding-top: 18px;
  }
  .card_border--effect {
    width: 295px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .topic-card {
    display: grid;
    grid-template-columns: 100%;
    width: 400px;
    row-gap: 60px;
    margin-left: 38px;
  }
  .card {
    width: 300px;
    height: 268px;
  }
  .card_border--effect {
    width: 300px;
  }
}
</style>
