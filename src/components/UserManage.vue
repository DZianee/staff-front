<template>
  <div class="user-man container">
    <h1>User Management</h1>
    <div class="user-man-header">
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <div class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne">
              <i class="bx bx-sort bx-fw"></i>
            </button>
          </div>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <div class="sort-bar">
                <select v-model="searchForm.departmentName" class="form-select selectDepartment-sort-bar">
                  <option value="">All Department</option>
                  <option v-for="department in Departments" :key="department.id" :value="department.name">{{ department.name }}</option>
                </select>
                <div class="user-man-header-sort">
                  <p>By:</p>
                  <select v-model="searchForm.sortBy" class="form-select sortType">
                    <option value="0">Created Date</option>
                    <option value="1">Name</option>
                    <option value="2">Department</option>
                  </select>
                </div>
                <div class="user-man-header-sort">
                  <p>Type:</p>
                  <select v-model="searchForm.sortType" class="form-select sortType">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-menu">
        <select v-model="searchForm.departmentName" class="form-select selectDepartment">
          <option value="">All Department</option>
          <option v-for="department in Departments" :key="department.id" :value="department.name">{{ department.name }}</option>
        </select>
        <div class="user-man-header-sort">
          <p>By:</p>
          <select v-model="searchForm.sortBy" class="form-select sortType">
            <option value="0">Created Date</option>
            <option value="1">Name</option>
            <option value="2">Department</option>
          </select>
        </div>
        <div class="user-man-header-sort">
          <p>Type:</p>
          <select v-model="searchForm.sortType" class="form-select sortType">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <!-- <div
          class="create-icon"
          @click="
            CreateUserAct();
            DepartmentAct(Departments);
          ">
          <i class="bi bi-plus-circle"></i>
        </div> -->
      </div>
      <div class="user-man-header-search">
        <div class="table-search-box">
          <input type="text" class="form-control form-input" placeholder="Search anything..." v-model="searchForm.name" />

          <span class="left-pan"> <i class="form-control-feedback bi bi-search"></i></span>
        </div>
        <button
          class="create-user"
          @click="
            CreateUserAct();
            DepartmentAct(Departments);
          ">
          New User +
        </button>
      </div>
    </div>
    <div class="user-card">
      <div v-for="user in Users" :key="user.id">
        <div class="card">
          <div class="card-image">
            <img :src="`https://${user.profileImage}`" alt="User image" />
          </div>
          <div class="card-content" style="padding: 0">
            <div class="content">
              <h1>{{ user.firstname }} {{ user.lastname }}</h1>
              <div class="content-details">
                <span class="content-details-item">
                  <i class="bi bi-envelope"></i>
                  <p>{{ user.username }}</p>
                </span>
                <span class="content-details-item">
                  <i class="bi bi-telephone"></i>
                  <p>{{ user.phone }}</p>
                </span>
                <span class="content-details-item">
                  <i class="bi bi-person"></i>
                  <p>{{ user.role }}</p>
                </span>
              </div>
            </div>
          </div>
          <footer class="card-footer card-footerchange">
            <!-- <p class="card-footer-item total-ideas">{{ topic.totalIdea }} ideas</p> -->
            <button
              class="btn btn-success"
              @click="
                modalAct();
                UserIDAct(user.id);
                DepartmentAct(Departments);
              ">
              View Details
            </button>
          </footer>
        </div>
      </div>
    </div>
    <div v-if="Users.length > 0" class="pagination-container pagination">
      <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange"> </component>
    </div>
  </div>
  <UserInfo @close="modalAct()" :modalActive="modalActive" :UserId="UserID" :Departments="DepartmentsList" />
  <CreateUser @closeCreate="CreateUserAct()" :CreateModalActive="CreateModalActive" :Departments="DepartmentsList" />
</template>

