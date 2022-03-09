<template>
  <div class="limiter">
    <div class="container-main">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.limiter {
  height: 100%;
}
.container-main {
  height: 100%;
  background-image: url("../assets/images/bg-01.jpg");
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .container-main {
    background-image: url("https://wallpaperaccess.com/full/4688697.jpg");
  }
}
</style>
