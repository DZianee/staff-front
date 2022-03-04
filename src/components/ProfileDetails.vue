<template>
  <div class="profile-details">
    <div class="card">
      <h4 class="card-header">My profile</h4>
      <div class="card-body">
        <h4 class="card-title"></h4>
        <div class="info-details">
          <div class="firstname">
            <label for="firstname">Firstname</label>
            <input type="text" :value="userDetails.firstname" disabled />
          </div>
          <div class="lastname">
            <label for="lastname">Lastname</label>
            <input type="text" :value="userDetails.lastname" disabled />
          </div>
          <div class="birthDate">
            <label for="birthDate">Birth date</label>
            <input type="text" :value="userDetails.dob" disabled />
          </div>
          <div class="gender">
            <label for="gender">Gender</label>
            <input type="text" :value="userDetails.gender" disabled />
          </div>
          <div class="phone">
            <label for="phone">Phone no</label>
            <input type="number" :value="userDetails.phone" disabled />
          </div>
          <div class="department">
            <label for="department">Department</label>
            <input type="text" :value="userDetails.department" disabled />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileDetails",
  props: {
    userDetails: Object,
  },
};
</script>

<style scoped>
.profile-details {
  margin-top: 20px;
}
.card {
  border-radius: 12px;
  position: relative;
}
.card-header {
  width: 300px;
  position: absolute;
  z-index: 1;
  left: 200px;
  top: -30px;
}
.card-body {
  margin-top: 30px;
}
h4 {
  display: flex;
  justify-content: center;
  font-weight: 600;
}
.info-details {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  column-gap: 5px;
  row-gap: 30px;
}
.firstname label,
.lastname label,
.birthDate label,
.gender label,
.department label,
.phone label {
  margin-right: 30px;
}
.birthDate label,
.birthDate input,
.gender label,
.gender input,
.department label,
.department input,
.phone label,
.phone input,
.firstname label,
.firstname input,
.lastname label,
.lastname input {
  display: inline-block;
}
.department input {
  margin-left: -15px;
}
label {
  font-size: 15px;
  color: rgb(124, 117, 117);
  font-weight: 800;
  letter-spacing: 0.5px;
}
input {
  height: 40px;
  border-radius: 5px;
  outline-color: rgb(255, 255, 255);
  background-color: white;
  font-size: 15px;
  font-weight: 500;
}
</style>
