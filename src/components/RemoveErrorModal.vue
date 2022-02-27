<template>
  <div class="remove-error_modal">
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Warning</h5>
          </div>
          <div class="modal-body">
            <p>You cannot remove this item since it has already been using recently</p>
          </div>
          <div class="btn">
            <button type="button" data-bs-dismiss="modal" class="btn_cancel">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RemoveErrorModal",
};
</script>

<style scoped>
.modal {
  margin-top: 100px;
  border-radius: 7px;
}
.modal-content {
  height: 200px;
  position: relative;
}
.modal-title {
  margin-left: 190px;
  font-weight: 700;
  color: rgb(189, 34, 34);
}
.modal-body p {
  font-size: 18px;
  font-weight: 500;
}
.btn {
  position: absolute;
  bottom: 10px;
  /* width: 100%; */
  right: 10px;
}
button {
  border-radius: 7px;
  height: 35px;
  width: 102px;
  font-size: 16px;
  font-weight: 500;
  background-color: #0750dc;
  color: white;
}
.btn_cancel:hover {
  background-color: #174fb6;
}
@media screen and (max-width: 580px) {
  .modal-dialog {
    padding: 0 70px 0 30px;
    border-radius: 7px;
  }
  .modal-title {
    margin-left: 160px;
  }
  input {
    width: 100%;
  }
}
</style>
