<template>
  <transition>
    <div class="UserInfo-Modal" v-if="modalActive">
      <span class="UserInfo-Modal-backdrop" @click="close"></span>
      <div class="UserInfo-Modal-container">
        <div class="UserInfo-Modal-close" @click="close">
          <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
        </div>
        <header class="UserInfo-Modal-header">
          <button class="btn btn-primary" style="margin-right: 10px" :disabled="Disable" @click="infoDetail">Detail</button>
          <button class="btn btn-primary" style="margin-right: 10px" @click="editDetail">Edit</button>
          <button class="btn btn-primary">Delete</button>
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
                <select class="form-control" :disabled="Disable" v-model="User.Gender">
                  <option value="0" :selected="User.Gender == 0">Male</option>
                  <option value="1" :selected="User.Gender == 1">Female</option>
                  <option value="2" :selected="User.Gender == 2">Other</option>
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
                <input type="text" class="form-control" placeholder="Department" :disabled="Disable" v-model="User.department" />
              </div>
              <div class="form-group col-md-6">
                <label>Phone</label>
                <input type="text" @keypress="isNumber($event)" class="form-control" placeholder="Phone" :disabled="Disable" v-model="User.phone" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 checkboxFlex">
                <input type="checkbox" style="margin-right: 10px" :disabled="Disable" :checked="User.active" />
                <label>IsActive</label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px" :disabled="Disable" @click="edit">Change</button>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
var got = false;

export default {
  name: "UserInfoForm",
  data() {
    return {
      User: {},
      Disable: true,
      ErrorDisable: false,
      DoB: "",
    };
  },

  props: {
    modalActive: Boolean,
    UserId: String,
  },
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
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

    async edit() {
      this.$store.dispatch("fetchAccessToken");
      const date = Date.parse(this.DoB);
      const editUser = {
        password: null,
        phone: this.User.phone,
        address: this.User.address,
        dob: date,
        gender: 0,
        departmentId: this.User.department,
        isActive: true,
      };
      console.log(editUser);
      // const res = await this.$axios.put(`api/v1/User?id=${this.UserId}`, editUser, this.$axios.defaults.headers["Authorization"]);
    },
  },
  beforeUpdate() {
    this.User = {};
    got = !got;
  },
  updated() {
    if (got) {
      this.getUserDetail();
    }
  },
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
  width: 414px;
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
  width: 250px;
  height: 30px;
  left: calc(50% - 250px / 2);
  top: 20px;
  text-align: center;
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
  margin-top: 55px;
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
.UserInfo-Modal-body {
  margin-top: 90px !important;
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
  width: 100%;
  margin: 8px;
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
  }

  .UserInfo-Modal-header {
    position: absolute;
    width: 250px;
    height: 20px;
    left: calc(50% - 250px / 2);
    top: 20px;
    text-align: center;
  }

  .UserInfo-Modal-header p {
    font-size: 20px;
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
}
</style>
