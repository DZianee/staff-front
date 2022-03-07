<template>
  <div class="wrap-input100 validate-input has-feedback" data-validate="Password is required">
    <input
      class="input100"
      :type="isShow ? 'text' : 'password'"
      name="pass"
      placeholder="Enter your password"
      autocomplete="false"
      :value="value"
      @input="handleInput" />
    <i
      class="bi form-control-feedback"
      :class="[{ 'bi-eye-slash-fill': !isShow }, { 'bi-eye-fill': isShow }]"
      style="font-size: 22px"
      @click="toggle"></i>
    <span v-if="!isValid" class="txt2 m-t-15 m-l-15"> Must at least 8 characters </span>
  </div>
</template>
<script>
export default {
  name: "PassordComponent",
  props: {
    isValid: {
      type: [Boolean],
      required: false,
      default: true,
    },
    value: {
      type: [String],
      required: false,
      default: "",
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  components: {},
  computed: {},
  emits: ["update:value"],
  methods: {
    handleInput(event) {
      this.$emit("update:value", event.target.value);
    },
    toggle() {
      this.isShow = !this.isShow;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.has-feedback input {
  padding-right: 60px;
}
.form-control-feedback {
  position: absolute;
  top: 0.5rem;
  right: 1.5rem;
  z-index: 2;
  display: block;
  text-align: center;
  cursor: pointer;
}
.input100 {
  font-size: 15px;
}
</style>
