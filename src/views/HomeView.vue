<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <HomeOpenTitle />
    <HomeAnnounceTopic />
    <HomeMostIdea />
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
import HomeOpenTitle from "@/components/HomeOpenTitle.vue";
import HomeAnnounceTopic from "@/components/HomeAnnounceTopic.vue";
import HomeMostIdea from "@/components/HomeMostIdea.vue";

export default {
  name: "HomeView",
  components: {
    HomeOpenTitle,
    HomeAnnounceTopic,
    HomeMostIdea,
  },
};
</script>
<style scoped>
/* .home-open {
  border: solid red;
} */
</style>
