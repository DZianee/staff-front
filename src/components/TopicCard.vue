<template>
  <div class="table-toolbar d-flex justify-content-end form-search-padding">
    <div class="topic-title">Topic Management</div>
    <div class="table-search-box">
      <input type="text" class="form-control form-input" placeholder="Search anything..." v-model="topicName" />
      <span class="left-pan"> <i class="form-control-feedback bi bi-search"></i></span>
    </div>
    <button class="create-topic" @click="modalAct()">New Topic +</button>
    <div class="create-icon" @click="modalAct()">
      <i class="bi bi-plus-circle"></i>
    </div>
  </div>
  <div class="topic-card">
    <div v-for="topic in Topics" :key="topic.id">
      <div class="card">
        <!-- <div class="topic-card_adjust"> -->
        <button
          v-if="topic.totalIdea <= 0"
          class="icon icon_delete"
          style="padding 8px"
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
          style="padding 8px"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2">
          <i class="bx bx-x bx-sm" />
        </button>
        <!-- </div> -->
        <div class="card-content" @click="manageIdea(topic.id)" :style="{ backgroundColor: topic.colorCode }">
          <br />
          <div class="content">
            <h1 style="height: auto">{{ topic.name }}</h1>
          </div>
        </div>
        <footer class="card-footer" @click="manageIdea(topic.id)">
          <p class="card-footer-item total-ideas">{{ topic.totalIdea }} ideas</p>
        </footer>
      </div>
    </div>

    <div v-if="Topics.length > 0" class="pagination-container">
      <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange"> </component>
    </div>

    <CreateTopicModal @close="modalAct()" :modalActive="modalActive" />
    <RemoveModal :topicInfo="topicInfoActive" />
    <RemoveErrorModal />
  </div>
</template>

<script>
import CreateTopicModal from "@/components/TopicModalForm.vue";
import RemoveModal from "@/components/RemoveModal.vue";
import RemoveErrorModal from "@/components/RemoveErrorModal.vue";
import { ref } from "vue";

var timeOut;

export default {
  name: "TopicCard",
  components: { RemoveModal, RemoveErrorModal, CreateTopicModal },
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
      this.$router.push({ name: "topicideaView", params: { id: value } });
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
          { searchName: this.topicName },
          {
            params: {
              PageSize: 6,
              CurrentPage: this.currentPage,
            },
          }
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
    };
    const modalActive = ref(false);

    const modalAct = () => {
      modalActive.value = !modalActive.value;
    };
    return { topicInfoActive, modalActive, modalAct, topicInfoAct };
  },
  mounted() {
    this.GetTopics();
  },
  watch: {
    topicName() {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        this.GetTopics();
      }, 2000);
    },
  },
};
</script>

<style scoped>
.topic-card {
  display: grid;
  grid-template-columns: repeat(3, 29%);
  column-gap: 40px;
  row-gap: 80px;
  padding: 50px 0 90px 90px;
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
.justify-content-end {
  justify-content: flex-end !important;
  align-items: center;
}
.form-search-padding {
  padding-right: 180px;
  gap: 24px;
}
.bi-plus-circle {
  display: none;
}
.bi-plus-circle::before {
  background-color: lavenderblush;
  border-radius: 50%;
}
.topic-title {
  font-weight: 500;
  font-size: 30px;
  padding-right: 40%;
}
.table-search-box {
  position: relative;
}
.create-topic {
  height: 35px;
  line-height: 10px;
  font-size: 16px;
  width: 13%;
  color: white;
  background: #3d5afe;
  font-weight: 500;
  cursor: pointer;
  padding: 10px;
  border-radius: 0.25rem;
}
.create-topic:hover {
  background: #1976d2;
}
.table-search-box .fa-search {
  position: absolute;
  top: 20px;
  left: 20px;
}

.table-search-box input {
  padding-right: 35px;
  height: 35px;
}

.table-search-box span {
  position: absolute;
  right: 17px;
  top: 6px;
  padding: 2px;
}
.card {
  width: 300px;
  height: 268px;
  border-radius: 24px;
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
  height: 80%;
  cursor: pointer;
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
  right: 8%;
  top: 8%;
}
.icon_delete:hover {
  color: red;
}
.content {
  /* overflow: hidden; */
  height: 115px;
  border-radius: 23px;
  margin-top: 27px;
}
h1 {
  font-size: 22px;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 110px;
  letter-spacing: 0.5px;
}
.card-footer {
  border-top-color: rgb(177, 177, 177);
  background-color: white;
  height: 20%;
  cursor: pointer;
}
.card-footer p {
  font-size: 16px;
  font-weight: 500;
  padding-top: 18px;
}
@media screen and (max-width: 1440px) {
  .topic-card {
    display: grid;
    grid-template-columns: repeat(3, 28%);
    column-gap: 50px;
    row-gap: 100px;
    padding: 50px 0 70px 70px;
  }
  .card {
    height: 268px;
  }
  .topic-title {
    padding-right: 32%;
  }
  .form-search-padding {
    padding-right: 100px;
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
    height: 268px;
  }
  .card_border--effect {
    width: 355px;
  }
  .topic-title {
    padding-right: 24%;
  }
  .form-search-padding {
    padding-right: 100px;
  }
}
@media screen and (max-width: 1025px) {
  .topic-card {
    display: grid;
    grid-template-columns: repeat(3, 28%);
    padding: 50px 0 70px 50px;
  }
  .card {
    height: 248px;
  }
  .card-content {
    height: 200px;
  }
  .card_border--effect {
    width: 355px;
  }
  .topic-title {
    padding-right: 20%;
  }
}
@media screen and (max-width: 780px) {
  .topic-card {
    display: grid;
    grid-template-columns: repeat(2, 47%);
    column-gap: 20px;
    row-gap: 70px;
    padding: 50px 0 70px 60px;
  }
  .card {
    width: 250px;
    height: 230px;
  }
  .card-content {
    height: 180px;
  }
  .topic-title {
    padding-right: 14%;
    font-size: 24px;
  }
  .form-search-padding {
    padding-right: 50px;
    gap: 10px;
  }
  .create-topic {
    width: 17%;
    font-size: 15px;
  }
  .table-search-box input {
    height: 35px;
    width: 180px;
    font-size: 15px;
  }
  .card-content h1 {
    font-size: 18px;
  }
  .card-footer p {
    font-size: 14px;
    padding-top: 18px;
  }
  .card_border--effect {
    width: 295px;
  }
}
@media screen and (max-width: 570px) {
  .topic-card {
    grid-template-columns: 100%;
    padding: 50px 80px 70px 80px;
    row-gap: 40px;
  }
  .bi-plus-circle {
    display: block;
    font-size: 30px;
  }
  .bi-plus-circle::before {
    background-color: #3d5afe;
    color: white;
  }
  .card {
    width: 100%;
  }
  .topic-title {
    padding-right: 8%;
    font-size: 24px;
  }
  .form-search-padding {
    padding-right: 20px;
    gap: 10px;
  }
  .create-topic {
    display: none;
  }
  .table-search-box input {
    height: 35px;
    width: 160px;
    font-size: 15px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .topic-card {
    row-gap: 60px;
  }
  .card {
    width: 100%;
  }
  .topic-title {
    padding-right: 5%;
    font-size: 24px;
  }
  .form-search-padding {
    padding-top: 30px;
  }
}
@media screen and (max-width: 412px) {
 
  .topic-title {
    padding-right: 2%;
    font-size: 22px;
  }
  .table-search-box input {
    width: 120px;
    font-size: 15px;
  }
}
</style>
