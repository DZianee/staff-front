<template>
  <div class="news-idea-list container">
    <div class="search-create" v-if="paramId == 'all' && ideaList && ideaList.length > 0">
      <div class="table-search-box">
        <input type="text" class="form-control form-input" placeholder="Search anything..." @input="InputsearchTitle" v-model="searchTitle" />
        <span class="left-pan"> <i class="form-control-feedback bi bi-search"></i></span>
      </div>
      <select class="form-control width-form" v-model="sortType" @change="getIdeaList">
        <option value="0">Newest Ideas</option>
        <option value="1">Most reacted Ideas</option>
        <option value="2">Most viewed ideas</option>
        <option value="3">Lastest commented ideas</option>
      </select>
    </div>
    <div class="search-create" v-else-if="paramId != 'all'">
      <div class="table-search-box">
        <input type="text" class="form-control form-input" placeholder="Search anything..." @input="InputsearchTitle" v-model="searchTitle" />
        <span class="left-pan"> <i class="form-control-feedback bi bi-search"></i></span>
      </div>
      <button class="create-topic" v-if="status < 1" @click="IdeaModalOpen()">New Idea +</button>
      <div class="create-icon" @click="IdeaModalOpen()">
        <i class="bi bi-plus-circle"></i>
      </div>
    </div>
    <div v-if="paramId !== 'all'">
      <div v-if="ideaList == '' && ideaList.length <= 0">
        <p style="color: gray; text-align: center; font-size: 16px; position: relative; top: 60px; font-style: italic">
          There is no idea existed yet
        </p>
      </div>
      <div v-else>
        <div class="all-ideas">
          <div class="card" v-for="ideas in ideaList" :key="ideas.index" @click="routeIdea(ideas.id)" style="cursor: pointer">
            <div class="card-image">
              <!-- <figure class="image is-4by3"> -->
              <img v-if="ideas.image != null && ideas.image" :src="`https://${ideas.image}`" alt="Placeholder image" />
              <img
                v-else
                src="https://cdn.dribbble.com/users/1338391/screenshots/15412369/media/db9cc51e777dd9f42e89034027d0786b.jpg?compress=1&resize=1200x900&vertical=top"
                alt="Placeholder image" />
              <!-- </figure> -->
            </div>
            <div class="card-content">
              <div class="content">
                <h1>{{ ideas.title }}</h1>
                <h3 class="topic-title" @click.stop="topicDetailRoute(ideas.topicId)">{{ ideas.topicName }}</h3>
                <!-- <time datetime="2016-1-1">{{ getIdeaDate(ideas.startDate) }}</time> -->
                <p v-text="ideas.startDate"></p>
              </div>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item react-like">
                {{ ideas.totalLikes }}
                <i class="bx bx-like bx-fw" />
              </div>
              <div class="card-footer-item react-dislike">
                {{ ideas.totalDislikes }}
                <i class="bx bx-dislike bx-fw" />
              </div>
              <div class="card-footer-item comment">
                {{ ideas.totalComments }}
                <i class="bx bx-message-square-detail bx-fw" />
              </div>
            </footer>
          </div>
          <div v-if="ideaList.length > 0" class="pagination-container">
            <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageViaChange">
            </component>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="ideaList == '' && ideaList.length <= 0">
        <p style="color: gray; text-align: center; font-size: 16px; margin-top: 40px; font-style: italic">There is no idea existed yet</p>
      </div>
      <div v-else>
        <div class="all-ideas" style="margin-top: 24px">
          <div class="card" v-for="idea in ideaList" :key="idea.index" @click="routeIdea(idea.id)" style="cursor: pointer">
            <div class="card-image">
              <!-- <figure class="image is-4by3"> -->
              <img v-if="idea.image != null && idea.image" :src="`https://${idea.image}`" alt="Placeholder image" />
              <img
                v-else
                src="https://cdn.dribbble.com/users/1338391/screenshots/15412369/media/db9cc51e777dd9f42e89034027d0786b.jpg?compress=1&resize=1200x900&vertical=top"
                alt="Placeholder image" />
              <!-- </figure> -->
            </div>
            <div class="card-content">
              <div class="content">
                <h1>{{ idea.title }}</h1>
                <h3 class="topic-title" @click.stop="topicDetailRoute(idea.topicId)">{{ idea.topicName }}</h3>
                <!-- <time datetime="2016-1-1">{{ getIdeaDate(idea.createdDate) }}</time> -->
                <time>{{ idea.createdDate }}</time>
              </div>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item react-like">
                {{ idea.totalLikes }}
                <i class="bx bx-like bx-fw" />
              </div>
              <div class="card-footer-item react-dislike">
                {{ idea.totalDislikes }}
                <i class="bx bx-dislike bx-fw" />
              </div>
              <div class="card-footer-item comment">
                {{ idea.totalComments }}
                <i class="bx bx-message-square-detail bx-fw" />
              </div>
            </footer>
          </div>
        </div>
        <div v-if="ideaList.length > 0" class="pagination-container">
          <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange"> </component>
        </div>
      </div>
    </div>
  </div>
  <IdeaCreate @closeIdea="IdeaModalClose()" :IdeaModalActive="IdeaModalActive" :TopicID="paramId" :TopicName="name" />
