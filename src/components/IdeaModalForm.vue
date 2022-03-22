<template>
  <transition>
    <div class="Idea-Modal" v-if="IdeaModalActive">
      <span class="Idea-Modal-backdrop" @click="closeIdea"></span>
      <div class="Idea-Modal-container">
        <div class="Idea-Modal-close" @click="closeIdea">
          <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
        </div>
        <header class="Idea-Modal-header">
          <p>Create New Idea</p>
        </header>
        <div class="Idea-Modal-body">
          <label for="Idea-name" class="Idea-Modal-label"> Topic: </label>

          <label for="Idea-name" class="Idea-Modal-label"> Idea's Name </label>
          <input type="text" class="Idea-Modal-input" maxlength="35" placeholder="Idea's Name" v-model="ModalForm.IdeaName" />

          <label for="Idea-description" class="Idea-Modal-label"> Idea's Description </label>
          <!-- <input type="text" class="Idea-Modal-input" placeholder="Idea's Name" v-model="ModalForm.IdeaDescription" /> -->
          <VueQuillEditor
            :theme="'snow'"
            :toolbar="'#my-toolbar'"
            :heightEdit="'100'"
            :disableEdit="false"
            :contentEdit="ModalForm.TopicDescription"
            @handleInput="handleInput" />

          <input type="file" accept="image/*" style="font-size: 14px; margin: 16px 0" @change="imageSelected" />

          <div class="form-group" style="width: 100% !important">
            <div class="form-check" style="display: flex; align-items: center; gap: 12px; padding: 0">
              <input class="form-check-input" type="checkbox" @change="onCheckbox" style="margin-top: 0; float: unset; margin-left: 0" />
              <label class="form-check-label" for="flexCheckDefault" style="font-size: 16px">
                I agree with the <span class="conditions" @click="toggleTermCondition">terms & conditions</span></label
              >
            </div>
          </div>

          <div class="terms-conditions" v-if="isShowTermCondition">
            <p>
              Welcome to our digital information network. These are our terms and conditions for use of use of the network, which you may access in
              several ways, including but not limited to the World Wide Web via the Greenwich University. In these terms and conditions, when we say
              the “Guardian Site” we mean the digital information network operated by Greenwich University.
            </p>
          </div>

          <p class="Error-Message" v-if="ErrorDisable">All the field are required and Closure date must be > 3 days since current date</p>
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
      ModalForm: {
        IdeaName: "",
        IdeaDescription: "",
        file: [],
      },

      isShowTermCondition: false,

      Disable: true,
      ErrorDisable: false,
      isOpenModal: false,
    };
  },

  props: ["IdeaModalActive"],
  setup(props, { emit }) {
    const closeIdea = () => {
      emit("closeIdea");
    };

    return { closeIdea };
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
    toggleTermCondition() {
      this.isShowTermCondition = !this.isShowTermCondition;
    },
    imageSelected(event) {
      this.ModalForm.file = event.target.files[0];
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
        if (this.ModalForm.file) {
          topic.append("file", this.ModalForm.file, this.ModalForm.file.name);
        }
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
.Idea-Modal-container {
  position: relative;
  width: 80%;
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

.Idea-Modal {
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

.Idea-Modal-backdrop {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.Idea-Modal-header {
  position: absolute;
  width: 250px;
  height: 30px;
  left: calc(50% - 250px / 2);
  top: 20px;
  text-align: center;
}

.Idea-Modal-header p {
  font-size: 20px;
}

.Idea-Modal-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  cursor: pointer;
  font-size: 20px;
}

.Idea-Modal-body {
  padding: 16px;
  margin-top: 55px;
}

.Idea-Modal-label {
  display: block;
  font-size: 15px;
  margin-bottom: 6px;
  text-align: left;
}

.Idea-Modal-input {
  border: 1px solid #ccc;
  background-color: #c4c4c4;
  border-radius: 9px;
  width: 100%;
  padding: 10px;
  font-size: 15px;
  margin-bottom: 10px;
}

.conditions {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
