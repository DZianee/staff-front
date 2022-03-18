<template>
  <div class="user-ideas">
    <h2>this is user ideas</h2>
    <div v-if="userIdea == null" style="text-align: center; margin-top: 20px">You haven't got any idea yet</div>
    <div v-else>
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
      <div class="card">
        <img
          src="https://cdn.dribbble.com/users/3537662/screenshots/16342773/media/a6e69afafc3af1c62ef1d581c59fa4f1.png?compress=1&resize=1200x900&vertical=top"
          alt="running man" />
        <div class="card-content">fdsadwefeddd</div>
        <div class="card-footer">hgdfeg</div>
      </div>
      <div class="card">
        <img
          src="https://cdn.dribbble.com/users/3537662/screenshots/16342773/media/a6e69afafc3af1c62ef1d581c59fa4f1.png?compress=1&resize=1200x900&vertical=top"
          alt="running man" />
        <div class="card-content">fdsadwefeddd</div>
        <div class="card-footer">hgdfeg</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserIdeas",
  props: {
    userIdea: Array,
  },
};
</script>

<style scoped>
.user-ideas {
  border-top: solid lightgrey;
  margin-top: 55px;
  padding: 0 20px;
  height: 850px;
  overflow-y: auto;
  overflow-x: hidden;
}
.user-ideas {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.user-ideas::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
/* .user-ideas .idea {
  border: solid blue;
} */
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
@media screen and (max-width: 1440px) {
  .react-like,
  .react-dislike,
  .comment {
    padding: 5px 10px;
  }
  .user-ideas .card {
  height: 260px;
}
.card-footer {
  font-size: 18px;

}
}
@media screen and (max-width: 1366px) {
  .user-ideas .card {
    height: 245px;
  }

}
@media screen and (max-width: 1025px) {
  .user-ideas {
    margin-top: 10px;
    padding: 0 40px;
    width: 85%;
    position: relative;
    left: 70px;
  }
  .user-ideas .card {
    height: 300px;
  }
}
@media screen and (max-width: 769px) {
  .user-ideas {
    height: 700px;
    margin-top: 40px;
  }
  .user-ideas .card {
    height: 236px;
  }
  .topic-type-create-time span {
    font-size: 30px;
    font-weight: 600;
  }
  h1 {
    font-size: 20px;
  }
  .react-like,
  .react-dislike,
  .comment {
    padding: 0 10px;
  }
}
@media screen and (min-width: 320px) and (max-width: 483px) {
  .user-ideas {
    height: 800px;
    margin-top: 20px;
    left: 0;
    width: 100%;
    padding: 0 20px;
  }
  .user-ideas .card {
    height: 220px;
  }
  .topic-type-create-time span {
    font-size: 28px;
    font-weight: 600;
  }
  h1 {
    font-size: 18px;
  }
  .card img{
    height: 175px;
  }
  .react-like,
  .react-dislike,
  .comment {
    padding: 0 10px;
  }
  h6 {
    font-size: 15px;
  }
  .idea-create-time {
    font-size: 15px;
  }
  .card-content {
    padding: 20px;
  }
  .comment {
    margin-right: 10px;
  }
}
</style>