</template>

<script>
import IdeaCreate from "../components/IdeaModalForm.vue";
import { ref } from "vue";
var timeOut;

export default {
  name: "NewsIdeaList",
  components: {
    IdeaCreate,
  },
  props: {
    choice: String,
    id: String,
    name: String,
    status: Number,
  },
  data() {
    return {
      ideaDateCreate: "",
      currentPage: 1,
      totalPage: 1,
      ideaListViaTopic: [],
      ideaList: [],
      sortType: 0,

      searchTitle: "",
    };
  },
  computed: {
    paramId() {
      return this.$route.params.id;
    },
  },
  setup() {
    const IdeaModalActive = ref(false);

    const IdeaModalOpen = () => {
      IdeaModalActive.value = true;
    };
    const IdeaModalClose = () => {
      IdeaModalActive.value = false;
    };

    return { IdeaModalActive, IdeaModalOpen, IdeaModalClose };
  },
  methods: {
    // ideaDetailRoute(){
    //   this.$router.push({path})
    // }
    routeIdea(value) {
      this.$router.push({ name: "ideaDetailView", params: { id: value } });
    },
    topicDetailRoute(value) {
      this.$router.push({ name: "topicListView", params: { id: value } });
    },
    async getIdeaList(event) {
      if (event && event.target.value == this.sortType) {
        this.currentPage = 1;
      }
      try {
        this.$store.dispatch("fetchAccessToken");
        const getIdeaList = await this.$axios.get(`api/v1/Idea/getIdeasByType/?type=${this.sortType}&searchTitle=${this.searchTitle}`, {
          params: {
            PageSize: 6,
            CurrentPage: this.currentPage,
          },
        });
        this.ideaList = getIdeaList.data.content;
        this.totalPage = getIdeaList.data.totalPage;
        for (var idea of this.ideaList) {
          const date = new Date(idea.createdDate);
          idea.createdDate = date.toLocaleString();
        }
      } catch (e) {
        //
      }
    },
    async getIdeaViaTopic() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const getIdeaListviaTopic = await this.$axios.post(
          `api/v1/Idea/topic/${this.paramId}`,
          { searchTitle: this.searchTitle, sortTitle: "", sortCreatedDate: "", sortUserName: "" },
          {
            params: {
              PageSize: 6,
              CurrentPage: this.currentPage,
            },
          }
        );
        this.ideaList = getIdeaListviaTopic.data.content;
        this.totalPage = getIdeaListviaTopic.data.totalPage;
        for (var idea of this.ideaList) {
          const date = new Date(idea.startDate);
          idea.startDate = date.toLocaleString();
        }
      } catch (e) {
        //
      }
    },
    onPageChange(page) {
      this.currentPage = page;
      this.getIdeaList();
    },
    onPageViaChange(page) {
      this.currentPage = page;
      this.getIdeaViaTopic();
    },
    getIdeaDate(date) {
      const dateCreate = new Date(date);
      // var year = dateCreate.getFullYear();
      // var month = ("0" + (dateCreate.getMonth() + 1)).slice(-2);
      // var day = ("0" + dateCreate.getDate()).slice(-2);
      // var hour =
      // const dmy = day + "/" + month + "/" + year;
      const dmy = dateCreate.toLocaleString();
      return dmy;
    },
    InputsearchTitle() {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        if (this.paramId == "all") {
          this.getIdeaList();
        } else {
          this.getIdeaViaTopic();
        }
      }, 500);
    },
  },
  watch: {
    // choice(newValue) {
    //   this.currentPage = 1;
    //   if (newValue == "all") {
    //     this.getIdeaList();
    //   } else {
    //     this.getIdeaViaTopic(this.id);
    //   }
    // },
    paramId(newValue) {
      this.currentPage = 1;
      this.searchTitle = "";
      if (newValue) {
        if (newValue == "all") {
          this.getIdeaList();
        } else {
          this.getIdeaViaTopic();
        }
      }
    },
    // id() {
    //   this.currentPage = 1;
    //   this.getIdeaViaTopic();
    // },
  },
  mounted() {
    if (this.$route.params.id === "all") {
      this.getIdeaList();
    } else {
      this.getIdeaViaTopic();
    }
  },
};
</script>

