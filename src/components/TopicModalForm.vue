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
          <VueQuillEditor
            :theme="'snow'"
            :toolbar="'#my-toolbar'"
            :heightEdit="'100'"
            :disableEdit="false"
            :contentEdit="ModalForm.TopicDescription"
            @handleInput="handleInput" />

          <label for="department" class="Topic-Modal-label" style="margin-top: 6px"> Department </label>
          <select v-model="ModalForm.DepartmentID" class="form-control Topic-Modal-input">
            <option value="" disabled selected hidden>Please Choose...</option>
            <option v-for="department in Departments" :key="department.id" :value="department.id">
              {{ department.name }}
            </option>
          </select>

          <div class="Topic-Modal-Image">
            <input type="file" accept="image/*" @change="imageSelected" />
            <img style="width: 200px" :src="previewImage" />
          </div>

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

          <p class="Error-Message" v-if="ErrorDisable">All the field are required and Closure date must be > 3 days since current date</p>
          <p class="Error-Message" v-if="IdeaErrorDisable">Close idea date must be between 2 days (1 hour gap)</p>
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
        DepartmentID: "",
        file: "",
      },
      Departments: [],
      previewImage: undefined,

      Disable: true,
      ErrorDisable: false,
      IdeaErrorDisable: false,
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

        if (days > 3) {
          this.ErrorDisable = false;
        } else {
          this.ErrorDisable = true;
        }

        if (c) {
          if (Math.ceil(c - a) < 3600000 || Math.ceil(b - c) < 3600000) {
            this.IdeaErrorDisable = true;
          } else {
            this.IdeaErrorDisable = false;
          }
        }

        if (this.ErrorDisable == false && this.IdeaErrorDisable == false && newvalue.Colorcheck && newvalue.TopicName && newvalue.TopicDescription) {
          this.Disable = false;
        } else {
          this.Disable = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    imageSelected(event) {
      this.ModalForm.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.ModalForm.file);
      reader.onload = (event) => {
        this.previewImage = event.target.result;
      };
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
        let CloseIdeatimeStamp;
        if (this.ModalForm.TopicCloseIdeaDate) {
          CloseIdeatimeStamp = Date.parse(this.ModalForm.TopicCloseIdeaDate);
        } else {
          CloseIdeatimeStamp = null;
        }
        const topic = new FormData();
        topic.append("Name", this.ModalForm.TopicName);
        topic.append("Description", this.ModalForm.TopicDescription);
        topic.append("ColorCode", this.ModalForm.Colorcheck);
        if (CloseIdeatimeStamp) {
          topic.append("CloseIdeaDate", CloseIdeatimeStamp);
        }
        topic.append("ClosureDate", ClosetimeStamp);
        topic.append("UserId", user.id);
        topic.append("DepartmentId", this.ModalForm.DepartmentID);
        if (this.ModalForm.file) {
          topic.append("file", this.ModalForm.file, this.ModalForm.file.name);
        }
        const res = await this.$axios.post(`api/v1/Topic`, topic);
        if (res.status == 200) {
          this.$router.go();
        }
      } catch (e) {
        //
      }
    },
    async GetDepartments() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const res = await this.$axios.get(`api/v1/Department`, this.$axios.defaults.headers["Authorization"]);
        this.Departments = res.data.content;
      } catch (e) {
        //
      }
    },
  },
  mounted() {
    this.GetDepartments();
  },
};
</script>

<style scoped>
.disable {
  opacity: 0.5;
  pointer-events: none;
}
.Topic-Modal-color {
  list-style: none;
  margin-bottom: 10px;
}

.Topic-Modal-color {
  position: relative;
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  gap: 10px;
  height: 30px;
  width: 30px;
  font-size: 16px;
}
.Topic-Modal-container {
  position: relative;
  width: 40%;
  max-width: calc(100% - 32px);
  max-height: calc(100% - 60px);
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
.Topic-Modal-Image {
  font-size: 14px;
  margin: 16px 0;
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
  .Topic-Modal-Image {
    font-size: 14px;
    margin: 16px 0;
  }
  .Topic-Modal-Image img {
    width: 200px;
  }
}
@media (min-width: 320px) and (max-width: 790px) {
  .Topic-Modal-Image img {
    margin-top: 10px;
  }
  .Topic-Modal-input {
    height: 44px !important;
  }
  .Topic-Modal-color {
    list-style: none;
    margin-bottom: 5px;
    grid-template-columns: repeat(8, 1fr);
  }

  .Topic-Modal-color {
    position: relative;
    height: 30px;
    width: fit-content;
    font-size: 16px;
    margin-bottom: 30px;
  }
}
</style>
