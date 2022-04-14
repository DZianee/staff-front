<template>
  <transition>
    <div class="Idea-Modal" v-if="IdeaModalActive">
      <span class="Idea-Modal-backdrop" @click="$emit('closeIdea')"></span>
      <div class="Idea-Modal-container">
        <div class="Idea-Modal-close" @click="$emit('closeIdea')">
          <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
        </div>
        <header class="Idea-Modal-header">
          <p>Create New Idea</p>
        </header>
        <div class="Idea-Modal-body">
          <label for="Idea-name" class="Idea-Modal-label"> Topic: {{ TopicName }}</label>

          <label for="Idea-name" class="Idea-Modal-label"> Idea's title </label>
          <input type="text" class="Idea-Modal-input" maxlength="35" placeholder="Idea's title" v-model="ModalForm.IdeaTitle" />

          <label for="Idea-description" class="Idea-Modal-label"> Idea's Description </label>
          <!-- <input type="text" class="Idea-Modal-input" placeholder="Idea's Name" v-model="ModalForm.IdeaDescription" /> -->
          <VueQuillEditor
            :theme="'snow'"
            :toolbar="'#my-toolbar'"
            :heightEdit="'100'"
            :disableEdit="false"
            :contentEdit="ModalForm.IdeaDescription"
            @handleInput="handleInput" />

          <div>
            <input
              type="file"
              accept="image/*"
              ref="inputImage"
              class="custom-image-input"
              style="font-size: 14px; margin: 16px 0"
              @change="imageSelected" />
            <div class="previewImagesContainer" v-if="previewImage.length > 0">
              <span class="previewItem" v-for="(image, index) in previewImage" :key="index">
                <i class="bi form-control-feedback bi-x-lg" @click="deleteImage(index)" style="font-size: 22px"></i>
                <img class="previewImages" :src="image" @click="ImageLightBoxAct(index)" />
              </span>
              <!-- <span>
              <embed :src="src" />
            </span> -->
            </div>
          </div>

          <div>
            <input
              type="file"
              accept=".pdf"
              ref="inputFile"
              class="custom-file-input"
              style="font-size: 14px; margin: 16px 0"
              @change="fileSelected" />
            <div class="previewFilesContainer" v-if="ModalForm.files.length > 0">
              <span class="previewItem" v-for="(file, index) in ModalForm.files" :key="index">
                <i class="bi form-control-feedback bi-x-lg" @click="deleteFile(index)" style="font-size: 22px"></i>
                <span @click="openpdf(index)">
                  <i class="bi bi-file-earmark-pdf"></i>
                  <p>{{ file.name }}</p>
                </span>
              </span>
            </div>
          </div>

          <div class="form-group" style="width: 100% !important">
            <div class="form-check" style="display: flex; align-items: center; gap: 12px; padding: 0; margin-top: 30px">
              <input
                name="Anonymous"
                class="form-check-input"
                type="checkbox"
                v-model="ModalForm.isAnonymous"
                style="margin-top: 0; float: unset; margin-left: 0" />
              <label class="form-check-label" for="flexCheckDefault" style="font-size: 16px"> Post Anonymously ?</label>
            </div>
          </div>

          <div class="form-group" style="width: 100% !important">
            <div class="form-check" style="display: flex; align-items: center; gap: 12px; padding: 0; margin-top: 30px">
              <input
                name="Condition"
                class="form-check-input"
                type="checkbox"
                v-model="ModalForm.AcceptCondition"
                style="margin-top: 0; float: unset; margin-left: 0" />
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

          <p class="Error-Message" style="margin-top: 12px" v-if="ErrorDisable">Title and Description fields are required</p>
          <button class="submit-add" style="margin-top: 12px" :class="Disable ? 'disable' : ''" :disabled="Disable" @click="Create">Submit</button>
        </div>
      </div>
      <component
        :is="'confirm-modal'"
        v-if="isOpenModal"
        title="Create new idea"
        :ConfirmModalActive="isOpenModal"
        :activeConfirmButton="true"
        confirmText="Agree"
        @submitModal="submit"
        @closeModal="closeModal">
        <p>You want to create a new idea to this topic ?</p>
        <br />
      </component>
    </div>
  </transition>
  <Image-light-box
    v-if="ImageLightBoxActive"
    :imageUrl="false"
    :modalActive="ImageLightBoxActive"
    :imagesIndex="imageRef"
    :images="previewImage"
    @close="ImageLightBoxAct(-1)" />
</template>

<script>
import VueQuillEditor from "./QuillEditor.vue";
import ImageLightBox from "../components/ImageLightBox.vue";
import { ref } from "vue";

