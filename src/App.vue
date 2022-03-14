<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { useRouter } from "vue-router";

const defaultLayout = "default";
export default {
  computed: {
    layout() {
      const { currentRoute } = useRouter();
      return `${currentRoute.value.meta.layout || defaultLayout}-layout`;
    },
  },
  methods: {
    async refresh() {
      try {
        this.$store.dispatch("fetchAccessToken");
        await this.$axios.post(`api/v1/User/RefreshToken`, this.$axios.defaults.headers["Authorization"]);
      } catch (e) {
        //
      }
    },
  },
  created() {
    this.$store.dispatch("fetchAccessToken");
    // this.refresh();
    // if (this.$store.state.token != null) {
    //   setInterval(
    //     function () {
    //       this.refresh();
    //     }.bind(this),
    //     25 * 60 * 1000
    //   );
    // }
  },
  beforeMount() {
    this.$store.dispatch("getUser");
  },
};
</script>

<style></style>