<script>
import UserInfo from "./UserInfoModal.vue";
import CreateUser from "./UserCreateModal.vue";
import { ref } from "vue";
var timeOut;

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
        sortBy: 0,
        sortType: "asc",
      },

      currentPage: 1,
      totalPage: 1,
      isHidden: true,
    };
  },
  watch: {
    searchForm: {
      handler() {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
          this.GetUsers();
        }, 1000);
      },
      deep: true,
    },
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
      this.GetUsers();
    },
    async GetUsers() {
      try {
        this.$store.dispatch("fetchAccessToken");
        var data;
        switch (parseInt(this.searchForm.sortBy)) {
          case 0:
            data = {
              searchName: this.searchForm.name,
              filterDepartmentName: this.searchForm.departmentName,
              sortCreatedDate: this.searchForm.sortType,
            };
            break;
          case 1:
            data = {
              searchName: this.searchForm.name,
              filterDepartmentName: this.searchForm.departmentName,
              sortName: this.searchForm.sortType,
            };
            break;
          case 2:
            data = {
              searchName: this.searchForm.name,
              filterDepartmentName: this.searchForm.departmentName,
              sortDepartment: this.searchForm.sortType,
            };
            break;
          default:
            break;
        }
        const res = await this.$axios.post(`api/v1/User/getlist`, data, {
          params: {
            PageSize: 6,
            CurrentPage: this.currentPage,
          },
        });
        this.Users = res.data.content;
        this.totalPage = res.data.totalPage;
      } catch (e) {
        console.log("Error");
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

<style scoped>
h1 {
  padding: 10px;
}
.user-man {
  height: fit-content;
  /* left: 46%;
  transform: translateX(-50%);
  width: 80%; */
}
.user-man-header {
  display: flex;
  justify-content: space-evenly;
  /* align-items: center; */
  /* border: solid; */
  padding: 5px 0;
  border-top: solid lightgrey;
  border-bottom: solid lightgrey;
}
/* .sort-icon {
  position: relative;
  display: none;
} */
.accordion {
  position: relative;
  width: 60px;
  height: fit-content;
  display: none;
}
.accordion-button {
  padding: 10px 7px;
}
.sort-bar {
  position: absolute;
  width: 270px;
  border: solid gray;
  top: 42px;
  border-radius: 5%;
  left: 0px;
  z-index: 1;
  background: #eaeaea;
  padding: 10px;
  /* display: none; */
}
.sort-bar select,
.sort-bar .user-man-header-sort {
  margin: 7px 10px;
}
.header-menu {
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  align-items: center;
}
.table-search-box {
  position: relative;
}
.create-icon {
  font-size: 34px;
  cursor: pointer;
  color: white;
  /* display: none; */
}
.create-user {
  height: 35px;
  line-height: 10px;
  font-size: 16px;
  width: 50%;
  color: white;
  background: #3d5afe;
  font-weight: 500;
  cursor: pointer;
  padding: 10px;
  border-radius: 0.25rem;
}
.create-user:hover {
  background: #1976d2;
}
.selectDepartment-sort-bar {
  width: 90%;
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
.bi-plus-circle::before {
  background-color: #3d5afe;
  border-radius: 50%;
}

.user-man-header-search {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  /* margin-right: 20px; */
}

.sortType {
  width: 160px !important;
}

.selectDepartment {
  width: 25% !important;
  height: 38px;
  margin-top: 0%;
}

.user-man-header-sort {
  display: flex;
  align-items: center;
}

.user-man-header-sort p {
  margin-right: 6px;
}

/* .user-man-content {
  margin-top: 26px;
} */
.user-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 40px;
  row-gap: 80px;
  padding: 50px 0;
  margin: auto;
  /* background: #e1f5fe; */
  /* border-radius: 15px; */
}

.user-card .card {
  width: max(322px);
  height: fit-content;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
  overflow: hidden;
  text-align: center;
  left: 10%;
}
.user-card .card:hover {
  box-shadow: 0 0 7px 2px #29b6f6;
}
.card-content h1 {
  font-size: 20px;
  height: 22.5px;
  text-overflow: ellipsis;
  padding: 15px;
}
.content-details {
  /* text-align: left; */
  padding: 0 50px;
  margin-top: 12px;
  font-weight: 600;
  line-height: 35px;
}
.content-details-item {
  display: flex;
  align-items: center;
}
.content-details-item i {
  margin-right: 14px;
}
.card-image {
  margin-top: 6px;
}
.card-image img {
  width: 80px;
  height: 80px;
  border-radius: 50% !important;
  object-fit: cover;
}
.card-footerchange {
  background-color: white !important;
  border-top: none !important;
  display: block;
}
.pagination {
  bottom: 0px;
}
@media screen and (max-width: 1440px) {
  .user-card {
    row-gap: 70px;
    width: 90%;
  }
  .user-card .card {
    left: 3%;
  }
}
@media screen and (max-width: 1366px) {
  .user-card {
    row-gap: 70px;
    /* padding: 0 0; */
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
  .user-card .card {
    left: 0%;
    width: 310px;
  }
  .pagination {
    bottom: 0px;
  }
}
@media screen and (max-width: 1280px) {
  .user-man-header-search input {
    width: 168px;
  }
  .user-card {
    display: grid;
    grid-template-columns: repeat(3, 30%);
    /* column-gap: 50px; */
  }
  .card {
    /* width: 355px; */
  }
  .content-details {
    /* text-align: left; */
    padding: 0 25px;
  }
  .user-man-header-sort {
    display: flex;
    align-items: center;
    width: 150px;
  }
  .create-user {
    width: 120px;
  }
}
@media screen and (max-width: 1025px) {
  .user-card {
    display: grid;
    grid-template-columns: repeat(2, 47%);
    column-gap: 30px;
    /* row-gap: 100px; */
    padding-left: 10%;
  }
  .card {
    width: 355px;
    height: 268px;
  }
}
/* Tablet */

@media (max-width: 940px) {
  h1 {
    font-size: 30px;
  }
  .user-man-header {
    justify-content: space-between;
  }
  .sort-icon i {
    line-height: 30px;
  }
  .header-menu {
    display: none;
  }
  .user-man-header-search input {
    width: 170px;
  }
  .user-card {
    padding-left: 2%;
  }
  .accordion {
    display: block;
  }
}

@media (min-width: 740px) and (max-width: 939px) {
  /* .user-man-content {
    overflow-x: scroll;
  } */
}
/* phone */

@media screen and (max-width: 780px) {
  .user-card {
    display: grid;
    grid-template-columns: repeat(2, 47%);
  }
}

@media (max-width: 740px) {
  /* .user-man {
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
  } */
  /* .user-man-content {
    overflow-x: scroll;
  } */
}
@media (max-width: 620px) {
  .user-card {
    grid-template-columns: 100%;
    row-gap: 60px;
    padding: 50px 17%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .user-card {
    display: grid;
    grid-template-columns: 100%;
    row-gap: 60px;
    width: 100%;
    padding: 50px 14%;
  }
  .card {
    width: 100%;
  }
  h1 {
    text-align: center;
    padding-bottom: 20px;
  }
  .user-man {
    margin-bottom: 200px;
  }
}
</style>
