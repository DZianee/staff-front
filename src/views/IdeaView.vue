<template>
  <div class="container" style="overflow: unset; padding-bottom: 50px">
    <h1 class="container-title">Topic Details</h1>
    <div class="content content-topic">
      <form>
        <h2 class="container-title">Information</h2>
        <div class="form-row form-topic-detail-row">
          <div class="form-group col-md-6 form-topic-detail-group">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="topic.Name" />
          </div>
          <div class="form-group col-md-6 form-topic-detail-group">
            <label>Status</label>
            <select class="form-control" v-model="topic.Status">
              <option value="Open" :selected="topic.Status == 'Open'">Open</option>
              <option value="Close Idea" :selected="topic.Status == 'Close Idea'">Close Idea</option>
              <option value="Close" :selected="topic.Status == 'Close'">Close</option>
            </select>
          </div>
        </div>
        <div class="AddressInput">
          <label>Description</label>
          <input type="text" class="form-control" placeholder="Description" v-model="topic.Description" />
        </div>
        <h2 class="container-title">Timeline</h2>
        <div class="form-row form-topic-detail-row-Date">
          <div class="form-group col-md-6 inputDate">
            <label>Start date</label>
            <input type="datetime-local" class="form-control" :disabled="true" v-model="topic.Startdate" />
          </div>
          <div class="form-group col-md-6 inputDate">
            <label>Idea closing date</label>
            <input type="datetime-local" class="form-control" v-model="topic.IdeaCloseDate" />
          </div>
          <div class="form-group col-md-6 inputDate">
            <label>Closure date</label>
            <input type="datetime-local" class="form-control" v-model="topic.ClosureDate" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary btnSubmit" @click="onChange(topic.Id)">Change</button>
      </form>
    </div>
    <component
      :is="'confirm-modal'"
      v-if="isOpenModal"
      :title="TitleConfirmText"
      :ConfirmModalActive="isOpenModal"
      confirmText="Agree"
      @submitModal="confirm"
      @closeModal="closeModal">
      <p>{{ ModalConfirmText }}</p>
      <br />
    </component>
  </div>
  <div class="container">
    <h1 class="container-title">Ideas Management</h1>
    <div class="content">
      <div class="table-toolbar d-flex justify-content-end">
        <div class="table-search-box">
          <input type="text" class="form-control form-input" placeholder="Search anything..." />
          <span class="left-pan"> <i class="form-control-feedback bi bi-search"></i></span>
        </div>
      </div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" :class="{ Sorttarget: sortSelected == 1 }" style="cursor: pointer" @click="sortBy(1)"><a>Title</a></th>
            <th scope="col" :class="{ Sorttarget: sortSelected == 2 }" style="cursor: pointer" @click="sortBy(2)"><a>By</a></th>
            <th scope="col" :class="{ Sorttarget: sortSelected == 0 }" style="cursor: pointer" @click="sortBy(0)"><a>Created Date</a></th>
            <th scope="col">Adjustment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="idea in ideas" :key="idea.id">
            <th scope="row">{{ idea.title }}</th>
            <td>{{ idea.topicName }}</td>
            <td>{{ idea.startDate }}</td>
            <td class="idea-adjustment">
              <i class="bi bi-gear idea-adjustment-icon">
                <ul class="idea-adjustment-items">
                  <li class="idea-adjustment-item" style="border-bottom: 2px solid black">Detail</li>
                  <!-- <li class="idea-adjustment-item" style="border-bottom: 2px solid black">Modify</li> -->
                  <li class="idea-adjustment-item" @click="onDelete(idea.id)">Delete</li>
                </ul>
              </i>
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
    <div class="pagination-container">
      <component :is="'pagination-list'" :totalPages="5" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange"> </component>
    </div>
    <component
      :is="'confirm-modal'"
      v-if="isOpenModal"
      :title="TitleConfirmText"
      :ConfirmModalActive="isOpenModal"
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

