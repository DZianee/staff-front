<template>
  <div class="home-open">
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/images/tezos-WN5_7UBc7cw-unsplash.jpg" class="d-block w-100" alt="img 02." />
        </div>
        <div class="carousel-item">
          <img src="../assets/images/krisjanis-kazaks-2OAU1isIErs-unsplash.jpg" class="d-block w-100" alt="img 01" />
        </div>
        <div class="carousel-item">
          <img src="../assets/images/christian-wiebel-Ow6a_JaZRqM-unsplash.jpg" class="d-block w-100" alt="img 03" />
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
.carousel {
  width: 100%;
  height: 913px;
}
.carousel-inner {
  height: 100%;
}
img {
  object-fit: cover;
  object-position: 0 -90px;
}
@media screen and (max-width: 1440px) {
  .carousel {
  height: 850px;
  }
}
@media screen and (max-width: 1024px) {
  .carousel {
  height: 530px;
  }
  img {
    object-position: 0 -100px;
  }
}
@media screen and (max-width: 768px) {
  .carousel {
    height: 430px;
  }
  img {
    object-position: 0 -80px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .carousel {
    height: 250px;
  }
  img {
    object-position: 0 -30px;
  }
}
</style>
