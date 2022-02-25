<template>
  <div class="topic-card">
    <a href="#">
      <div class="card">
        <div class="card-content">
          <div class="topic-card_adjust">
            <button
              class="icon icon_info"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i class="bx bx-info-circle bx-sm" />
            </button>
            <span class="icon icon_delete" @click="onDelete()">
              <i class="bx bx-x bx-sm" />
            </span>
          </div>
          <br />
          <div class="content">
            <h1>Workplace</h1>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item total-ideas">12 ideas</p>
        </footer>
      </div></a
    >
  </div>
</template>
<script>
export default {
  name: "TopicCard",
  props: {},
  methods: {
    onDelete() {},
  },
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
a {
  text-decoration: none;
}
.card {
  width: 390px;
  height: 268px;
  border-radius: 23px;
}
.card:hover {
  transform: scale(1.1, 1.1);
  transition: ease-in-out 0.6s;
}
.card-content {
  border-bottom-color: black;
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
.content {
  overflow: hidden;
  height: 115px;
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
}
.card-footer p {
  font-size: 18px;
  font-weight: 500;
  padding-top: 18px;
}
.card-content {
  background-color: rgb(231, 245, 231);
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
    border-radius: 23px;
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
    border-radius: 23px;
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
    border-radius: 23px;
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
    width: 310px;
    height: 268px;
    border-radius: 23px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .topic-card {
    display: grid;
    grid-template-columns: 100%;
    row-gap: 60px;
    padding-left: 53px;
  }
  .card {
    width: 300px;
    height: 268px;
    border-radius: 23px;
  }
}
</style>
