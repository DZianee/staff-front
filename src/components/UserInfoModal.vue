<template>
  <transition>
    <div class="UserInfo-Modal" v-if="modalActive">
      <span class="UserInfo-Modal-backdrop" @click="close"></span>
      <div class="UserInfo-Modal-container">
        <div class="UserInfo-Modal-close" @click="close">
          <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
        </div>
        <header class="UserInfo-Modal-header">
          <button class="btn btn-primary btn-mar-right" @click="infoDetail">Detail</button>
          <button class="btn btn-primary btn-mar-right" @click="editDetail">Edit</button>
          <button class="btn btn-primary btn-mar-right" @click="ResetsubmitModal">Reset Password</button>
          <button class="btn btn-primary" @click="DeletesubmitModal">Delete</button>
          <p>User Details</p>
        </header>
        <div class="UserInfo-Modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>FirstName</label>
                <input type="text" class="form-control" placeholder="FirstName" :disabled="Disable" v-model="User.firstname" />
              </div>
              <div class="form-group col-md-6">
                <label>LastName</label>
                <input type="text" class="form-control" placeholder="LastName" :disabled="Disable" v-model="User.lastname" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Gender</label>
                <select class="form-control" :disabled="Disable" v-model="User.gender">
                  <option value="0" :selected="User.gender == 0">Male</option>
                  <option value="1" :selected="User.gender == 1">Female</option>
                  <option value="2" :selected="User.gender == 2">Other</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label>Date of Birth</label>
                <input type="date" class="form-control" placeholder="Date of Birth" :disabled="Disable" v-model="DoB" />
              </div>
            </div>
            <div>
              <label>Address</label>
              <input type="text" class="form-control" placeholder="Address" :disabled="Disable" v-model="User.address" />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Department</label>
                <select :disabled="Disable" v-model="User.department" class="form-control" @change="changeDepartment()">
                  <option
                    v-for="department in Departments"
                    :key="department.id"
                    :value="department.name"
                    :selected="User.department == department.name">
                    {{ department.name }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label>Phone</label>
                <input
                  type="text"
                  maxlength="10"
                  @keypress="isNumber($event)"
                  class="form-control"
                  placeholder="Phone"
                  :disabled="Disable"
                  v-model="User.phone" />
              </div>
            </div>
            <div class="form-group col-md-6 checkboxFlex">
              <input type="checkbox" style="margin-right: 10px" :disabled="Disable" :checked="User.active" v-model="User.active" />
              <label>IsActive</label>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              style="margin-top: 10px"
              v-if="Disable == false"
              :disabled="Disable"
              @click="EditsubmitModal">
              Change
            </button>
          </form>
        </div>
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
  </transition>
</template>

<script>
// var got = false;
// import ConfirmModal from "@/components/Modal.vue";

export default {
  name: "UserInfoForm",
  // components: [ConfirmModal],
  data() {
    return {
      User: {},
      Disable: true,
      DoB: "",
      PasswordDis: true,
      DepartmentID: null,
      ModalConfirmText: "",
      TitleConfirmText: "",
      ModifyID: 0,
      isOpenModal: false,
    };
  },

  props: {
    modalActive: Boolean,
    UserId: String,
    Departments: Array,
  },
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
  watch: {
    UserId() {
      this.User = {};
      this.Disable = true;
      this.getUserDetail();
    },
  },
  methods: {
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    changeDepartment() {
      for (let i = 0; i < this.Departments.length; i++) {
        if (this.User.department == this.Departments[i].name) {
          this.DepartmentID = this.Departments[i].id;
          break;
        }
      }
    },
    async getUserDetail() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const res = await this.$axios.get(`api/v1/User/${this.UserId}`, this.$axios.defaults.headers["Authorization"]);
        this.User = res.data.content;

        var timeStamp = this.User.dob.toString();
        if (timeStamp.length < 13) {
          for (var i = timeStamp.length; i < 13; i++) {
            timeStamp += "0";
          }
        }
        const date = new Date(parseInt(timeStamp));
        var month;
        var dateVal;
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
        this.DoB = date.getFullYear() + "-" + month + "-" + dateVal;
      } catch (e) {
        //
      }
    },
    infoDetail() {
      this.Disable = true;
    },
    editDetail() {
      this.Disable = false;
    },
    closeModal() {
      this.isOpenModal = false;
    },
    EditsubmitModal() {
      this.ModalConfirmText = "You want to Edit this user?";
      this.TitleConfirmText = "Edit User";
      this.ModifyID = 0;
      this.isOpenModal = true;
    },
    ResetsubmitModal() {
      this.ModalConfirmText = "You want to Reset this user's password?";
      this.TitleConfirmText = "Reset User's Password";
      this.ModifyID = 1;
      this.isOpenModal = true;
    },
    DeletesubmitModal() {
      this.ModalConfirmText = "You want to Delete this user?";
      this.TitleConfirmText = "Delete User";
      this.ModifyID = 2;
      this.isOpenModal = true;
    },
    async confirm() {
      switch (this.ModifyID) {
        case 0:
          try {
            this.$store.dispatch("fetchAccessToken");
            const date = Date.parse(this.DoB);
            const editUser = {
              phone: this.User.phone,
              address: this.User.address,
              dob: date,
              gender: parseInt(this.User.gender),
              departmentId: this.DepartmentID,
              isActive: this.User.active,
            };
            console.log(editUser);
            const res = await this.$axios.put(`api/v1/User/${this.UserId}`, editUser, this.$axios.defaults.headers["Authorization"]);
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
            const res = await this.$axios.post(`api/v1/User/${this.UserId}/resetPassword`, this.$axios.defaults.headers["Authorization"]);
            if (res.status == 200) {
              this.$router.go();
            }
          } catch {
            //
          }
          break;
        case 2:
          try {
            this.$store.dispatch("fetchAccessToken");
            const res = await this.$axios.delete(`api/v1/User/${this.UserId}`, this.$axios.defaults.headers["Authorization"]);
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
  // beforeUpdate() {
  //   this.User = {};
  //   got = !got;
  //   this.Disable = true;
  // },
  // updated() {
  //   if (got == true) {
  //     this.getUserDetail();
  //   }
  // },
};
</script>

<style>
.disable {
  opacity: 0.5;
  pointer-events: none;
}
.UserInfo-Modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.UserInfo-Modal-backdrop {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.UserInfo-Modal-container {
  position: relative;
  width: 466px;
  max-width: calc(100% - 32px);
  min-height: 200px;
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

.UserInfo-Modal-header {
  position: absolute;
  width: 80%;
  height: 30px;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  text-align: center;
}

.btn-mar-right {
  margin-right: 10px;
}

.UserInfo-Modal-header p {
  font-size: 26px;
}

.UserInfo-Modal-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  cursor: pointer;
  font-size: 20px;
}

.UserInfo-Modal-body {
  padding: 16px;
  margin-top: 90px;
}

.UserInfo-Modal-label {
  display: block;
  font-size: 15px;
  margin-bottom: 6px;
  text-align: left;
}

.UserInfo-Modal-input {
  border: 1px solid #ccc;
  background-color: #c4c4c4;
  border-radius: 9px;
  width: 100%;
  padding: 10px;
  font-size: 15px;
  margin-bottom: 10px;
}

.UserInfo-Modal-body label {
  font-size: 12px;
}
.form-row {
  display: flex;
}
.form-group {
  width: 50%;
}
.checkboxFlex {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
}

@media (max-width: 740px) {
  .UserInfo-Modal-container {
    position: relative;
    width: 414px;
    max-width: calc(100% - 32px);
    height: 480px;
    background-color: white;
    border-radius: 5px;
    animation: modalfadein ease 0.3s;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 26px;
    z-index: 2;
    overflow-y: scroll;
  }

  .UserInfo-Modal-header {
    height: 20px;
    top: 10px;
    text-align: center;
  }

  .UserInfo-Modal-header p {
    display: none;
  }

  .UserInfo-Modal-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;
    cursor: pointer;
    font-size: 20px;
  }

  .UserInfo-Modal-body {
    padding: 16px;
    margin-top: 40px;
  }

  .UserInfo-Modal-label {
    display: block;
    font-size: 15px;
    margin-bottom: 2px;
    text-align: left;
  }

  .UserInfo-Modal-input {
    border: 1px solid #ccc;
    background-color: #c4c4c4;
    border-radius: 9px;
    width: 100%;
    height: 32px;
    padding: 5px;
    font-size: 15px;
    margin-bottom: 4px;
  }

  .form-row {
    display: block;
  }
  .form-group {
    width: 100%;
  }
  .btn-mar-right {
    margin-right: 2px;
  }
}
</style>
