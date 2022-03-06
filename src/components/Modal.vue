<template>
  <transition>
    <div class="base-modal Topic-Modal" v-if="modalActive">
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
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-if="!hideConfirm">{{ confirmText }}</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TopicModalForm",
  props: ["modalActive", "title", "confirmText", "hideConfirm"],
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
<style scoped>
.base-modal {
  font-family: inherit !important;
}
</style>
