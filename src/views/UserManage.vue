<template>
  <div class="user-man">
    <div class="user-man-header">
      <div class="user-man-header-search">
        <input type="text" placeholder="Search For User" />
        <select>
          <option value="name">Name</option>
          <option value="department">Department</option>
        </select>
      </div>
      <div class="user-man-header-sort">
        <p>Sort By:</p>
        <select>
          <option value="createdDate">Created Date</option>
          <option value="name">Name</option>
          <option value="department">Department</option>
        </select>
      </div>
    </div>
    <div class="user-man-content">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">FullName</th>
            <th scope="col">Role</th>
            <th scope="col">Department</th>
            <th scope="col">IsActive</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
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
  border: 2px solid black;
  align-items: center;
  /* margin-right: 20px; */
}

.user-man-header-search select {
  border-left: 2px solid black;
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
}

.user-man-header-sort {
  display: flex;
}

.user-man-content {
  margin-top: 18px;
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
}
</style>
