<template>
  <div class="news-idea-list container">
    <div v-if="choice === 'via'">
      <div v-if="ideaListViaTopic == ''">
        <p style="color: gray; text-align: center; font-size: 16px; margin-top: 40px; font-style: italic">There is no idea existed yet</p>
      </div>
      <div v-else>
        <div class="all-ideas">
          <div class="card" v-for="ideas in ideaListViaTopic" :key="ideas.index">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src="https://cdn.dribbble.com/users/1338391/screenshots/15412369/media/db9cc51e777dd9f42e89034027d0786b.jpg?compress=1&resize=1200x900&vertical=top"
                  alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h1>{{ ideas.title }}</h1>
                <h3 class="topic-title" @click="topicDetailRoute">{{ ideas.topicName }}</h3>
                <time datetime="2016-1-1">{{ getIdeaDateCreate(ideas.startDate) }}</time>
              </div>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item react-like">
                999
                <i class="bx bx-like bx-fw" />
              </div>
              <div class="card-footer-item react-dislike">
                999
                <i class="bx bx-dislike bx-fw" />
              </div>
              <div class="card-footer-item comment">
                999
                <i class="bx bx-message-square-detail bx-fw" />
              </div>
            </footer>
          </div>
          <div v-if="ideaListViaTopic.length > 0" class="pagination-container">
            <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageViaChange">
            </component>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="ideaList == ''">
        <p style="color: gray; text-align: center; font-size: 16px; margin-top: 40px; font-style: italic">There is no idea existed yet</p>
      </div>
      <div v-else>
        <div class="all-ideas">
          <div class="card" v-for="idea in ideaList" :key="idea.index">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src="https://cdn.dribbble.com/users/1338391/screenshots/15412369/media/db9cc51e777dd9f42e89034027d0786b.jpg?compress=1&resize=1200x900&vertical=top"
                  alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h1>{{ idea.title }}</h1>
                <h3 class="topic-title" @click="topicDetailRoute">{{ idea.topicName }}</h3>
                <time datetime="2016-1-1">{{ getIdeaDateCreate(idea.startDate) }}</time>
              </div>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item react-like">
                999
                <i class="bx bx-like bx-fw" />
              </div>
              <div class="card-footer-item react-dislike">
                999
                <i class="bx bx-dislike bx-fw" />
              </div>
              <div class="card-footer-item comment">
                999
                <i class="bx bx-message-square-detail bx-fw" />
              </div>
            </footer>
          </div>
          <div v-if="ideaList.length > 0" class="pagination-container">
            <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange">
            </component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsIdeaList",
  props: {
    choice: String,
    id: String,
  },
  data() {
    return {
      ideaDateCreate: "",
      currentPage: 1,
      totalPage: 1,
      ideaListViaTopic: [],
      ideaList: [],
    };
  },
  created() {},
  methods: {
    // ideaDetailRoute(){
    //   this.$router.push({path})
    // }
    topicDetailRoute() {
      this.$router.push({ name: "topicListView", params: { id: this.id } });
    },
    async getIdeaList() {
      try {
        this.$store.dispatch("fetchAccessToken");

        const getIdeaList = await this.$axios.post(
          `api/v1/Idea/getList`,
          { searchTitle: "", sortTitle: "", sortCreatedDate: "", sortUserName: "" },
          {
            params: {
              PageSize: 6,
              CurrentPage: this.currentPage,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.ideaList = getIdeaList.data.content;
        this.totalPage = getIdeaList.data.totalPage;
        console.log(this.ideaList);
      } catch (e) {
        console.log(e);
      }
    },
    async getIdeaViaTopic() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const getIdeaListviaTopic = await this.$axios.post(
          `api/v1/Idea/topic/${this.id}`,
          { searchTitle: "", sortTitle: "", sortCreatedDate: "", sortUserName: "" },
          {
            params: {
              PageSize: 6,
              CurrentPage: this.currentPage,
            },
          }
        );
        this.ideaListViaTopic = getIdeaListviaTopic.data.content;
        this.totalPage = getIdeaListviaTopic.data.totalPage;
      } catch (e) {
        console.log(e);
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
    getIdeaDateCreate(date) {
      const dateCreate = new Date(date);
      // var year = dateCreate.getFullYear();
      // var month = ("0" + (dateCreate.getMonth() + 1)).slice(-2);
      // var day = ("0" + dateCreate.getDate()).slice(-2);
      // var hour =
      // const dmy = day + "/" + month + "/" + year;
      const dmy = dateCreate.toLocaleString();
      return dmy;
    },
  },
  watch: {
    id() {
      this.getIdeaViaTopic();
    },
  },
  mounted() {
    this.getIdeaList();
  },
};
</script>

<style scoped>
.news-idea-list .all-ideas {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* column-gap: 10px; */
  /* border: solid blue; */
  height: fit-content;
  padding: 20px;
}
.news-idea-list .all-ideas .card {
  border-radius: 12px;
  left: 7%;
  width: 75%;
  height: auto;
  margin: 40px 22px;
  bottom: 5%;
  text-align: unset;
}
.card .card-image:hover {
  cursor: pointer;
}
.card-content .content h1 {
  font-size: 18px;
  font-weight: 500;
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
}
.card-content .content time {
  font-size: 14px;
}
.card-image {
  height: 230px;
}
.card-image img {
  border-radius: 0% !important;
  top: -10px;
}
.card-footer {
  height: 45px;
}
.card-footer-item {
  font-size: 15px;
}
.card-footer-item i {
  padding: 0 5px;
}
.pagination-container {
  bottom: 10px;
}
@media screen and (max-width: 1440px) {
  .news-idea-list .all-ideas .card {
    left: 5%;
    width: 80%;
  }
  .card-image {
    height: 200px;
  }
  .card-content .content h3 {
    padding: 10px 0;
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
  .news-idea-list .all-ideas .card {
    left: -2%;
    width: 88%;
  }
  .card-image {
    height: 180px;
  }
}
@media screen and (max-width: 820px) {
  .news-idea-list .all-ideas {
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }
  .news-idea-list .all-ideas .card {
    left: -2%;
    width: 88%;
  }
  .card-image {
    height: 200px;
  }
}
@media screen and (max-width: 769px) {
  .news-idea-list .all-ideas {
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
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
}
@media screen and (max-width: 480px) {
  .news-idea-list .all-ideas {
    grid-template-columns: 100%;
    column-gap: 0;
    height: fit-content;
    padding: 20px;
  }
  .news-idea-list .all-ideas .card {
    left: -7%;
    width: 100%;
  }
  .card-image {
    height: fit-content;
  }
  .card-content .content h3 {
  font-size: 15px;
}
  .card-content{
    margin-top: -7%;
  }
}
</style>