var ModifyID;
export default {
  components: {
    // IdeaInfoModal,
  },
  data() {
    return {
      isActiveModal: false,
      topic: {
        Id: "",
        Name: "",
        Status: "",
        Description: "",
        Startdate: undefined,
        IdeaCloseDate: undefined,
        ClosureDate: undefined,
      },
      ideas: [],
      currentIdea: null,
      currentPage: 1,
      isOpenModal: false,
      ModalConfirmText: "",
      TitleConfirmText: "",

      sortSelected: 0,
    };
  },
  methods: {
    onPageChange(page) {
      console.log(page);
      this.currentPage = page;
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
    async getTopicDetails() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const resTopic = await this.$axios.get(`api/v1/Topic/${this.$route.params.id}`, this.$axios.defaults.headers["Authorization"]);
        if (resTopic.status == 200) {
          const data = resTopic.data.content;
          this.topic.Id = data.id;
          this.topic.Name = data.name;
          this.topic.Status = data.status;
          this.topic.Description = data.description;
          this.topic.Startdate = dateConvert(data.startDate);
          this.topic.IdeaCloseDate = dateConvert(data.closeIdeaDate);
          this.topic.ClosureDate = dateConvert(data.closureDate);
        }

        const resIdea = await this.$axios.get(`api/v1/Idea/topic/${this.$route.params.id}`, this.$axios.defaults.headers["Authorization"]);
        if (resIdea.status == 200) {
          this.ideas = resIdea.data.content.content;
          this.ideas.forEach(startDateConvert);
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
        if (date.getMonth() < 10) {
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
        let DateConverted = date.getFullYear() + "-" + month + "-" + dateVal + "T" + hour + ":" + minute;
        return DateConverted;
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
        if (date.getMonth() < 10) {
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
    async sortBy(value) {
      try {
        this.$store.dispatch("fetchAccessToken");
        const sortType = { sortType: value };
        console.log(sortType);
        this.sortSelected = value;
      } catch {
        //
      }
    },
    async confirm() {
      switch (ModifyID) {
        case 0:
          try {
            // this.$store.dispatch("fetchAccessToken");
            // const date = Date.parse(this.DoB);
            // const editUser = {
            //   phone: this.User.phone,
            //   address: this.User.address,
            //   dob: date,
            //   gender: parseInt(this.User.gender),
            //   departmentId: this.DepartmentID,
            //   isActive: this.User.active,
            // };
            // console.log(editUser);
            // const res = await this.$axios.put(`api/v1/User/${this.UserId}`, editUser, this.$axios.defaults.headers["Authorization"]);
            // if (res.status == 200) {
            //   this.$router.go();
            // }
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
  },
};
</script>
<style scoped>
.Sorttarget {
  background-color: coral;
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
  background-color: #00000012;
  border-radius: 10px;
  margin-top: 20px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 26px;
}

.container-title {
  text-align: left;
  font-style: italic;
}

.content-topic label {
  text-align: left;
  padding-left: 10px;
  font-size: 12px;
  margin-bottom: 4px;
}

.content-topic h2 {
  font-size: 32px;
  font-weight: 500;
  text-decoration: underline;
  padding-left: 16px;
}

.content-topic .inputDate {
  width: 30% !important;
}

.AddressInput {
  width: 96%;
  margin: 0px auto 20px;
}

.btnSubmit {
  margin-top: 10px !important;
  margin-right: 16px;
  float: right;
  width: 120px;
  font-size: 16px !important;
  font-weight: bold !important;
}

.content table td,
.content table th {
  vertical-align: middle;
}

.idea-adjustment {
  font-size: 22px;
  cursor: pointer;
  position: relative;
}

.idea-adjustment-icon {
  padding: 20px;
}

.idea-adjustment-icon:hover .idea-adjustment-items {
  display: block;
}

.idea-adjustment-items {
  list-style-type: none;
  display: none;
  min-width: 120px;
  height: 90px;
  top: 4%;
  left: 24%;
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
  .form-topic-detail-group {
    width: 46% !important;
    margin: 10px 0;
  }
  .idea-adjustment-items {
    top: -142%;
    left: -45%;
  }
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
  .idea-adjustment-items {
    top: -94%;
    left: -50%;
  }
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
</style>