<style scoped>
.search-create {
  justify-content: flex-end;
  align-items: center;
  display: flex;
  gap: 10px;
  padding-right: 9%;
  margin-top: 20px;
}
.width-form {
  width: 15%;
}
.create-topic {
  height: 35px;
  line-height: 10px;
  font-size: 16px;
  width: 15%;
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
.table-search-box {
  position: relative;
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
  right: 30px;
  top: 6px;
  padding: 2px;
}
.bi-plus-circle {
  display: none;
}
.bi-plus-circle::before {
  background-color: lavenderblush;
  border-radius: 50%;
}
.news-idea-list .all-ideas {
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr; */
  /* column-gap: 10px; */
  /* border: solid blue; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 16px;
  height: fit-content;
  padding: 50px;
  padding-bottom: 90px;
}
.news-idea-list .all-ideas .card {
  border-radius: 12px;
  /* left: 7%; */
  width: 30%;
  height: auto;
  margin: 40px 0;
  bottom: 5%;
  text-align: unset;
}
.card .card-image:hover {
  cursor: pointer;
}
.card-content .content h1 {
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-content .content h1:hover,
.card-content .content h3:hover {
  text-decoration: underline;
  cursor: pointer;
}
.card-content .content h3 {
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  color: rgb(102, 97, 97);
  letter-spacing: 0.6px;
  height: 54px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-content .content time {
  font-size: 14px;
}
.card-image {
  height: 230px;
  margin: 0;
}
.card-image img {
  border-radius: 0% !important;
  /* top: -10px; */
  width: 100%;
  height: 100%;
}
.card-footer {
  height: 45px;
  padding: 0;
  width: 100%;
}
.card-footer-item {
  font-size: 15px;
  padding: 0;
  width: calc(100% / 3);
}
.card-footer-item i {
  padding: 0 5px;
}
/* .pagination-container {
  bottom: 10px;
} */
.sortType {
  position: absolute;
  right: 0;
  width: 26% !important;
}
/* .form-control {
  width: 90%;
} */
@media screen and (max-width: 1440px) {
  /* .news-idea-list .all-ideas .card { */
  /* left: 5%; */
  /* width: 80%; */
  /* } */
  .card-image {
    height: 200px;
  }
  .card-content .content h3 {
    padding: 10px 0;
  }
  .search-create {
    gap: 10px;
    padding-right: 4%;
  }
}
@media screen and (max-width: 1366px) {
  .card-image {
    height: 180px;
  }
  .card-content .content h3 {
    padding: 0 0;
  }
}
@media screen and (max-width: 1025px) {
  /* .news-idea-list .all-ideas .card { */
  /* left: -2%; */
  /* width: 88%; */
  /* } */
  .card-image {
    height: 180px;
  }
}
@media screen and (max-width: 820px) {
  .news-idea-list .all-ideas {
    /* grid-template-columns: 1fr 1fr; */
    column-gap: 10px;
    padding-top: 70px;
  }
  .news-idea-list .all-ideas .card {
    left: 0;
    width: 48%;
    margin: 0 0 20px 0;
  }
  .card-image {
    height: 200px;
  }
  .sortType {
    width: 30% !important;
  }
}
@media screen and (max-width: 769px) {
  .news-idea-list .all-ideas {
    /* grid-template-columns: 1fr 1fr; */
    column-gap: 20px;
    padding-left: 0;
    padding-right: 0;
  }
  .news-idea-list .all-ideas .card {
    left: 0;
    bottom: 0;
  }
  .card-image {
    height: 170px;
  }
  .card-content .content h3 {
    font-size: 15px;
  }
  .sortType {
    width: 50% !important;
  }
  .table-search-box input {
    height: 35px;
    width: 180px;
    font-size: 15px;
  }
  .create-topic {
    width: 22%;
    font-size: 15px;
  }
  .width-form {
    width: 22%;
  }
}
@media screen and (max-width: 680px) {
  .news-idea-list .all-ideas .card {
    /* left: -7%; */
    width: 100%;
  }
  /* .create-topic {
    display: none;
  } */
  /* .bi-plus-circle {
    display: block;
    font-size: 30px;
  } */
  .bi-plus-circle::before {
    background-color: #3d5afe;
    color: white;
  }
}
@media screen and (max-width: 480px) {
  .news-idea-list .all-ideas {
    /* grid-template-columns: 100%; */
    column-gap: 0;
    height: fit-content;
    padding: 20px;
    padding-top: 60px;
    padding-bottom: 160px;
  }
  .news-idea-list .all-ideas .card {
    /* left: -7%; */
    width: 100%;
  }
  .card-image {
    height: fit-content;
  }
  .card-content .content h3 {
    font-size: 15px;
  }
  .search-create {
    padding: 15px 0;
    justify-content: center;
  }
  .table-search-box input {
    width: 100%;
    font-size: 15px;
  }
  .create-topic {
    width: 30%;
  }
  .width-form {
    width: 30%;
  }
  /* .card-content {
    margin-top: 20%;
  } */
  /* .card-content{
    margin-top: -2%;
  } */
}
</style>
