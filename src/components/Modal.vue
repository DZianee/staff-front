<template>
  <transition>
    <div class="Confirm-Modal" v-if="ConfirmModalActive">
      <span class="Confirm-Modal-backdrop" @click="closeModal"></span>
      <div class="Confirm-Modal-container">
        <div class="Confirm-Modal-close" @click="closeModal">
          <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
        </div>
        <header class="Confirm-Modal-header">
          <p>{{ title }}</p>
        </header>
        <div class="Confirm-Modal-body">
          <slot></slot>
          <div class="remove-btns">
            <button type="button" class="btn btn_cancel" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn_remove btn-success" v-if="confirmText" :disabled="!activeConfirmButton" @click="submitModal">
              {{ confirmText }}
            </button>
            <!-- <button type="button" class="btn btn_remove btn-success" v-if="CommentRejectButton" @click="CommentSubmit(false)">
              {{ CommentRejectButton }}
            </button>
            <button type="button" class="btn btn_remove btn-success" v-if="CommentConfirmButton" @click="CommentSubmit(true)">
              {{ CommentConfirmButton }}
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: ["ConfirmModalActive", "title", "confirmText", "CommentRejectButton", "CommentConfirmButton", "activeConfirmButton"],
  // methods: {
  //   close() {
  //     this.$emit("close");
  //   },
  //   submit() {
  //     this.$emit("submit");
  //   },
  // },
  setup(props, { emit }) {
    const closeModal = () => {
      emit("closeModal");
    };
    const submitModal = () => {
      emit("submitModal");
    };
    const CommentSubmit = (value) => {
      emit("CommentSubmit", value);
    };
    return { closeModal, submitModal, CommentSubmit };
  },
};
</script>

<style scoped>
.Confirm-Modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

.Confirm-Modal-backdrop {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.Confirm-Modal-container {
  position: relative;
  width: 414px;
  max-width: calc(100% - 32px);
  min-height: 200px;
  background-color: white;
  border-radius: 5px;
  animation: modalfadein ease 0.3s;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 26px;
  z-index: 2;
}

.Confirm-Modal-header {
  position: absolute;
  width: 250px;
  height: 30px;
  left: calc(50% - 250px / 2);
  top: 20px;
  text-align: center;
}

.Confirm-Modal-header p {
  font-size: 20px;
}

.Confirm-Modal-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  cursor: pointer;
  font-size: 20px;
}

.Confirm-Modal-body {
  padding: 16px;
  margin-top: 55px;
  text-align: center;
}
.remove-btns {
  position: relative;
  text-align: center;
  bottom: 0px;
  width: 100%;
  right: 0px;
}
.btn_cancel:hover {
  background-color: rgb(218, 218, 218);
}
.btn-mar-right {
  margin-right: 10px;
}
.btn {
  margin-left: 8px;
  margin-right: 8px;
}
</style>
