<template>
  <div class="news-topic-bar">
    <div class="create-idea"></div>
    <ul id="DragScroll">
      <li @click="getAllIdea()" class="border-gradient">All</li>
      <li @click="getIdeaViaTopic(topic.id, topic.name)" class="border-gradient" v-for="topic in topicList" :key="topic.index">{{ topic.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NewsTopicBar",
  props: {
    topicList: Array,
  },
  methods: {
    getAllIdea() {
      this.$emit("get-all-idea", "all");
    },
    getIdeaViaTopic(id, name) {
      this.$emit("get-idea-via-topic", id, name, "via");
    },
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
};
</script>

<style scoped>
#DragScroll {
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  /* scroll-snap-type: x mandatory; */
}
.border-gradient {
  border: 2px solid;
  border-image-slice: 1;

  border-image-source: linear-gradient(to right, #f64f59, #c471ed, #12c2e9, #e040fb);
}
.news-topic-bar {
  border-top: 1px solid rgb(220, 230, 241);
  /* border-bottom: solid; */
  /* width: 100%; */
  max-height: 49px;
  padding: 7px;
}
.news-topic-bar ul {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 24%;
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 34px;
  gap: 15px;
  /* overscroll-behavior-inline: contain; */
}
.news-topic-bar ul {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.news-topic-bar ul::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.news-topic-bar ul li {
  text-align: center;
  max-height: 34px;
  padding: 5px;
  font-weight: 500;
  color: rgb(126, 126, 126);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.news-topic-bar ul li:hover {
  cursor: pointer;
  color: darkblue;
  font-weight: 500;
}
</style>
