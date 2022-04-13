<template>
  <div class="container">
    <h1 class="container-title">Roles Management</h1>
    <div class="container-management">
      <button class="create-role" @click="Create">New role +</button>
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
              <tr v-for="role in Roles" :key="role.id">
                <td scope="col">{{ role.id }}</td>
                <td scope="col">{{ role.name }}</td>
                <td scope="col">
                  <ul>
                    <li>
                      <button type="button" class="btn btn-success" @click="Modify(role)">Modify</button>
                    </li>
                    <li>
                      <button type="button" class="btn btn-danger" @click="Delete(role)">Delete</button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="Roles.length > 0" class="pagination-container">
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
    <input v-if="ModifyID == 0 || ModifyID == 1" type="text" class="form-control" placeholder="Name" v-model="roleName" />
    <p>
      {{ ModalConfirmText }}
      <span v-if="ModifyID == 1">
        <strong>{{ roleModify.name }} </strong> to
      </span>
      <span v-if="roleName">
        <strong>{{ roleName }}</strong>
      </span>
      role?
    </p>
    <p v-if="ErrorName" style="color: red">There was an error, please check again</p>
    <br />
  </component>
</template>

<script>
export default {
  name: "RoleView",
  data() {
    return {
      Roles: [],

      currentPage: 1,
      totalPage: 1,

      roleModify: {},
      roleName: "",
      isOpenModal: false,
      ModalConfirmText: "",
      TitleConfirmText: "",
      ErrorName: false,
      ModifyID: 0,
      rotate: true,
    };
  },
  created() {
    document.title = "Role Management";
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
      this.GetRoles();
    },
    closeModal() {
      this.isOpenModal = false;
      this.roleModify = {};
      this.roleName = "";
      this.ErrorName = false;
    },
    Create() {
      this.ModifyID = 0;
      this.TitleConfirmText = "Create role";
      this.ModalConfirmText = "You want to create this";
      this.isOpenModal = true;
    },
    Modify(value) {
      this.roleModify = value;
      this.roleName = this.roleModify.name;
      this.ModifyID = 1;
      this.TitleConfirmText = "Modify role";
      this.ModalConfirmText = "You want to change this";
      this.isOpenModal = true;
    },
    Delete(value) {
      this.roleModify = value;
      this.ModifyID = 2;
      this.TitleConfirmText = "Delete role";
      this.ModalConfirmText = "You want to delete this";
      this.isOpenModal = true;
    },
    async confirm() {
      if (this.rotate) {
        this.rotate = false;
        switch (this.ModifyID) {
          case 0:
            try {
              let res = await this.$axios.post(`api/v1/Role`, { name: this.roleName });
              if (res.status == 200) {
                this.$router.go();
              }
            } catch (e) {
              console.log("Create Role error");
              this.ErrorName = true;
              this.rotate = true;
            }
            break;
          case 1:
            try {
              const res = await this.$axios.put(`api/v1/Role/${this.roleModify.id}`, { name: this.roleName });
              if (res.status == 200) {
                this.$router.go();
              }
            } catch (e) {
              console.log("Modify Role error");
              this.ErrorName = true;
              this.rotate = true;
            }
            break;
          case 2:
            try {
              const res = await this.$axios.delete(`api/v1/Role/${this.roleModify.id}`);
              if (res.status == 200) {
                this.$router.go();
              }
            } catch (e) {
              console.log("Delete Role error");
              this.ErrorName = true;
              this.rotate = true;
            }
            break;
        }
      }
    },
    async GetRoles() {
      try {
        const res = await this.$axios.get(`api/v1/Role`, {
          params: {
            PageSize: 6,
            CurrentPage: this.currentPage,
          },
        });
        if (res.status == 200) {
          this.Roles = res.data.content;
          this.totalPage = res.data.totalPage;
        }
      } catch (e) {
        console.log("Roles Error");
      }
    },
  },
  mounted() {
    this.GetRoles();
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
.create-role {
  float: right;
  height: 35px;
  line-height: 10px;
  font-size: 16px;
  width: 13%;
  color: white;
  background: #3d5afe;
  font-weight: 500;
  cursor: pointer;
  padding: 10px;
  margin: 2% 5% 0 0;
  border-radius: 0.25rem;
}
.create-role:hover {
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
}
@media screen and (max-width: 769px) {
  .container {
    width: calc(100% - 92px);
    right: -5%;
  }
  .create-role {
    font-size: 16px;
    width: 22%;
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
  h1 {
    text-align: center;
  }
  .create-role {
    width: 30%;
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
    padding-bottom: 180px;
  }
}
</style>
