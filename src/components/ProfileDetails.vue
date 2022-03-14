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
            <input type="text" :value="getBirth" disabled />
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
            <input type="text" :value="userDetails.departmentName" disabled />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileDetails",
  data() {
    return {
      birth: "",
    };
  },
  props: {
    userDetails: Object,
  },
  computed: {
    getBirth() {
      const birth = new Date(this.userDetails.dob);
      var year = birth.getFullYear();
      var month = ("0" + (birth.getMonth() + 1)).slice(-2);
      var day = ("0" + birth.getDate()).slice(-2);
      const dmy = day + "/" + month + "/" + year;
      return dmy;
    },
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
  left: 220px;
  top: -30px;
}
.card-body {
  margin-top: 20px;
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
  font-size: 14px;
  color: rgb(141, 129, 129);
  font-weight: 800;
  letter-spacing: 0.5px;
}
input {
  height: 40px;
  border-radius: 5px;
  outline-color: rgb(255, 255, 255);
  background-color: white;
  font-size: 16px;
  font-weight: 500;
}
@media screen and (max-width: 1430px) {
  .card {
    height: 300px;
  }
  .card-header {
    left: 170px;
  }
  .info-details {
    display: grid;
    grid-template-rows: repeat(3, 32%);
    column-gap: 5px;
    row-gap: 10px;
    height: 220px;
  }
  .firstname label,
  .lastname label,
  .birthDate label,
  .gender label,
  .department label,
  .phone label {
    margin-right: 40px;
  }
}
@media screen and (max-width: 1366px) {
  .card {
    height: 330px;
  }
  .card-header {
    left: 90px;
  }
  .info-details {
    display: block;
    /* grid-template-rows: repeat(3, 32%);
    column-gap: 5px;
    row-gap: 10px; */
    height: 260px;
  }
  .firstname,
  .lastname,
  .birthDate,
  .gender,
  .department,
  .phone {
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 5px 0;
  }
  .firstname label,
  .lastname label,
  .birthDate label,
  .gender label,
  .department label,
  .phone label {
    /* border: seagreen solid; */
    line-height: 40px;
  }
  .firstname input,
  .lastname input,
  .birthDate input,
  .gender input,
  .department input,
  .phone input {
    margin-left: 50px;
    /* border: solid saddlebrown; */
    /* display: flex;
    justify-content: flex-start; */
    transform: translate(-20px, 0);
  }
}
@media screen and (max-width: 1280px) {
  .card-header {
    left: 140px;
  }
  .card {
    height: 450px;
  }
  .info-details {
    grid-template-columns: 100%;
    grid-template-rows: repeat(6, 25%);
    row-gap: 10px;
    height: 220px;
  }
  .firstname label,
  .lastname label,
  .birthDate label,
  .gender label,
  .department label,
  .phone label {
    position: relative;
    left: -40px;
    margin-right: 0;
  }
  input {
    left: 20px;
    position: relative;
    width: 320px;
  }
}
@media screen and (max-width: 1025px) {
  .card-header {
    left: 210px;
    width: 250px;
  }
  .card {
    height: 250px;
  }
  .firstname label,
  .lastname label,
  .birthDate label,
  .gender label,
  .department label,
  .phone label {
    position: relative;
    left: 0;
    margin-right: 30px;
  }
  input {
    left: 0;
    position: relative;
    width: 200px;
  }
  .info-details {
    grid-template-columns: repeat(2, 50%);
    /* grid-template-rows: repeat(6, 25%); */
    row-gap: 10px;
    /* height: 220px; */
  }
}
@media screen and (max-width: 769px) {
  .card-header {
    left: 150px;
  }
  .info-details {
    grid-template-columns: 100%;
    grid-template-rows: repeat(6, 25%);
    row-gap: 10px;
    height: 220px;
  }
  .card {
    height: 450px;
  }
  .firstname label,
  .lastname label,
  .birthDate label,
  .gender label,
  .department label,
  .phone label {
    position: relative;
    left: -40px;
    margin-right: 0;
  }
  input {
    left: 20px;
    position: relative;
    width: 320px;
  }
}
@media screen and (min-width: 320px) and (max-width: 483px) {
  .card-header {
    left: 70px;
  }
  .firstname label,
  .lastname label,
  .birthDate label,
  .gender label,
  .department label,
  .phone label {
    left: -30px;
  }
  .firstname,
  .lastname,
  .birthDate,
  .gender,
  .department,
  .phone {
    border-bottom: solid #e0e0e0;
  }
  input {
    left: 30px;
    position: relative;
    width: 170px;
  }
  .info-details {
    grid-template-columns: 100%;
    grid-template-rows: repeat(6, 25%);
    row-gap: 10px;
    height: 220px;
  }
  .card {
    height: 450px;
  }
}
</style>
