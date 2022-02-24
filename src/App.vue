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
};
</script>
