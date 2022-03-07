<template>
  <transition>
    <div class="UserInfo-Modal" v-if="CreateModalActive">
      <span class="UserInfo-Modal-backdrop" @click="closeCreate"></span>
      <div class="UserInfo-Modal-container">
        <div class="UserInfo-Modal-close" @click="closeCreate">
          <i class="bi form-control-feedback bi-x-lg" style="font-size: 22px"></i>
        </div>
        <header class="UserCreate-Modal-header">
          <p>User Details</p>
        </header>
        <div class="UserInfo-Modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>FirstName</label>
                <input type="text" class="form-control" placeholder="FirstName" v-model="User.firstname" />
              </div>
              <div class="form-group col-md-6">
                <label>LastName</label>
                <input type="text" class="form-control" placeholder="LastName" v-model="User.lastname" />
              </div>
            </div>
            <div>
              <label>Username</label>
              <input type="email" class="form-control" placeholder="Username" v-model="User.username" />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Gender</label>
                <select class="form-control" v-model="User.gender">
                  <option value="0" :selected="User.gender == 0">Male</option>
                  <option value="1" :selected="User.gender == 1">Female</option>
                  <option value="2" :selected="User.gender == 2">Other</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label>Date of Birth</label>
                <input type="date" class="form-control" placeholder="Date of Birth" v-model="User.dob" />
              </div>
            </div>
            <div>
              <label>Address</label>
              <input type="text" class="form-control" placeholder="Address" v-model="User.address" />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Department</label>
                <select v-model="User.departmentId" class="form-control">
                  <option v-for="department in Departments" :key="department.id" :value="department.id">
                    {{ department.name }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label>Phone</label>
                <input type="text" maxlength="10" @keypress="isNumber($event)" class="form-control" placeholder="Phone" v-model="User.phone" />
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px" @click="openModal">Create</button>
          </form>
        </div>
      </div>
      <component
        :is="'confirm-modal'"
        v-if="isOpenModal"
        title="Create user"
        :ConfirmModalActive="isOpenModal"
        confirmText="Agree"
        @submitModal="CreateUser"
        @closeModal="closeModal">
        <p>You want to create a new user ?</p>
        <br />
      </component>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CreateUserModal",
  data() {
    return {
      User: {
        username: "",
        phone: "",
        address: "",
        firstname: "",
        lastname: "",
        dob: null,
        gender: 0,
        departmentId: "",
      },
      isOpenModal: false,
    };
  },

  props: {
    CreateModalActive: Boolean,
    Departments: Array,
  },
  setup(props, { emit }) {
    const closeCreate = () => {
      emit("closeCreate");
    };
    return { closeCreate };
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
    openModal() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
    },
    async CreateUser() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const date = Date.parse(this.User.dob);
        const createUser = {
          username: this.User.username,
          firstname: this.User.firstname,
          lastname: this.User.lastname,
          phone: this.User.phone,
          address: this.User.address,
          dob: date,
          gender: parseInt(this.User.gender),
          departmentId: this.User.departmentId,
        };
        console.log(createUser);
        const res = await this.$axios.post(`api/v1/User`, createUser, this.$axios.defaults.headers["Authorization"]);
        if (res.status == 200) {
          this.$router.go();
        }
      } catch {
        //
      }
    },
  },
};
</script>

<style>
.UserCreate-Modal-header {
  position: absolute;
  width: 80%;
  height: 30px;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  text-align: center;
}

.UserCreate-Modal-header p {
  font-size: 26px;
}

@media (max-width: 740px) {
  .UserCreate-Modal-header {
    height: 20px;
    top: 10px;
    text-align: center;
  }
}
</style>
