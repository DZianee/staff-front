<template>
  <div class="news-idea-list container">
    <div class="card">
      <img
        src="https://cdn.dribbble.com/users/3537662/screenshots/16342773/media/a6e69afafc3af1c62ef1d581c59fa4f1.png?compress=1&resize=1200x900&vertical=top"
        alt="running man" />
      <div class="card-content">
        <h1 class="content-title">Chao mung cac ban den voi vuong quoc dieu ki cua soc nhi</h1>
        <div class="topic-type-create-time">
          <h6 class="topic-type">Vui la chinh</h6>
          <span> . </span>
          <div class="idea-create-time">12:12:12</div>
        </div>
      </div>
      <div class="card-footer">
        <div class="reaction">
          <div class="react-like">
            300
            <i class="bx bx-like bx-fw" />
          </div>
          <div class="react-dislike">
            30
            <i class="bx bx-dislike bx-fw" />
          </div>
        </div>
        <div class="comment">500 comments</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsIdeaList",
};
</script>

<style scoped>
.user-ideas .card {
  border-radius: 12px;
  width: 100%;
  height: 270px;
  margin: 60px 0;
  display: block;
}
.card img {
  width: 50%;
  height: auto;
  position: relative;
  top: 0px;
  border-top-left-radius: 12px;
  float: left;
}
.card-content {
  width: 50%;
  float: right;
}
.topic-type-create-time .topic-type,
.topic-type-create-time span,
.topic-type-create-time .idea-create-time {
  display: inline-block;
  padding: 0 5px;
}
.topic-type-create-time span {
  font-size: 30px;
  font-weight: 600;
}
h1 {
  font-size: 27px;
  height: fit-content;
}
.card-footer {
  display: grid;
  grid-template-columns: 50% 50%;
  clear: both;
}
.react-like,
.react-dislike {
  display: inline-block;
  padding: 0 10px;
  font-size: 15px;
}
.comment {
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
}
</style>
