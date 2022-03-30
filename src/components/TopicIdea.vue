<template>
  <div class="container" style="overflow: unset; padding-bottom: 50px">
    <nav aria-label="breadcrumb" style="padding-top: 20px">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" @click="TopicRoute">Topic management</li>
        <li class="breadcrumb-item active" aria-current="page">Topic details</li>
      </ol>
    </nav>
    <h1 class="container-title">Topic Details</h1>
    <div class="content content-topic">
      <form>
        <h2 class="container-title">Information</h2>
        <div class="form-row form-topic-detail-row">
          <div class="form-group col-md-6 form-topic-detail-group">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="topic.name" />
          </div>
          <div class="form-group col-md-6 form-topic-detail-group">
            <label>Status</label>
            <select :disabled="true" class="form-control" v-model="topic.status">
              <option value="0" :selected="topic.status == 0">Open</option>
              <option value="1" :selected="topic.status == 1">Close Idea</option>
              <option value="2" :selected="topic.status == 2">Close</option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-6 form-topic-detail-group" style="margin-left: 14px">
          <label>Department</label>
          <input type="text" class="form-control" :disabled="true" placeholder="Name" v-model="topic.departmentName" />
        </div>
        <div class="AddressInput">
          <label>Description</label>
          <!-- <input type="text" class="form-control" placeholder="Description" v-model="topic.description" /> -->
          <span v-if="topic.description != null">
            <VueQuillEditor
              :theme="'snow'"
              :toolbar="'#my-toolbar'"
              :heightEdit="'200'"
              :disableEdit="false"
              v-model:contentEdit="topic.description"
              @handleInput="handleInput"
          /></span>
        </div>
        <div style="text-align: left; font-size: 14px; margin: 16px 12px">
          <img :src="`https://${topic.image}`" class="img-topic" alt="img-Topic" />
          <!-- <br />
          <div>
            <input type="file" accept="image/*" class="custom-file-input" style="margin-top: 16px" ref="inputImage" @change="imageSelected" />
            <span style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; max-width: 400px">
              <span v-if="previewImage">New image:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <img style="width: 200px" :src="previewImage" />
              <span v-if="previewImage" @click="deleteImage"><i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i></span>
            </span>
          </div> -->
        </div>
        <h2 class="container-title">Timeline</h2>
        <div class="form-row form-topic-detail-row-Date">
          <div class="form-group col-md-6 inputDate">
            <label>Start date</label>
            <input type="datetime-local" class="form-control" :disabled="true" v-model="topic.startDate" />
          </div>
          <div class="form-group col-md-6 inputDate">
            <label>Idea closing date</label>
            <input type="datetime-local" class="form-control" v-model="topic.closeIdeaDate" />
          </div>
          <div class="form-group col-md-6 inputDate">
            <label>Closure date</label>
            <input type="datetime-local" class="form-control" v-model="topic.closureDate" />
          </div>
        </div>

        <p class="Error-Message" v-if="ErrorDisable">All the field are required and Closure date must be > 3 days since current date</p>
        <p class="Error-Message" v-if="IdeaErrorDisable">Close idea date must be between 2 days (1 hour gap)</p>
        <button type="submit" :class="Disable ? 'disable' : ''" :disabled="Disable" class="btn btn-primary btnSubmit" @click="onChange(topic.id)">
          Change
        </button>
      </form>
    </div>
  </div>
  <div class="container">
    <h1 class="container-title">Ideas Management</h1>
    <div class="content">
      <div class="table-toolbar d-flex justify-content-end" style="gap: 18px">
        <div class="table-search-box">
          <input type="text" class="form-control form-input" placeholder="Search anything..." v-model="ideaSearchForm.searchTitle" />
          <span class="left-pan"> <i class="form-control-feedback bi bi-search"></i></span>
        </div>
      </div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" :class="{ Sorttarget: ideaSearchForm.sortSelected == 1 }" style="cursor: pointer" @click="sortBy(1)">
              <a
                >Title <i v-if="ideaSearchForm.sortSelected == 1 && ideaSearchForm.sortType == 'desc'" class="bi bi-caret-down"></i
                ><i v-if="ideaSearchForm.sortSelected == 1 && ideaSearchForm.sortType == 'asc'" class="bi bi-caret-up"></i
              ></a>
            </th>
            <th scope="col" :class="{ Sorttarget: ideaSearchForm.sortSelected == 2 }" style="cursor: pointer" @click="sortBy(2)">
              <a
                >By <i v-if="ideaSearchForm.sortSelected == 2 && ideaSearchForm.sortType == 'desc'" class="bi bi-caret-down"></i
                ><i v-if="ideaSearchForm.sortSelected == 2 && ideaSearchForm.sortType == 'asc'" class="bi bi-caret-up"></i
              ></a>
            </th>
            <th scope="col" :class="{ Sorttarget: ideaSearchForm.sortSelected == 0 }" style="cursor: pointer" @click="sortBy(0)">
              <a
                >Created Date <i v-if="ideaSearchForm.sortSelected == 0 && ideaSearchForm.sortType == 'desc'" class="bi bi-caret-down"></i
                ><i v-if="ideaSearchForm.sortSelected == 0 && ideaSearchForm.sortType == 'asc'" class="bi bi-caret-up"></i
              ></a>
            </th>
            <th scope="col">Adjustment</th>
          </tr>
        </thead>
        <tbody>
          <tr class="idearow" v-for="idea in ideas" :key="idea.id">
            <th scope="row" @click="ideaDetail(idea.id)">{{ idea.title }}</th>
            <td @click="ideaDetail(idea.id)">{{ idea.creator }}</td>
            <td @click="ideaDetail(idea.id)">{{ idea.startDate }}</td>
            <td class="idea-adjustment" style="width: 10%">
              <i class="bi bi-gear idea-adjustment-icon" @click="openDropdown(idea.id)"> </i>
              <ul class="idea-adjustment-items" v-if="ideaId == idea.id">
                <!-- <li class="idea-adjustment-item" style="border-bottom: 2px solid black" @click="ideaDetail(idea.id)">Detail</li> -->
                <!-- <li class="idea-adjustment-item" style="border-bottom: 2px solid black">Modify</li> -->
                <li class="idea-adjustment-item" @click="onDelete(idea.id)" style="border-bottom: 2px solid black">Delete</li>
                <li :class="topic.status != 2 ? 'disable' : ''" :disabled="topic.status != 2" class="idea-adjustment-item" @click="download(idea.id)">
                  Ideas <i class="bi bi-download"></i>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- view detail modal -->
    <!-- <Modal :title="'Idea Detail'" :modalActive="isActiveModal" :hideConfirm="true" @close="closeViewDetailModal">
      <form class="form-idea-container">
        <div class="row mb-1">
          <label class="col-sm-2 col-form-label fw-bold">Id: </label>
          <div class="col-sm-10 align-self-center">{{ currentIdea.id }}</div>
        </div>
        <div class="row mb-1">
          <label class="col-sm-2 col-form-label fw-bold">Idea: </label>
          <div class="col-sm-10 align-self-center">Create horizontal forms with the grid by adding the</div>
        </div>
      </form>
    </Modal> -->
    <div v-if="ideas.length > 0" class="pagination-container">
      <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange"> </component>
    </div>
    <component
      :is="'confirm-modal'"
      v-if="isOpenModal"
      :title="TitleConfirmText"
      :ConfirmModalActive="isOpenModal"
      :activeConfirmButton="true"
      confirmText="Agree"
      @submitModal="confirm"
      @closeModal="closeModal">
      <p>{{ ModalConfirmText }}</p>
      <br />
    </component>
  </div>
