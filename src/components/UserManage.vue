<template>
  <div class="user-man">
    <div class="user-man-header">
      <div class="user-man-header-search">
        <input type="text" placeholder="Search For User's Name" v-model="searchForm.name" />
        <select v-model="searchForm.departmentName">
          <option value="">All</option>
          <option v-for="department in Departments" :key="department.id" :value="department.name">{{ department.name }}</option>
        </select>
      </div>
      <div class="user-man-header-sort">
        <p>Sort By:</p>
        <select v-model="searchForm.sortType">
          <option value="0">Created Date</option>
          <option value="1">Name</option>
          <option value="2">Department</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="searchUsers">Search</button>
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
              ">
              View Details
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UserInfo @close="modalAct()" :modalActive="modalActive" :UserId="UserID" :got="got" />
</template>

<script>
import UserInfo from "./UserInfoModal.vue";
import { ref } from "vue";

export default {
  name: "UserManage",
  components: {
    UserInfo,
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
    };
  },
  methods: {
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
        console.log(this.searchForm);
        console.log(data);
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
    const got = ref(true);

    const modalAct = () => {
      modalActive.value = !modalActive.value;
    };

    const UserIDAct = (value) => {
      UserID.value = value;
    };

    return { modalActive, UserID, got, modalAct, UserIDAct };
  },
};
</script>

<style>
.user-man {
  position: relative;
  top: 60px;
  left: 20px;
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

.user-man-header-search select {
  border-top: 0;
  border-bottom: 0;
  border-right: 0;
  outline: 0;
  height: 40px;
}

.user-man-header-search input {
  width: 350px;
  height: 40px;
  padding: 5px;
  border: 2px solid black;
}
.user-man-header-search input:focus {
  border: 3px solid black !important;
}

.user-man-header-sort {
  display: flex;
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

@media (min-width: 740px) and (max-width: 1023px) {
  .user-man-content {
    overflow-x: scroll;
  }
  .user-man-header-search input {
    width: 80%;
    height: 30px;
  }
  .user-man-header-search select {
    /* width: 20%; */
    height: 30px;
  }
}
/* phone */

@media (max-width: 740px) {
  .user-man {
    width: 90%;
  }
  .user-man-header {
    flex-direction: column;
  }
  .user-man-header-search {
    margin-bottom: 10px;
  }
  .user-man-header-search input {
    width: 60%;
    height: 30px;
  }
  .user-man-header-search select {
    width: 40%;
    height: 30px;
  }
  .user-man-content {
    overflow-x: scroll;
  }
  .btn {
    margin-top: 8px;
  }
}
</style>
