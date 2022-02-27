<template>
  <div class="remove_modal">
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Remove Confirmation</h5>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to remove this item ?</p>
          </div>
          <div class="remove-btns">
            <button type="button" data-bs-dismiss="modal" class="btn_cancel">Cancel</button>
            <button type="button" data-bs-dismiss="modal" class="btn_remove btn-danger">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RemoveModal",
};
</script>

<style scoped>
.modal {
  margin-top: 100px;
  border-radius: 7px;
}
.modal-content {
  height: 170px;
  position: relative;
}
.modal-title {
  margin-left: 135px;
  font-weight: 700;
}
.modal-body p {
  font-size: 18px;
  font-weight: 500;
}
.remove-btns {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.remove-btns button {
  margin: 7px;
}
button {
  border-radius: 7px;
  height: 35px;
  width: 102px;
  font-size: 16px;
  font-weight: 500;
}
.btn_cancel:hover {
  background-color: rgb(218, 218, 218);
}
@media screen and (max-width: 580px) {
  .modal-dialog {
    padding: 0 70px 0 30px;
    border-radius: 7px;
  }
  .modal-title {
    margin-left: 120px;
  }
  input {
    width: 100%;
  }
}
</style>
