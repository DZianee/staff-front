<template>
  <div class="container">
    <h1 class="container-title">Departments Management</h1>
    <div class="container-management">
      <button class="create-department" @click="Create">New Department +</button>
      <!-- <i class="bi bi-plus-circle" @click="Create"></i> -->
      <div class="container-content">
        <div style="overflow-x: auto">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Adjustment</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="department in Departments" :key="department.id">
                <td scope="col">{{ department.id }}</td>
                <td scope="col">{{ department.name }}</td>
                <td scope="col">
                  <ul>
                    <li>
                      <button type="button" class="btn btn-success" @click="Modify(department)">Modify</button>
                    </li>
                    <li>
                      <button type="button" class="btn btn-danger" @click="Delete(department)">Delete</button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="Departments.length > 0" class="pagination-container">
          <component :is="'pagination-list'" :totalPages="totalPage" :perPage="1" :currentPage="currentPage" @pagechanged="onPageChange"> </component>
        </div>
      </div>
    </div>
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
    <input v-if="ModifyID == 0 || ModifyID == 1" type="text" class="form-control" placeholder="Name" v-model="departmentName" />
    <p>
      {{ ModalConfirmText }}
      <span v-if="ModifyID == 1">
        <strong>{{ departmentModify.name }} </strong> to
      </span>
      <span v-if="departmentName">
        <strong>{{ departmentName }}</strong>
      </span>
      department?
    </p>
    <p v-if="ErrorName" style="color: red">There was an error, please check again</p>
    <br />
  </component>
</template>

<script>
export default {
  name: "DepartmentView",
  data() {
    return {
      Departments: [],

      currentPage: 1,
      totalPage: 1,

      departmentModify: {},
      departmentName: "",
      isOpenModal: false,
      ModalConfirmText: "",
      TitleConfirmText: "",
      ErrorName: false,
      ModifyID: 0,
      rotate: true,
    };
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
      this.GetDepartments();
    },
    closeModal() {
      this.isOpenModal = false;
      this.departmentModify = {};
      this.departmentName = "";
      this.ErrorName = false;
    },
    Create() {
      this.ModifyID = 0;
      this.TitleConfirmText = "Create department";
      this.ModalConfirmText = "You want to create this";
      this.isOpenModal = true;
    },
    Modify(value) {
      this.departmentModify = value;
      this.departmentName = this.departmentModify.name;
      this.ModifyID = 1;
      this.TitleConfirmText = "Modify department";
      this.ModalConfirmText = "You want to change this";
      this.isOpenModal = true;
    },
    Delete(value) {
      this.departmentModify = value;
      this.ModifyID = 2;
      this.TitleConfirmText = "Delete department";
      this.ModalConfirmText = "You want to delete this";
      this.isOpenModal = true;
    },
    async confirm() {
      if (this.rotate) {
        this.rotate = false;
        switch (this.ModifyID) {
          case 0:
            try {
              let res = await this.$axios.post(`api/v1/Department`, { name: this.departmentName });
              if (res.status == 200) {
                this.$router.go();
              }
            } catch (e) {
              console.log("Create Department error");
              this.ErrorName = true;
              this.rotate = true;
            }
            break;
          case 1:
            try {
              const res = await this.$axios.put(`api/v1/Department/${this.departmentModify.id}`, { name: this.departmentName });
              if (res.status == 200) {
                this.$router.go();
              }
            } catch (e) {
              console.log("Modify Department error");
              this.ErrorName = true;
              this.rotate = true;
            }
            break;
          case 2:
            try {
              const res = await this.$axios.delete(`api/v1/Department/${this.departmentModify.id}`);
              if (res.status == 200) {
                this.$router.go();
              }
            } catch (e) {
              console.log("Delete Department error");
              this.ErrorName = true;
              this.rotate = true;
            }
            break;
        }
      }
    },
    async GetDepartments() {
      try {
        const res = await this.$axios.get(`api/v1/Department`, {
          params: {
            PageSize: 6,
            CurrentPage: this.currentPage,
          },
        });
        if (res.status == 200) {
          this.Departments = res.data.content;
          this.totalPage = res.data.totalPage;
        }
      } catch (e) {
        console.log("Departments Error");
      }
    },
  },
  mounted() {
    this.GetDepartments();
  },
};
</script>

<style scoped>
.container {
  padding-top: 30px;
  right: -8.1%;
  width: calc(100% - 336px);
}
.container-management {
  position: relative;
  border: solid white;
}
.create-department {
  float: right;
  height: 35px;
  line-height: 10px;
  font-size: 16px;
  width: 16%;
  color: white;
  background: #3d5afe;
  font-weight: 500;
  cursor: pointer;
  padding: 10px;
  margin: 2% 5% 0 0;
  border-radius: 0.25rem;
}
.create-department:hover {
  background: #1976d2;
}
/* .bi-plus-circle {
  font-size: 34px;
  position: absolute;
  top: 0;
  right: 32px;
  cursor: pointer;
} */
.container-content {
  margin-top: 70px;
  position: relative;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 110px;
}
ul li {
  display: inline-block;
  margin: 0 4px;
}
td {
  width: 33%;
}
@media screen and (max-width: 1025px) {
  .container {
    width: calc(100% - 101px);
    right: -4%;
  }
  .create-department {
    font-size: 16px;
    width: 25%;
  }
}
@media screen and (max-width: 769px) {
  .container {
    width: calc(100% - 92px);
    right: -5%;
  }
  .table-light tr th {
    text-align: center;
  }
  tbody tr td {
    text-align: center;
  }
}
@media screen and (max-width: 480px) {
  .container {
    width: 100%;
    right: 0;
    top: 80px;
  }
  h1{
    text-align: center;
  }
  .create-department {
    width: 40%;
    margin: 5% 5% 0 0;
  }
}
@media screen and (max-width: 560px) {
  .container-content {
    padding-bottom: 120px;
  }
}
@media screen and (max-width: 480px) {
  .container-content {
    padding-bottom: 155px;
  }
}
</style>
