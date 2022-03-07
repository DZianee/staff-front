<template>
  <div class="user-man">
    <div class="user-man-header">
      <div class="user-man-header-search">
        <div class="table-search-box">
          <input type="text" class="form-control form-input" placeholder="Search anything..." v-model="searchForm.name" />
        </div>
      </div>
      <select v-model="searchForm.departmentName" class="form-select selectDepartment">
        <option value="">All</option>
        <option v-for="department in Departments" :key="department.id" :value="department.name">{{ department.name }}</option>
      </select>
      <div class="user-man-header-sort">
        <p>Sort By:</p>
        <select v-model="searchForm.sortType" class="form-select selectDepartment">
          <option value="0">Created Date</option>
          <option value="1">Name</option>
          <option value="2">Department</option>
        </select>
      </div>
      <button
        class="btn btn-primary"
        @click="
          CreateUserAct();
          DepartmentAct(Departments);
        ">
        Create
      </button>
    </div>
    <div class="user-man-content">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">FullName</th>
            <th scope="col">Role</th>
            <th scope="col">Department</th>
            <th scope="col">IsActive</th>
          </tr>
        </thead>
        <tbody v-for="user in Users" :key="user.id">
          <tr>
            <td>{{ user.username }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.active }}</td>
            <td
              class="UserDetail"
              @click="
                modalAct();
                UserIDAct(user.id);
                DepartmentAct(Departments);
              ">
              View Details
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UserInfo @close="modalAct()" :modalActive="modalActive" :UserId="UserID" :Departments="DepartmentsList" />
  <CreateUser @closeCreate="CreateUserAct()" :CreateModalActive="CreateModalActive" :Departments="DepartmentsList" />
  <div class="pagination-container">
    <component :is="'pagination-list'" :totalPages="10" :perPage="10" :currentPage="currentPage" @pagechanged="onPageChange"> </component>
  </div>
</template>

<script>
import UserInfo from "./UserInfoModal.vue";
import CreateUser from "./UserCreateModal.vue";
import { ref } from "vue";

export default {
  name: "UserManage",
  components: {
    UserInfo,
    CreateUser,
  },
  data() {
    return {
      Users: [],
      Departments: [],
      searchForm: {
        name: "",
        departmentName: "",
        sortType: 0,
      },

      currentPage: 1,
    };
  },
  watch: {
    searchForm: {
      handler(newValue) {
        console.log(newValue.name);
        this.searchUsers();
      },
      deep: true,
    },
  },
  methods: {
    onPageChange(page) {
      console.log(page);
      this.currentPage = page;
    },
    async GetUsers() {
      try {
        this.$store.dispatch("fetchAccessToken");
        // const data = { name: "", departmentName: "", sortType: 0 };
        const res = await this.$axios.post(`api/v1/User/getlist`, this.searchForm, this.$axios.defaults.headers["Authorization"]);
        this.Users = res.data.content;
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
    async searchUsers() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const data = { name: this.searchForm.name, departmentName: this.searchForm.departmentName, sortType: parseInt(this.searchForm.sortType) };
        const res = await this.$axios.post(`api/v1/User/getlist`, data, this.$axios.defaults.headers["Authorization"]);
        this.Users = res.data.content;
      } catch (e) {
        //
      }
    },
  },
  mounted() {
    this.GetUsers();
    this.GetDepartments();
  },
  setup() {
    const modalActive = ref(false);
    const UserID = ref("");
    const DepartmentsList = ref([]);
    const CreateModalActive = ref(false);

    const modalAct = () => {
      modalActive.value = !modalActive.value;
    };

    const UserIDAct = (value) => {
      UserID.value = value;
    };

    const DepartmentAct = (value) => {
      if (DepartmentsList.value == "") {
        for (let i = 0; i < value.length; i++) {
          DepartmentsList.value.push(value[i]);
        }
      }
    };

    const CreateUserAct = () => {
      CreateModalActive.value = !CreateModalActive.value;
    };

    return { modalActive, UserID, DepartmentsList, CreateModalActive, modalAct, UserIDAct, DepartmentAct, CreateUserAct };
  },
};
</script>

<style>
.user-man {
  position: relative;
  top: 60px;
  left: 46%;
  transform: translateX(-50%);
  width: 80%;
}

.user-man-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.user-man-header-search {
  display: flex;
  align-items: center;
  /* margin-right: 20px; */
}

.selectDepartment {
  width: 160px !important;
}

.user-man-header-sort {
  display: flex;
  align-items: center;
}

.user-man-header-sort p {
  margin-right: 6px;
}

.user-man-content {
  margin-top: 18px;
}

.UserDetail:hover {
  background-color: aqua;
  cursor: pointer;
}

@media (min-width: 1024px) {
}
/* Tablet */

@media (max-width: 940px) {
  .user-man-header {
    flex-direction: column;
  }
  .selectDepartment {
    margin-bottom: 8px;
  }
  .user-man-header-search {
    margin-bottom: 10px;
  }
  .user-man-header-search input {
    height: 30px;
  }
  .selectDepartment {
    margin-bottom: 8px;
  }
  .btn {
    margin-top: 8px;
  }
}

@media (min-width: 740px) and (max-width: 939px) {
  .user-man-content {
    overflow-x: scroll;
  }
}
/* phone */

@media (max-width: 740px) {
  .user-man {
    left: 50%;
    width: 90%;
  }
  .user-man-content {
    overflow-x: scroll;
    overflow-y: scroll;
  }
}
</style>
