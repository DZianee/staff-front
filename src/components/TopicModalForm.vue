<template>
  <transition>
    <div class="Topic-Modal" v-if="modalActive">
      <span class="Topic-Modal-backdrop" @click="close"></span>
      <div class="Topic-Modal-container">
        <div class="Topic-Modal-close" @click="close">
          <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
        </div>
        <header class="Topic-Modal-header">
          <p>Create New Topic</p>
        </header>
        <div class="Topic-Modal-body">
          <label for="topic-name" class="Topic-Modal-label"> Topic's Name </label>
          <input type="text" class="Topic-Modal-input" maxlength="35" placeholder="Topic's Name" />

          <label for="topic-type" class="Topic-Modal-label"> Topic's Type </label>
          <select class="Topic-Modal-input">
            <option value="" selected>Type</option>
          </select>

          <label for="closuredate" class="Topic-Modal-label"> Closure date </label>
          <input type="date" class="Topic-Modal-input" />

          <label for="color" class="Topic-Modal-label"> Color </label>
          <div class="Topic-Modal-color">
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
  name: "TopicModalForm",
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
