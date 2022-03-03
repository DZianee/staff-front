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
          <tr>
            <th scope="row">aaaaaa</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {};
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
</style>
