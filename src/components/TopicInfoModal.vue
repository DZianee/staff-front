<template>
  <div class="topic-info_modal">
    <h1>hello</h1>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Topic's Infomation</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="body">
              <div class="topic-name">
                <label for="topicName">Topic's name</label>
                <input
                  type="text"
                  class="topicName_input"
                  :value="topicInfo.topicName"
                  disabled
                />
              </div>
              <div class="topic-type">
                <label for="topicType">Topic's type</label>
                <input
                  type="text"
                  class="topicType_input"
                  :value="topicInfo.topicType"
                  disabled
                />
              </div>
              <div class="closure-date">
                <label for="closureDate">Closure date</label>
                <input type="text" :value="topicInfo.closureDate" disabled />
              </div>
            </div>
          </div>
          <div class="btn_bar--close">
            <button type="button" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicInfoModal",
  props: {
    topicInfo: Object,
  },
};
</script>

<style scope>
.modal {
  margin-top: 200px;
  border-radius: 7px;
}
.modal-content {
  height: 490px;
  position: relative;
  border: solid red;
}
.modal-title {
  margin-left: 150px;
  line-height: 20px;
  font-size: 22px;
  font-weight: 700;
}
.body {
  padding: 0 20px 0 20px;
}
.body div {
  padding: 12px;
}
.modal-body div label,
input {
  display: flex;
  justify-content: flex-start;
}
label {
  font-size: 15px;
  color: rgb(124, 117, 117);
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 9px;
}
input {
  width: 100%;
  height: 42px;
  border-radius: 5px;
  outline-color: rgb(255, 255, 255);
  background-color: white;
  font-size: 18px;
  font-weight: 500;
  padding: 14px;
}
.closure-date input {
  width: 70%;
}
.btn_bar--close {
  position: absolute;
  bottom: 40px;
  width: 100%;
  padding: 0 43px;
}
.btn_bar--close button {
  background-color: #0750dc;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
  color: white;
  border-radius: 7px;
  height: 42px;
  line-height: 10px;
}
</style>
