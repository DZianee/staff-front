<template>
  <QuillEditor
    style="background-color: white"
    :theme="theme"
    :toolbar="[
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'code-block',
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
      { size: ['small', false, 'large', 'huge'] },
      { header: [1, 2, 3, 4, 5, 6, false] },
      { color: [] },
      { background: [] },
    ]"
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

        <!-- <select class="ql-size"></select> -->
        <!-- <span class="ql-size ql-picker"
          ><span class="ql-picker-label" tabindex="0" role="button" aria-expanded="false" aria-controls="ql-picker-options-0"
            ><svg viewBox="0 0 18 18">
              <polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"></polygon>
              <polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"></polygon></svg></span
          ><span class="ql-picker-options" aria-hidden="true" tabindex="-1" id="ql-picker-options-0"
            ><span tabindex="0" role="button" class="ql-picker-item" data-value="small"></span
            ><span tabindex="0" role="button" class="ql-picker-item ql-selected"></span
            ><span tabindex="0" role="button" class="ql-picker-item" data-value="large"></span
            ><span tabindex="0" role="button" class="ql-picker-item" data-value="huge"></span></span
        ></span> -->
        <!-- <select class="ql-header"></select>
        <select class="ql-color"></select>
        <select class="ql-background"></select>
        <select class="ql-align"></select> -->
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