export default {
  name: "IdeaModalForm",
  components: {
    VueQuillEditor,
    ImageLightBox,
  },
  data() {
    return {
      // src: [],
      ModalForm: {
        IdeaTitle: "",
        IdeaDescription: "",
        images: [],
        files: [],
        isAnonymous: false,
        AcceptCondition: false,
      },
      previewImage: [],

      isShowTermCondition: false,

      Disable: true,
      ErrorDisable: true,
      isOpenModal: false,
    };
  },

  props: ["IdeaModalActive", "TopicID", "TopicName"],
  emits: ["closeIdea"],
  setup() {
    const ImageLightBoxActive = ref(false);
    const imageRef = ref(0);

    const ImageLightBoxAct = (imageindex) => {
      ImageLightBoxActive.value = !ImageLightBoxActive.value;
      imageRef.value = imageindex;
    };
    return { ImageLightBoxActive, imageRef, ImageLightBoxAct };
  },
  watch: {
    ModalForm: {
      handler(newvalue) {
        if (newvalue.IdeaTitle && newvalue.IdeaDescription && newvalue.AcceptCondition) {
          this.ErrorDisable = false;
          this.Disable = false;
        } else {
          this.ErrorDisable = true;
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
      this.ModalForm.images.push(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.previewImage.push(event.target.result);
        this.$refs.inputImage.value = null;
      };
    },
    deleteImage(value) {
      this.ModalForm.images.splice(value, 1);
      this.previewImage.splice(value, 1);
    },
    fileSelected(event) {
      // this.src.push(URL.createObjectURL(event.target.files[0]));
      if (this.ModalForm.files.length > 0 && this.ModalForm.files != null) {
        for (var x = 0; x < this.ModalForm.files.length; x++) {
          if (
            this.ModalForm.files[x].name === event.target.files[0].name &&
            this.ModalForm.files[x].lastModified === event.target.files[0].lastModified &&
            this.ModalForm.files[x].size === event.target.files[0].size
          ) {
            return;
          }
        }
      }
      this.ModalForm.files.push(event.target.files[0]);
      this.$refs.inputFile.value = null;
    },
    deleteFile(value) {
      this.ModalForm.files.splice(value, 1);
    },
    openpdf(value) {
      var blob = new Blob([this.ModalForm.files[value]], { type: "application/pdf" });
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    },
    handleInput(data) {
      this.ModalForm.IdeaDescription = data;
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
        const idea = new FormData();
        idea.append("TopicId", this.TopicID);
        idea.append("Title", this.ModalForm.IdeaTitle);
        idea.append("Description", this.ModalForm.IdeaDescription);
        idea.append("Description", this.ModalForm.IdeaDescription);
        idea.append("UserId", user.id);
        if (this.ModalForm.files.length > 0) {
          for (var i = 0; i < this.ModalForm.files.length; i++) {
            idea.append("documentFiles", this.ModalForm.files[i]);
          }
        }
        if (this.ModalForm.images.length > 0) {
          for (var x = 0; x < this.ModalForm.images.length; x++) {
            idea.append("imageFiles", this.ModalForm.images[x]);
          }
        }
        const res = await this.$axios.post(`api/v1/Idea`, idea, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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

<style scoped>
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
  border: solid;
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
.custom-file-input,
.custom-image-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button,
.custom-image-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-image-input::before {
  content: "Select new image";
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input::before {
  content: "Select new pdf";
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before,
.custom-image-input:hover::before {
  border-color: black;
}
.custom-file-input:active,
.custom-image-input:active {
  outline: 0;
}
.custom-file-input:active::before,
.custom-image-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
.previewImagesContainer,
.previewFilesContainer {
  display: flex;
  gap: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid black;
  padding: 12px;
  border-radius: 16px;
  overflow-x: auto;
}
/* .previewImagesContainer {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.previewImagesContainer::-webkit-scrollbar {
  display: none;
} */
.previewImagesContainer .previewItem {
  position: relative;
  min-width: 200px;
  min-height: 150px;
  max-width: 200px;
  max-height: 150px;
}
.previewFilesContainer .previewItem {
  position: relative;
  min-width: 100px;
  min-height: 85px;
  max-width: 130px;
  max-height: 70px;
  text-align: center;

  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.previewItem > span {
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.previewItem > span > p {
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.previewImagesContainer .bi-x-lg,
.previewFilesContainer .bi-x-lg {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.previewImages {
  width: 200px;
  height: 150px;
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
  image-rendering: pixelated;
  object-fit: contain;
}
</style>
