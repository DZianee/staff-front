<template>
  <div class="home-open">
    <!-- <img src="../assets/images/banner-2-2.jpg" alt="greenwich-img" /> -->
    <div class="home-title">
      <h1>Together,</h1>
      <p>let's build a better future</p>
      <img src="../assets/images/Wonder-Learners-Online-Student.png" alt="study-img" />
    </div>
    <div class="home-img">
      <!-- <div class="img-item">
        <img src="../assets/images/262289574.jpg.gallery.jpg" alt="university campus" />
      </div> -->
      <div class="img-item">
        <img src="../assets/images/image4-3.jpg" alt="university campus" />
      </div>
      <div class="img-item">
        <img src="../assets/images/myhc_288386.jpg" alt="university campus" />
      </div>
      <div class="img-item">
        <img src="../assets/images/banner-2-2.jpg" alt="university campus" />
      </div>
      <!-- <img src="https://bcie.co.uk//userfiles/universities/greenwich.jpg" alt="university campus" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTitle",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Serif:ital@1&family=Sansita+Swashed:wght@500&display=swap");

.home-open {
  height: 920px;
  /* width: 3000px; */
  /* border-radius: 20px; */
  background-image: url("https://wallpapercave.com/wp/wp4465114.jpg");
  display: grid;
  grid-template-columns: 40% 60%;
  /* position: absolute;
  top: 200px;
  z-index: 1;
  width: 52%;
  height: fit-content; */
}
.home-title h1 {
  display: flex;
  justify-content: flex-start;
}
h1 {
  font-size: 130px;
  position: relative;
  left: 50px;
  top: 50px;
  letter-spacing: 3px;
  font-family: "Roboto Serif";
}
.home-title img {
  width: 300px;
  position: relative;
  top: 80px;
  height: auto;
  border: none;
}
p {
  font-family: "Roboto Serif";
  position: relative;
  top: 100px;
  font-size: 90px;
}
.home-img {
  display: grid;
  grid-template-columns: 60% 48%;
  column-gap: 5px;
  row-gap: 10px;
  grid-template-rows: 48% 60%;
}
.img-item:nth-child(3) {
  grid-column: 1/3;
  position: relative;
  right: -10px;
}
.img-item:nth-child(1) {
  position: relative;
  right: -55px;
}
/* img:nth-child(2) {
  width: 50%;
} */
/* img:nth-child(3) {
  border-top-right-radius: 0px;
}
img:nth-child(2) {
  height: 10%;
} */
img {
  object-fit: cover;
  border-radius: 30px;
  position: relative;
  border: solid white 7px;
  right: -8px;
}
</style>
