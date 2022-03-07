<template>
  <div class="container">
    <h1>Idea</h1>
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
            <th scope="col">Account's name</th>
            <th scope="col">Department</th>
            <th scope="col">Idea</th>
            <th scope="col">Adjustment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="idea in ideas" :key="idea.id">
            <th scope="row">{{ idea.userName }}</th>
            <td>{{ idea.department }}</td>
            <td><button type="button" class="btn btn-primary" @click="onViewIdea(idea)">View Idea</button></td>
            <td><button type="button" class="btn btn-danger" @click="onDelete(idea.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- view detail modal -->
    <Modal :title="'Idea Detail'" :modalActive="isActiveModal" :hideConfirm="true" @close="closeViewDetailModal">
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
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      isActiveModal: false,
      ideas: [
        {
          userName: "Khung Long Xanh",
          department: "HR",
          id: "id01",
        },
        {
          userName: "Khung Long Vang",
          department: "PD",
          id: "id02",
        },
        {
          userName: "Khung Long Do",
          department: "IT",
          id: "id03",
        },
      ],
      currentIdea: null,
    };
  },
  methods: {
    closeViewDetailModal() {
      this.isActiveModal = false;
    },
    onViewIdea(idea) {
      this.currentIdea = idea;
      this.isActiveModal = true;
    },
  },
};
</script>
<style scoped>
.table-toolbar {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.table-toolbar .search-input {
  max-width: 15%;
}

@media (max-width: 960px) {
  .table-toolbar .search-input {
    max-width: 100%;
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
