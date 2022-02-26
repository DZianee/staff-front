<template>
  <transition>
    <div class="modal" v-if="modalActive">
      <span class="modal-backdrop" @click="close"></span>
      <div class="modal-container">
        <div class="modal-close" @click="close">
          <p>X</p>
        </div>
        <header class="modal-header">
          <p>Create New Topic</p>
        </header>
        <div class="modal-body">
          <label for="topic-name" class="modal-label"> Topic's Name </label>
          <input type="text" class="modal-input" maxlength="35" placeholder="Topic's Name" />

          <label for="topic-type" class="modal-label"> Topic's Type </label>
          <select class="modal-input">
            <option value="" selected>Type</option>
          </select>

          <label for="closuredate" class="modal-label"> Closure date </label>
          <input type="date" class="modal-input" />

          <label for="color" class="modal-label"> Color </label>
          <div class="modal-color">
            <div v-for="color in colors" :key="color">
              <span class="inner-circle" v-bind:style="{ backgroundColor: color }" @click="checkColor(color)">
                <span v-if="Colorcheck === color" style="color: white; font-weight: 700">&#10003;</span>
              </span>
            </div>
          </div>

          <button class="submit-add">Submit</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalForm",
  data() {
    return {
      colors: ["red", "purple", "blue"],
      Colorcheck: "",
    };
  },

  props: ["modalActive"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return { close };
  },
  methods: {
    checkColor(color) {
      this.Colorcheck = color;
    },
  },
};
</script>
