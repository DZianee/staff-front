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

          <label for="topic-description" class="Topic-Modal-label"> Topic's Description </label>
          <!-- <input type="text" class="Topic-Modal-input" placeholder="Topic's Name" v-model="ModalForm.TopicDescription" /> -->
          <VueQuillEditor :heightEdit="'100'" :disableEdit="false" :contentEdit="ModalForm.TopicDescription" @handleInput="handleInput" />

          <input type="file" accept="image/*" style="font-size: 14px; margin: 16px 0" @change="imageSelected" />

          <label for="closuredate" class="Topic-Modal-label"> Close Idea date </label>
          <input type="datetime-local" id="datePicker" class="Topic-Modal-input" v-model="ModalForm.TopicCloseIdeaDate" />

          <label for="closuredate" class="Topic-Modal-label"> Closure date </label>
          <input type="datetime-local" id="datePicker" class="Topic-Modal-input" v-model="ModalForm.TopicClosureDate" />

          <label for="color" class="Topic-Modal-label"> Color </label>
          <div class="Topic-Modal-color">
            <div v-for="color in colors" :key="color">
              <span class="inner-circle" v-bind:style="{ backgroundColor: color }" @click="checkColor(color)">
                <span v-if="ModalForm.Colorcheck === color" style="color: black; font-weight: 700">&#10003;</span>
              </span>
            </div>
          </div>

          <p class="Error-Message" v-if="ErrorDisable">
            All the field are required and Closure date must be > 3 days since current date and close idea date must be between 2 days
          </p>
          <button class="submit-add" :class="Disable ? 'disable' : ''" :disabled="Disable" @click="Create">Submit</button>
        </div>
      </div>
      <component
        :is="'confirm-modal'"
        v-if="isOpenModal"
        title="Create new topic"
        :ConfirmModalActive="isOpenModal"
        :activeConfirmButton="true"
        confirmText="Agree"
        @submitModal="submit"
        @closeModal="closeModal">
        <p>You want to create a new topic ?</p>
        <br />
      </component>
    </div>
  </transition>
</template>

<script>
import VueQuillEditor from "./QuillEditor.vue";

export default {
  name: "TopicModalForm",
  components: {
    VueQuillEditor,
  },
  data() {
    return {
      colors: ["#F3D1DC", "#FCF0CF", "#888DF2", "#E8C4F2", "#59D9CC", "#ECAD8F", "#FFFCDC", "#CDF0EA", "#D9D7F1", "#F2B3BF", "#D5C7D9", "#D7D7D9"],
      ModalForm: {
        Colorcheck: "#F3D1DC",
        TopicName: "",
        TopicDescription: "",
        TopicCloseIdeaDate: "",
        TopicClosureDate: "",
        file: "",
      },
      Disable: true,
      ErrorDisable: false,
      isOpenModal: false,
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
        var c = Date.parse(newvalue.TopicCloseIdeaDate);
        var d = b - a;
        var days = Math.ceil(d / (1000 * 3600 * 24));
        if (days > 3 && b > c && c > a && newvalue.Colorcheck && newvalue.TopicName && newvalue.TopicDescription) {
          this.Disable = false;
          this.ErrorDisable = false;
        } else {
          if (days < 3 || b < c || c < a) {
            this.ErrorDisable = true;
          }
          this.Disable = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    imageSelected(event) {
      this.ModalForm.file = event.target.files[0];
      console.log(event);
      console.log(this.ModalForm.file);
    },
    checkColor(color) {
      this.ModalForm.Colorcheck = color;
    },
    handleInput(data) {
      this.ModalForm.TopicDescription = data;
    },
    Create() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
    },
    async submit() {
      try {
        const user = JSON.parse(this.$store.state.user);
        const ClosetimeStamp = Date.parse(this.ModalForm.TopicClosureDate);
        const CloseIdeatimeStamp = Date.parse(this.ModalForm.TopicCloseIdeaDate);
        // const StarttimeStamp = Date.now();
        // const topic = {
        //   Name: this.ModalForm.TopicName,
        //   Description: this.ModalForm.TopicDescription,
        //   ColorCode: this.ModalForm.Colorcheck,
        //   CloseIdeaDate: CloseIdeatimeStamp,
        //   ClosureDate: ClosetimeStamp,
        //   UserId: user.id,
        //   file: this.ModalForm.file,
        //   // departmentId: user.departmentId,
        // };
        const topic = new FormData();
        topic.append("Name", this.ModalForm.TopicName);
        topic.append("Description", this.ModalForm.TopicDescription);
        topic.append("ColorCode", this.ModalForm.Colorcheck);
        topic.append("CloseIdeaDate", CloseIdeatimeStamp);
        topic.append("ClosureDate", ClosetimeStamp);
        topic.append("UserId", user.id);
        topic.append("file", this.ModalForm.file, this.ModalForm.file.name);
        console.log(topic);
        const res = await this.$axios.post(`api/v1/Topic`, topic);
        if (res.status == 200) {
          this.$router.go();
        }
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
.Topic-Modal-container {
  position: relative;
  width: 40%;
  max-width: calc(100% - 32px);
  max-height: calc(100% - 32px);
  background-color: white;
  border-radius: 5px;
  animation: modalfadein ease 0.3s;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 26px;
  overflow-y: scroll;
  text-align: left;
  z-index: 2;
}
@media (max-width: 1024px) {
  .Topic-Modal-container {
    width: 60%;
  }
}
@media (max-width: 768px) {
  .Topic-Modal-container {
    /* width: 60%; */
    overflow-x: hidden;
  }
}
@media (min-width: 320px) and (max-width: 480px) {
  .Topic-Modal-container {
    width: 80%;
  }
}
</style>