</template>
<script>
// import IdeaInfoModal from "../components/IdeaInfoModal.vue";
import VueQuillEditor from "./QuillEditor.vue";

var ModifyID;
var timeOut;

export default {
  components: {
    // IdeaInfoModal,
    VueQuillEditor,
  },
  data() {
    return {
      isOpenModal: false,
      ModalConfirmText: "",
      TitleConfirmText: "",
      topic: {},
      ideas: [],
      currentIdea: null,
      currentPage: 1,
      totalPage: 1,

      ideaSearchForm: {
        searchTitle: "",
        sortSelected: 0,
        sortType: "desc",
      },

      ideaId: "",

      // topicImage: undefined,
      // previewImage: undefined,

      Disable: true,
      ErrorDisable: false,
      IdeaErrorDisable: false,
    };
  },
  watch: {
    "ideaSearchForm.searchTitle"() {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        this.getIdeas();
      }, 2000);
    },
    topic: {
      handler(newvalue) {
        var a = Date.parse(newvalue.startDate);
        var b = Date.parse(newvalue.closureDate);
        var c = Date.parse(newvalue.closeIdeaDate);
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

        if (this.ErrorDisable == false && this.IdeaErrorDisable == false && newvalue.name && newvalue.description) {
          this.Disable = false;
        } else {
          this.Disable = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    TopicRoute() {
      this.$router.push({ name: "topicView" });
    },
    async download(data) {
      try {
        this.$store.dispatch("fetchAccessToken");
        const resTopic = await this.$axios.get(`api/v1/Idea/${data}/downloadData`, { responseType: "arraybuffer" });
        if (resTopic.status == 200) {
          var FILE = window.URL.createObjectURL(new Blob([resTopic.data], { type: "application/zip" }));
          window.open(FILE);

          // var docUrl = document.createElement("x");
          // docUrl.href = FILE;
          // docUrl.setAttribute("download", data + ".zip");
          // document.body.appendChild(docUrl);
          // docUrl.click();
        }
      } catch {
        console.log("he");
      }
    },
    // imageSelected(event) {
    //   console.log(event);
    //   this.topicImage = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(this.topicImage);
    //   reader.onload = (event) => {
    //     this.previewImage = event.target.result;
    //   };
    // },
    // deleteImage() {
    //   this.previewImage = undefined;
    //   this.topicImage = undefined;
    //   this.$refs.inputImage.value = null;
    // },
    handleInput(data) {
      this.topic.description = data;
    },
    onPageChange(page) {
      this.currentPage = page;
      this.getIdeas();
    },
    ideaDetail(value) {
      this.$router.push({ name: "ideaDetailView", params: { id: value } });
    },
    closeModal() {
      this.isOpenModal = false;
    },
    onDelete(value) {
      this.isOpenModal = true;
      this.ModalConfirmText = "You want to Delete this Idea?";
      this.TitleConfirmText = "Delete Idea";
      this.currentIdea = value;
      ModifyID = 1;
    },
    onChange(value) {
      this.isOpenModal = true;
      this.ModalConfirmText = "You want to Modify this Topic?";
      this.TitleConfirmText = "Modify Topic";
      this.currentIdea = value;
      ModifyID = 0;
    },
    sortBy(value) {
      this.$store.dispatch("fetchAccessToken");
      if (this.ideaSearchForm.sortSelected == value) {
        if (this.ideaSearchForm.sortType == "asc") {
          this.ideaSearchForm.sortType = "desc";
        } else {
          this.ideaSearchForm.sortType = "asc";
        }
      } else {
        this.ideaSearchForm.sortType = "desc";
      }
      this.ideaSearchForm.sortSelected = value;
      this.currentPage = 1;
      this.getIdeas();
    },
    clickListener(event) {
      if (event.target.className != "bi bi-gear idea-adjustment-icon") {
        this.ideaId = "";
      }
    },
    openDropdown(data) {
      this.ideaId = data;
    },
    closeDropdown() {
      this.ideaId = "";
    },
    async getTopicDetails() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const resTopic = await this.$axios.get(`api/v1/Topic/${this.$route.params.id}`);
        if (resTopic.status == 200) {
          this.topic = resTopic.data.content;
          this.topic.startDate = dateConvert(this.topic.startDate);
          if (this.topic.closeIdeaDate) {
            this.topic.closeIdeaDate = dateConvert(this.topic.closeIdeaDate);
          }
          this.topic.closureDate = dateConvert(this.topic.closureDate);
        }
      } catch {
        //
      }

      function dateConvert(timeStamp) {
        let timeStampString = timeStamp.toString();
        if (timeStampString.length < 13) {
          for (var i = timeStampString.length; i < 13; i++) {
            timeStampString += "0";
          }
        }
        const date = new Date(parseInt(timeStampString));
        let month;
        let dateVal;
        let hour;
        let minute;
        if (date.getMonth() < 9) {
          month = "0" + (parseInt(date.getMonth()) + 1).toString();
        } else {
          month = (parseInt(date.getMonth()) + 1).toString();
        }
        if (date.getDate() < 10) {
          dateVal = "0" + date.getDate();
        } else {
          dateVal = date.getDate();
        }
        if (date.getHours() < 10) {
          hour = "0" + parseInt(date.getHours()).toString();
        } else {
          hour = parseInt(date.getHours()).toString();
        }
        if (date.getMinutes() < 10) {
          minute = "0" + parseInt(date.getMinutes()).toString();
        } else {
          minute = parseInt(date.getMinutes()).toString();
        }
        let DateConverted = date.getFullYear() + "-" + month + "-" + dateVal + "T" + hour + ":" + minute;
        return DateConverted;
      }
    },
    async getIdeas() {
      try {
        this.$store.dispatch("fetchAccessToken");
        let data;
        switch (parseInt(this.ideaSearchForm.sortSelected)) {
          case 0:
            if (this.ideaSearchForm.sortType == "asc") {
              data = {
                searchTitle: this.ideaSearchForm.searchTitle,
                sortCreatedDate: this.ideaSearchForm.sortType,
              };
            } else {
              data = {
                searchTitle: this.ideaSearchForm.searchTitle,
              };
            }
            break;
          case 1:
            data = {
              searchTitle: this.ideaSearchForm.searchTitle,
              sortTitle: this.ideaSearchForm.sortType,
            };
            break;
          case 2:
            data = {
              searchTitle: this.ideaSearchForm.searchTitle,
              sortUserName: this.ideaSearchForm.sortType,
            };
            break;
          default:
            break;
        }
        const resIdea = await this.$axios.post(`api/v1/Idea/topic/${this.$route.params.id}`, data, {
          params: {
            PageSize: 5,
            CurrentPage: this.currentPage,
          },
        });
        if (resIdea.status == 200) {
          this.ideas = resIdea.data.content;
          this.ideas.forEach(startDateConvert);
          this.totalPage = resIdea.data.totalPage;
        }
      } catch {
        //
      }

      function startDateConvert(item, index, theArr) {
        let timeStampString = item.startDate.toString();
        if (timeStampString.length < 13) {
          for (var i = timeStampString.length; i < 13; i++) {
            timeStampString += "0";
          }
        }
        const date = new Date(parseInt(timeStampString));
        let month;
        let dateVal;
        let hour;
        let minute;
        if (date.getMonth() < 9) {
          month = "0" + (parseInt(date.getMonth()) + 1).toString();
        } else {
          month = (parseInt(date.getMonth()) + 1).toString();
        }
        if (date.getDate() < 10) {
          dateVal = "0" + date.getDate();
        } else {
          dateVal = date.getDate();
        }
        if (date.getHours() < 10) {
          hour = "0" + parseInt(date.getHours()).toString();
        } else {
          hour = parseInt(date.getHours()).toString();
        }
        if (date.getMinutes() < 10) {
          minute = "0" + (parseInt(date.getMinutes()) + 1).toString();
        } else {
          minute = (parseInt(date.getMinutes()) + 1).toString();
        }
        let DateConverted = month + "-" + dateVal + "-" + date.getFullYear() + " " + hour + ":" + minute;
        theArr[index].startDate = DateConverted;
      }
    },
    async confirm() {
      switch (ModifyID) {
        case 0:
          try {
            this.$store.dispatch("fetchAccessToken");
            var closeIdea = 0;
            if (this.topic.closeIdeaDate) {
              closeIdea = Date.parse(this.topic.closeIdeaDate);
            }
            const topicEdit = {
              name: this.topic.name,
              description: this.topic.description,
              colorCode: this.topic.colorCode,
              closeIdeaDate: closeIdea,
              closureDate: Date.parse(this.topic.closureDate),
            };
            const res = await this.$axios.put(`api/v1/Topic/${this.topic.id}`, topicEdit);
            if (res.status == 200) {
              this.$router.go();
            }
          } catch {
            //
          }
          break;
        case 1:
          try {
            this.$store.dispatch("fetchAccessToken");
            const res = await this.$axios.delete(`api/v1/Idea/${this.currentIdea}`, this.$axios.defaults.headers["Authorization"]);
            if (res.status == 200) {
              this.$router.go();
            }
          } catch {
            //
          }
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getTopicDetails();
    this.getIdeas();
    window.addEventListener("click", this.clickListener);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.clickListener);
  },
};
</script>
<style scoped>
.disable {
  opacity: 0.3;
}
.breadcrumb-item:hover {
  font-weight: 500;
  cursor: pointer;
}
.breadcrumb-item.active {
  color: rgb(67, 139, 255);
  font-weight: 500;
  text-decoration: underline;
}
.Sorttarget {
  background-color: coral;
  color: white;
}
.table-toolbar {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.container {
  padding-bottom: 116px;
}
.table-toolbar .search-input {
  max-width: 15%;
}
.content-topic {
  border: 1px solid #ffffff;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-top: 20px;

  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 26px;
}

.container-title {
  text-align: left;
  font-size: 30px;
  padding-top: 20px;
}

.content-topic label {
  text-align: left;
  padding-left: 10px;
  font-size: 16px;
  margin-bottom: 4px;
  color: rgb(110, 108, 108);
  letter-spacing: 0.5px;
}

.content-topic h2 {
  font-size: 25px;
  font-weight: 500;
  text-decoration: underline;
  padding-left: 16px;
}

.content-topic .inputDate {
  width: 30% !important;
}

.form-topic-detail-group {
  width: 46% !important;
  margin: 10px 0;
}

.AddressInput {
  width: 96%;
  margin: 0px auto 20px;
}

.form-row {
  width: 100%;
  justify-content: space-evenly;
}

.btnSubmit {
  margin-top: 10px !important;
  margin-right: 16px;
  float: right;
  width: 120px;
  font-size: 16px !important;
  font-weight: bold !important;
}

.downloadIdea {
  height: 35px;
  line-height: 10px;
  font-size: 16px;
  width: 18%;
  color: white;
  background: #3d5afe;
  font-weight: 500;
  cursor: pointer;
  padding: 10px;
  border-radius: 0.25rem;
}
.downloadIdea:hover {
  background: #1976d2;
}

.content table td,
.content table th {
  vertical-align: middle;
  text-align: center;
}
a {
  font-size: 16px;
}

thead tr th:nth-child(1) {
  width: 30%;
}
thead tr th:nth-child(2) {
  width: 30%;
}
thead tr th:nth-child(3) {
  width: 30%;
}
thead tr th:nth-child(4) {
  width: 10%;
}

.idearow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
  cursor: pointer;
}

