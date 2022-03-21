<template>
  <div class="home-open">
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <!-- <h1><span>Together,</span> let's build a better future</h1> -->
        <div class="carousel-item">
          <img src="https://vistapointe.net/images/university-of-greenwich-6.jpg" class="d-block w-100" alt="img 03" />
        </div>
        <div class="carousel-item active">
          <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" class="d-block w-100" alt="img 02." />
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" class="d-block w-100" alt="img 01" />
        </div>
        
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
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
  /* border: solid yellow; */
  margin-top: 80px;
}
.carousel {
  width: 100%;
  height: 913px;
  /* border: solid red; */
}
.carousel-inner {
  height: 100%;
  /* border: solid blue; */
}
.carousel-item {
  /* z-index: 0; */
  /* border: solid lawngreen; */
}
h1 {
  position: relative;
  color: white;
  top: 60px;
  left: 300px;
  z-index: 20;
  font-size: 100px;
}
h1 span {
  font-size: 130px;
  display: block;
  padding: 10px;
  text-align: center;
}

img {
  object-fit: cover;
  object-position: 0 -90px;
}
@media screen and (max-width: 1440px) {
  .carousel {
    height: 850px;
  }
  h1 {
    left: 200px;
  }
  .home-open {
    margin-top: 70px;
  }
}
@media screen and (max-width: 1024px) {
  .home-open {
    margin-top: 80px;
  }
  .carousel {
    height: 530px;
  }
  img {
    object-position: 0 -100px;
  }
  h1 {
    left: 100px;
    font-size: 80px;
  }
  h1 span {
    font-size: 100px;
  }
}
@media screen and (max-width: 768px) {
  .home-open {
    margin-top: 68px;
  }
  .carousel {
    height: 430px;
  }
  img {
    object-position: 0 -80px;
  }
  h1 {
    left: 90px;
    font-size: 60px;
  }
  h1 span {
    font-size: 90px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
 .home-open {
    margin-top: 65px;
  }
 .carousel {
    height: 250px;
  }
  img {
    object-position: 0 -30px;
  }
  h1 {
    left: 60px;
    top: 0;
    font-size: 30px;
  }
  h1 span {
    font-size: 50px;
  }
}
</style>
