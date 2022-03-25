<template>
  <div class="Image-Modal">
    <span class="Image-Modal-backdrop" />
    <div class="Image-Modal-close" @click="close">
      <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
    </div>
    <div class="Image-Modal-left" @click.stop="prev" :class="{ invisible: !hasPrev() }">
      <i class="bi bi-caret-left-fill" style="font-size: 46px"></i>
    </div>
    <div class="Image-Modal-container">
      <img :src="`http://${images[index]}`" />
    </div>
    <div class="Image-Modal-right" @click.stop="next" :class="{ invisible: !hasNext() }">
      <i class="bi bi-caret-right-fill" style="font-size: 46px"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalActive: {
      type: Boolean,
      required: true,
    },
    imagesIndex: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      index: this.imagesIndex,
    };
  },
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
  methods: {
    hasNext() {
      return this.index + 1 < this.images.length;
    },
    hasPrev() {
      return this.index - 1 >= 0;
    },
    prev() {
      if (this.hasPrev()) {
        this.index -= 1;
      }
    },
    next() {
      if (this.hasNext()) {
        this.index += 1;
      }
    },
    onKeydown(e) {
      if (this.visible) {
        switch (e.key) {
          case "ArrowRight":
            this.next();
            break;
          case "ArrowLeft":
            this.prev();
            break;
          case "ArrowDown":
          case "ArrowUp":
          case " ":
            e.preventDefault();
            break;
          case "Escape":
            this.close();
            break;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },
  unmounted() {
    window.removeEventListener("keydown", this.onKeydown);
  },
};
</script>

<style scoped>
.Image-Modal {
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
.Image-Modal-backdrop {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.Image-Modal-container {
  display: flex;
  position: relative;
  width: 60%;
  height: 85%;
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
.Image-Modal-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
}
.Image-Modal i::before {
  color: white;
}
.Image-Modal-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  cursor: pointer;
  font-size: 20px;
  z-index: 2;
}
.Image-Modal-right {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 12px;
  cursor: pointer;
  font-size: 20px;
  z-index: 2;
}
.Image-Modal-left {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 12px;
  cursor: pointer;
  font-size: 20px;
  z-index: 2;
}
.invisible {
  opacity: 0.4;
}
</style>
