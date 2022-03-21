<template>
  <QuillEditor
    style="background-color: white"
    :theme="theme"
    :toolbar="toolbar"
    contentType="html"
    :readOnly="disableEdit"
    :style="{ height: heightEdit + 'px' }"
    v-model:content="contentEditor"
    @update:content="handleInput">
    <template #toolbar>
      <div id="my-toolbar">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
        <button class="ql-link"></button>

        <select class="ql-size"></select>
        <select class="ql-header"></select>
        <select class="ql-color"></select>
        <select class="ql-background"></select>
        <select class="ql-align"></select>
      </div>
    </template>
  </QuillEditor>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  props: {
    contentEdit: String,
    disableEdit: Boolean,
    heightEdit: String,
    theme: String,
    toolbar: String,
  },
  data() {
    return {
      contentEditor: this.contentEdit,
    };
  },
  components: {
    QuillEditor,
  },
  emits: ["handleInput"],
  methods: {
    handleInput() {
      this.$emit("handleInput", this.contentEditor);
    },
  },
};
</script>

<style>
.ql-hidden {
  display: none;
}
</style>
