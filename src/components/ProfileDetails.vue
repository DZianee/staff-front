<template>
  <div class="profile-details">
    <div class="card">
      <h4 class="card-header">My profile</h4>
      <div class="card-body">
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
            <input type="text" :value="userDetails.phone" disabled />
          </div>
          <div class="address">
            <label for="address">Address</label>
            <input type="text" :value="userDetails.address" disabled />
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
  width: 100%;
  height: fit-content;
  overflow: visible;
}
.card-header {
  width: 300px;
  position: absolute;
  z-index: 1;
  left: 150px;
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
.address label,
.phone label {
  margin-right: 34px;
}
.birthDate label,
.birthDate input,
.gender label,
.gender input,
.address label,
.address input,
.phone label,
.phone input,
.firstname label,
.firstname input,
.lastname label,
.lastname input {
  display: inline-block;
}
.address input {
  margin-left: -15px;
}
label {
  font-size: 14px;
  color: rgb(141, 129, 129);
  font-weight: 800;
  letter-spacing: 1.2px;
}
input {
  height: 40px;
  border-radius: 5px;
  outline-color: rgb(255, 255, 255);
  background-color: white;
  font-size: 16px;
  font-weight: 500;
}
@media screen and (max-width: 1440px) {
  .card {
    height: 320px;
  }
  .card-header {
    left: 170px;
  }
  .info-details {
    display: block;
    height: 220px;
  }
  .card-header {
    left: 130px;
  }
  .firstname,
  .lastname,
  .birthDate,
  .gender,
  .address,
  .phone {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 3px 0;
  }
  label {
    margin-left: 50px;
    padding-top: 10px;
  }
  .address input {
    margin-left: 0px;
  }
}
@media screen and (max-width: 1366px) {
  .card {
    height: 350px;
  }
  .card-header {
    left: 100px;
  }
  .firstname,
  .lastname,
  .birthDate,
  .gender,
  .address,
  .phone {
    padding: 5px 0;
  }
}
@media screen and (max-width: 1025px) {
  .card-header {
    left: 170px;
    width: 300px;
  }
  .card {
    height: 360px;
  }
  .firstname,
  .lastname,
  .birthDate,
  .gender,
  .address,
  .phone {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 6px 0;
  }
  input {
    margin-left: 20px;
  }
  .address input {
    margin-left: 20px;
  }
  label {
    margin-left: 70px;
  }
}
@media screen and (max-width: 769px) {
  .card-header {
    left: 120px;
    width: 270px;
  }
  .card {
    height: 360px;
  }
  .firstname,
  .lastname,
  .birthDate,
  .gender,
  .address,
  .phone {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 6px 0;
  }
  input {
    margin-left: 20px;
  }
  .address input {
    margin-left: 20px;
  }
  label {
    margin-left: 70px;
  }
}
@media screen and (min-width: 320px) and (max-width: 483px) {
  .card-header {
    left: 70px;
  }
  label {
    margin-left: 40px;
  }
  .card {
    height: 330px;
  }
  .firstname,
  .lastname,
  .birthDate,
  .gender,
  .address,
  .phone {
    padding: 4px 0;
  }
}
</style>
