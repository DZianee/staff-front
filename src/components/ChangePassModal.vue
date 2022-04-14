<template>
  <div class="change-pass_modal">
    <!-- Modal -->
    <!-- <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import PasswordInput from "./PasswordInput.vue";
import sha256 from "js-sha256";

export default {
  name: "ChangePassModal",
  components: {
    // PasswordInput,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
      NewPassError: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async submit() {
      try {
        this.$store.dispatch("fetchAccessToken");
        const res = await this.$axios.put(
          `api/v1/User/${this.user.id}/changePassword`,
          {
            oldPassword: sha256(this.oldPassword),
            newPassword: sha256(this.newPassword),
          },
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status === 200) {
          this.$router.push({ name: "login" });
        }
      } catch (e) {
        //
      }
    },
  },
  watch: {
    reNewPassword(newValue) {
      if (newValue !== this.newPassword) {
        this.NewPassError = true;
      } else {
        this.NewPassError = false;
      }
    },
  },
};
</script>

<style scoped>
.modal {
  margin-top: 100px;
}
.modal-title {
  position: relative;
  left: 140px;
  font-weight: bold;
}
button:hover {
  background: #303f9f;
}
span {
  font-size: 15px;
  color: rgb(141, 129, 129);
  font-weight: 700;
  letter-spacing: 0.5px;
}
</style>
