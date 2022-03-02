<template>
  <transition>
    <div class="Topic-Modal" v-if="modalActive">
      <span class="Topic-Modal-backdrop" @click="close"></span>
      <div class="Topic-Modal-container">
        <div class="Topic-Modal-close" @click="close">
          <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
        </div>
        <header class="Topic-Modal-header">
          <p>{{ title }}</p>
        </header>
        <div class="Topic-Modal-body">
          <slot></slot>
          <button class="submit-add" @click="submit">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TopicModalForm",
  props: ["modalActive", "title", "confirmText"],
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
