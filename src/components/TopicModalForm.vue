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
          <input type="text" class="Topic-Modal-input" maxlength="35" placeholder="Topic's Name" v-model="ModalForm.TopicName" />

          <label for="topic-type" class="Topic-Modal-label"> Topic's Type </label>
          <select class="Topic-Modal-input" v-model="ModalForm.TopicType">
            <option value="0" selected>Type</option>
            <option value="1" selected>Type2</option>
          </select>

          <label for="closuredate" class="Topic-Modal-label"> Close Idea date </label>
          <input type="datetime-local" id="datePicker" class="Topic-Modal-input" v-model="ModalForm.TopicCloseIdeaDate" />

          <label for="closuredate" class="Topic-Modal-label"> Closure date </label>
          <input type="datetime-local" id="datePicker" class="Topic-Modal-input" v-model="ModalForm.TopicClosureDate" />

          <label for="color" class="Topic-Modal-label"> Color </label>
          <div class="Topic-Modal-color">
            <div v-for="color in colors" :key="color">
              <span class="inner-circle" v-bind:style="{ backgroundColor: color }" @click="checkColor(color)">
                <span v-if="ModalForm.Colorcheck === color" style="color: white; font-weight: 700">&#10003;</span>
              </span>
            </div>
          </div>

          <button class="submit-add" :class="Disable ? 'disable' : ''" :disabled="Disable" @click="submit">Submit</button>
          <p class="Error-Message" v-if="ErrorDisable">Closure date must be > 3 days since current date and close idea date must be between 2 days</p>
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
      ModalForm: {
        Colorcheck: "red",
        TopicName: "",
        TopicType: 0,
        TopicCloseIdeaDate: "",
        TopicClosureDate: "",
      },
      Disable: true,
      ErrorDisable: false,
    };
  },

  props: ["modalActive"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return { close };
  },
  watch: {
    // TopicDate(value) {
    //   const current = new Date();
    //   var a = current.getTime();
    //   var b = Date.parse(value);
    //   console.log(b);
    //   if (b > a && this.Colorcheck && this.TopicName && this.TopicType) {
    //     this.Disable = false;
    //     this.ErrorDisable = false;
    //   } else {
    //     this.Disable = true;
    //     this.ErrorDisable = true;
    //   }
    // },
    ModalForm: {
      handler(newvalue) {
        const current = new Date();
        var a = current.getTime();
        var b = Date.parse(newvalue.TopicClosureDate);
        var c = b - a;
        var days = Math.ceil(c / (1000 * 3600 * 24));
        if (days > 3 && newvalue.Colorcheck && newvalue.TopicName && newvalue.TopicType) {
          this.Disable = false;
          this.ErrorDisable = false;
        } else {
          if (days < 3) {
            this.ErrorDisable = true;
          }
          this.Disable = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    checkColor(color) {
      this.ModalForm.Colorcheck = color;
    },
    async submit() {
      try {
        console.log(sessionStorage.getItem("Token"));
        this.$store.dispatch("fetchAccessToken");
        this.$store.dispatch("getUser");
        const user = JSON.parse(this.$store.state.user);
        const ClosetimeStamp = Date.parse(this.ModalForm.TopicClosureDate);
        const CloseIdeatimeStamp = Date.parse(this.ModalForm.TopicCloseIdeaDate);
        // const StarttimeStamp = Date.now();
        const topic = {
          name: this.ModalForm.TopicName,
          type: this.ModalForm.TopicType,
          colorCode: this.ModalForm.Colorcheck,
          closeIdeaDate: CloseIdeatimeStamp,
          closureDate: ClosetimeStamp,
          userId: user.id,
          // departmentId: user.departmentId,
        };
        const res = await this.$axios.post(`api/v1/Topic`, topic, this.$axios.defaults.headers["Authorization"]);
        if (res.status == 200) {
          this.$router.go();
        }
        console.log(topic);
      } catch (e) {
        //
      }
    },
  },
};
</script>

<style>
.disable {
  opacity: 0.5;
  pointer-events: none;
}
</style>
