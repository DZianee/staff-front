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
                <h3 class="topic-title">{{ ideas.topicName }}</h3>
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
            <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange">
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
              <h3 class="topic-title">{{ idea.topicName }}</h3>
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
    ideaList: Array,
    choice: String,
    ideaListViaTopic: Array,
  },
  data() {
    return {
      ideaDateCreate: "",
      currentPage: 1,
      totalPage: 1,
    };
  },
  methods: {
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
};
</script>

<style scoped>
.news-idea-list .all-ideas {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* column-gap: 10px; */
  border: solid blue;
  height: fit-content;
  padding: 20px;
}
.news-idea-list .all-ideas .card {
  border-radius: 12px;
  left: 7%;
  width: 75%;
  height: auto;
  margin: 40px 22px;
}
.card .card-image:hover,
.card .card-content:hover {
  cursor: pointer;
}
.card-content .content h1 {
  font-size: 18px;
  font-weight: 500;
}
.card-content .content h1:hover {
  text-decoration: underline;
}
.card-content .content h3 {
  padding: 15px 0;
  font-size: 16px;
  font-weight: 500;
  color:rgb(117, 112, 112);
}
.card-content .content time {
  font-size: 14px;
}
.card-image{
  height: 230px;
}
.card-image img {
  border-radius: 0% !important;
  top: -10px;
}
.card-footer{
  height: 45px;
}
.card-footer-item{
  font-size: 15px;
}
.card-footer-item i {
  padding: 0 5px;
}
.pagination-container{
  bottom: 10px;
}
</style>
