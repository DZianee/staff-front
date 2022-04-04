<template>
  <div id="DragScroll" class="user-ideas">
    <div v-if="userIdea == ''" style="text-align: center; margin-top: 20px; color: gray">You haven't got any idea yet</div>
    <div v-else>
      <div class="card" v-for="idea in userIdea" :key="idea.id">
        <div style="height: 80%">
          <img v-if="idea.image" :src="`https://${idea.image}`" alt="running man" />
          <img
            v-else
            src="https://cdn.dribbble.com/users/3537662/screenshots/16342773/media/a6e69afafc3af1c62ef1d581c59fa4f1.png?compress=1&resize=1200x900&vertical=top"
            alt="running man" />
          <div class="card-content">
            <h1 class="content-title">{{ idea.title }}</h1>
            <div class="topic-type-create-time">
              <h6 class="topic-type">{{ idea.topicName }}</h6>
              <br />
              <span> . </span>
              <div class="idea-create-time">{{ getIdeaDateCreate(idea.startDate) }}</div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="reaction">
            <div class="react-like">
              {{ idea.totalLikes }}
              <i class="bx bx-like bx-fw" />
            </div>
            <div class="react-dislike">
              {{ idea.totalDislikes }}
              <i class="bx bx-dislike bx-fw" />
            </div>
          </div>
          <div class="comment">{{ idea.totalComments }} comments</div>
        </div>
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
  mounted() {
    const ele = document.getElementById("DragScroll");
    // ele.scrollTop = 100;
    // ele.scrollLeft = 150;
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";
      pos = {
        // The current scroll
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);

      ele.style.cursor = "grab";
      ele.style.removeProperty("user-select");
    };
    ele.addEventListener("mousedown", mouseDownHandler);
  },
  methods: {
    getIdeaDateCreate(date) {
      const dateCreate = new Date(date);
      // var year = dateCreate.getFullYear();
      // var month = ("0" + (dateCreate.getMonth() + 1)).slice(-2);
      // var day = ("0" + dateCreate.getDate()).slice(-2);
      // var hour =
      // const dmy = day + "/" + month + "/" + year;
      const dmy = dateCreate.toLocaleDateString();
      return dmy;
    },
  },
};
</script>

<style scoped>
#DragScroll {
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  /* scroll-snap-type: x mandatory; */
}
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
  height: 100%;
  position: relative;
  top: 0px;
  border-top-left-radius: 12px;
  float: left;
  object-fit: cover;
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
  height: 20%;
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
  /* margin-right: 40px; */
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
    /* position: relative;
    top: -18px; */
  }
  .content-title {
    font-size: 22px;
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
@media screen and (min-width: 320px) and (max-width: 480px) {
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
  .topic-type-create-time .topic-type {
    padding: 0 0;
  }
  .content-title {
    font-size: 18px;
  }
  .card img {
    height: 175px;
  }
  .react-like,
  .react-dislike,
  .comment {
    padding: 0 10px;
  }
  h6 {
    font-size: 14px;
    width: 100%;
  }
  .idea-create-time {
    font-size: 15px;
  }
  .card-content {
    padding: 20px;
  }
  .comment {
    margin-right: 5px;
    font-size: 15px;
  }
}
</style>