.idearow:hover {
  background-color: aqua;
}

.idea-adjustment {
  font-size: 22px;
  cursor: pointer;
  position: relative;
}

.idea-adjustment-icon {
  padding: 20px;
}

/* .idea-adjustment-icon:hover .idea-adjustment-items {
  display: block;
} */

.idea-adjustment-items {
  list-style-type: none;
  min-width: 100px;
  height: 90px;
  top: -5%;
  left: 0%;
  position: absolute;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: right;
  color: black;
  line-height: 44px;
  border-radius: 5px;
  padding: 0;
  text-align: center;
  z-index: 1;
  margin: 0;
}

.idea-adjustment-item {
  margin-top: 0;
  font-size: 16px;
}

.idea-adjustment-item:hover {
  background-color: darksalmon;
  cursor: pointer;
  border-radius: 5px;
}
.img-topic {
  height: 200px;
  width: 200px;
  object-fit: contain;
}
@media (max-width: 960px) {
  .table-toolbar .search-input {
    max-width: 100%;
  }
}

@media (min-width: 741px) and (max-width: 790px) {
  .container,
  .container-md,
  .container-sm {
    max-width: 630px;
  }
}

@media (max-width: 740px) {
  .form-topic-detail-row,
  .form-topic-detail-row-Date {
    display: flex;
  }
  /* .idea-adjustment-items {
    top: -142%;
    left: -45%;
  } */
}

@media (min-width: 320px) and (max-width: 545px) {
  .container,
  .container-md,
  .container-sm {
    max-width: 430px;
  }
  .form-topic-detail-row-Date {
    flex-direction: column;
    align-items: center;
  }
  .content-topic .inputDate {
    width: 85% !important;
  }
  .btnSubmit {
    margin-right: 0px;
    float: none;
    width: 120px;
  }
  .content {
    overflow-x: scroll;
  }
  /* .idea-adjustment-items {
    top: -94%;
    left: -50%;
  } */
}
@media (min-width: 320px) and (max-width: 790px) {
  .pagination-container {
    bottom: 76px !important;
  }
}

.table-search-box {
  position: relative;
}

.table-search-box .fa-search {
  position: absolute;
  top: 20px;
  left: 20px;
}

.table-search-box input {
  padding-right: 35px;
}

.table-search-box span {
  position: absolute;
  right: 17px;
  top: 6px;
  padding: 2px;
}

.left-pan {
  padding-left: 7px;
}

.left-pan i {
  padding-left: 10px;
}

.form-idea-container {
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  text-align: left;
  display: inline-block;
  vertical-align: middle;
}

.custom-file-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
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
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
