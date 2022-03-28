<template>
  <div class="ideaDetail" v-if="idea != null && idea != {}">
    <h1>testing</h1>
    <div class="container">
      <div class="container-content">
        <div class="container-content-top">
          <div class="container-content-info">
            <img :src="`https://${idea.creatorAvatar}`" alt="user-Img" />
            <div class="container-content-subInfo">
              <span>{{ idea.creator }}</span> <i class="bi bi-caret-right-fill"></i>
              <span>{{ idea.topicName }}</span>
              <p>{{ idea.startDate }}</p>
            </div>
          </div>
          <i v-if="userStored.roleName == 'Manager'" class="bi bi-three-dots-vertical container-content-info_icon-modify" @click="openDropdown()">
            <ul class="idea-adjustment-items" v-if="DropDown">
              <!-- <li class="idea-adjustment-item" style="border-bottom: 2px solid black" @click="ModifyIdea()">Modify</li> -->
              <!-- <li class="idea-adjustment-item" @click="DeleteIdea()">Delete</li> -->
              <!-- <li class="idea-adjustment-item" @click="IdeaModalAct()">Delete</li> -->
              <li class="idea-adjustment-item" @click="Delete">Delete</li>
            </ul>
          </i>
        </div>
        <div class="container-content-body">
          <div class="container-content-body_content" v-html="idea.title" contenteditable="false"></div>
          <div class="container-content-body_content" v-html="idea.description" contenteditable="false"></div>

          <div
            class="container-content-body_img"
            v-if="idea.image != null && idea.image.length > 0"
            :style="images.length <= 3 ? { height: '420px' } : ''">
            <ul class="container-content-body_imgGrid1" v-if="images.length == 1 && images != null">
              <li class="container-content-body_img1" v-for="(image, index) in images" :key="image" @click="modalAct(index)">
                <img :src="`https://${image}`" alt="user-Img" />
              </li>
            </ul>
            <ul class="container-content-body_imgGrid2" v-if="images.length == 2 && images != null">
              <li class="container-content-body_img2" v-for="(image, index) in images" :key="image" @click="modalAct(index)">
                <img :src="`https://${image}`" alt="user-Img" />
              </li>
            </ul>
            <ul class="container-content-body_imgGrid3" v-if="images.length == 3 && images != null">
              <li class="container-content-body_img3" v-for="(image, index) in images" :key="image" @click="modalAct(index)">
                <img :src="`https://${image}`" alt="user-Img" />
              </li>
            </ul>
            <ul class="container-content-body_imgGrid4" v-if="images.length == 4 && images != null">
              <li class="container-content-body_img4" v-for="(image, index) in images" :key="image" @click="modalAct(index)">
                <img :src="`https://${image}`" alt="user-Img" />
              </li>
            </ul>
            <ul class="container-content-body_imgGrid5" v-if="images.length >= 5 && images != null">
              <li class="container-content-body_img5" v-for="(image, index) in images" :key="image" @click="modalAct(index)">
                <img v-if="index < 5" :src="`https://${image}`" alt="user-Img" />
                <span v-if="index == 4">+{{ images.length - 5 }}</span>
              </li>
            </ul>
          </div>

          <div class="previewFilesContainer" v-if="files != null && files.length > 0">
            <span class="previewItem" v-for="file in files" :key="file">
              <span @click="openpdf(file)">
                <i class="bi bi-file-earmark-pdf"></i>
                <p>File name super aquesum</p>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="container-reaction">
        <div class="container-reaction-top">
          <div class="container-reaction-info">
            <div style="display: flex; justify-content: center; gap: 8px">
              <i class="bi bi-hand-thumbs-up-fill" v-if="ifThumbedUp()" @click="unReact()"></i>
              <i class="bi bi-hand-thumbs-up" v-else @click="React(1)"></i>
              {{ idea.totalLike }}
            </div>
            <div style="display: flex; justify-content: center; gap: 8px">
              <i class="bi bi-hand-thumbs-down-fill" v-if="ifThumbedDown()" @click="unReact()"></i>
              <i class="bi bi-hand-thumbs-down" v-else @click="React(0)"></i>
              {{ idea.totalDislike }}
            </div>
          </div>
          <span>
            <i class="bi bi-chat-right-text"></i>
            <span>{{ idea.totalComment }} <span class="invisible">comments</span></span>
          </span>
        </div>
      </div>
      <div class="container-comment">
        <div class="container-comment-top">
          <!-- <select id="ideaListingOption" class="form-select" v-model="commentFilter" @change="selectedOption()">
            <option value="0">Most popular</option>
            <option value="1">Newest comment</option>
          </select> -->
        </div>
        <div class="container-comment-body">
          <ul v-for="comment in idea.comments" :key="comment.id">
            <li style="margin-bottom: 16px">
              <img :src="`https://${comment.userAvatar}`" alt="user-Img" />
              <div>
                <div class="container-comment-detail" contenteditable="false">
                  <span>
                    <strong>{{ comment.userFullname }}</strong>
                  </span>
                  <span v-if="comment.parentId != null">
                    <span v-for="ParentComment in idea.comments" :key="ParentComment.id">
                      <span v-if="ParentComment.id == comment.parentId">
                        <br />
                        <span style="background: darkgrey; border-radius: 6px; padding: 4px">
                          <strong>{{ ParentComment.userFullname }}</strong> <span v-html="ParentComment.comment"></span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <br />
                  <span v-html="comment.comment"> </span>
                </div>
                <div style="text-align: left">
                  <span class="Reply" @click="Reply(comment)">Reply</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="margin-top: 8px">
        <div class="footer-reply">
          <span
            style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 90%; display: block"
            v-if="commentInput.ReplyComment != null">
            Replying to <strong>{{ commentInput.ReplyComment.userFullname }}</strong> <span v-html="ReplyCommentContent"></span>
            <i class="bi bi-x-circle-fill" @click="Reply(null)"></i>
          </span>
        </div>
        <div class="container-comment-footer">
          <i class="bi bi-send" @click.once="submitComment()" :key="buttonKey"></i>
          <div class="footer-checkbox">
            <input type="checkbox" name="Anonymous" v-model="commentInput.isAnonymous" />
            <label for="Anonymous"> Anonymous </label>
          </div>
          <textarea
            :disabled="idea.status == 1"
            :class="idea.status == 1 ? 'disable' : ''"
            placeholder="Write your comment"
            v-model="commentInput.text"
            @input="resize($event)"></textarea>
        </div>
      </div>
    </div>
  </div>
  <!-- <component
    :is="'confirm-modal'"
    v-if="isOpenModal"
    :title="'Post comment'"
    :ConfirmModalActive="isOpenModal"
    :activeConfirmButton="true"
    CommentRejectButton="Post overtly"
    CommentConfirmButton="Post Anonymously"
    @CommentSubmit="submitComment"
    @closeModal="opencloseModal">
    <p>You want to post comment <strong>overtly</strong> or <strong>anonymously</strong></p>
    <br />
  </component> -->
  <Image-light-box v-if="modalActive" :imageUrl="true" :modalActive="modalActive" :imagesIndex="imageRef" :images="images" @close="modalAct(-1)" />
</template>

<script>
import ImageLightBox from "../components/ImageLightBox.vue";
import { ref } from "vue";

export default {
  name: "TopicView",
  components: {
    ImageLightBox,
  },
  data() {
    return {
      idea: {},
      images: [],
      files: [],
      comment: [],
      reaction: [],

      quillEditor: {
        theme: "bubble",
        disableEdit: true,
      },

      buttonKey: 1,

      DropDown: false,

      commentInput: {
        text: "",
        ReplyComment: null,
        isAnonymous: false,
      },
    };
  },
  setup() {
    const modalActive = ref(false);
    const imageRef = ref(0);

    const modalAct = (imageindex) => {
      modalActive.value = !modalActive.value;
      imageRef.value = imageindex;
    };

    return { modalActive, imageRef, modalAct };
  },
  computed: {
    ReplyCommentContent() {
      var content;
      if (this.commentInput.ReplyComment) {
        content = this.commentInput.ReplyComment.comment.replaceAll("<br />", " ");
      }
      return content;
    },
    userStored() {
      return JSON.parse(this.$store.state.user);
    },
  },
  methods: {
    openDropdown() {
      this.DropDown = true;
    },
    clickListener(event) {
      if (event.target.className != "bi bi-three-dots-vertical container-content-info_icon-modify") {
        this.DropDown = false;
      }
    },
    openpdf(value) {
      var url = `https://${value}`;
      window.open(url);
    },
    // selectedOption() {
    //   var x;
    //   switch (parseInt(this.commentFilter)) {
    //     case 0:
    //       x = 150;
    //       break;
    //     case 1:
    //       x = 120;
    //       break;
    //   }
    //   document.getElementById("ideaListingOption").style.width = x.toString() + "px";
    // },
    ModifyIdea() {
      this.quillEditor.theme = "snow";
      this.quillEditor.disableEdit = false;
    },
    ifThumbedUp() {
      var user = JSON.parse(this.$store.state.user);
      var condition = false;
      if (user) {
        this.reaction.forEach(hasThumbedUp);
      }
      function hasThumbedUp(item) {
        if (item.userId == user.id && item.reactType == 1) {
          condition = true;
        }
      }
      return condition;
    },
    ifThumbedDown() {
      var user = JSON.parse(this.$store.state.user);
      var condition = false;
      if (user) {
        this.reaction.forEach(hasThumbedDown);
      }
      function hasThumbedDown(item) {
        if (item.userId == user.id && item.reactType == 0) {
          condition = true;
        }
      }
      return condition;
    },
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    Reply(value) {
      this.commentInput.ReplyComment = value;
    },
    async submitComment() {
      try {
        if (this.commentInput.text.trim() != "") {
          const user = JSON.parse(this.$store.state.user);
          var context = this.commentInput.text.trim();
          do {
            context = context.replaceAll("\n\n", "\n");
          } while (context.includes("\n\n"));
          var string = context.replaceAll("\n", "<br />");
          let data;
          if (this.commentInput.ReplyComment) {
            data = {
              userId: user.id,
              comment: string,
              parentId: this.commentInput.ReplyComment.id,
              isAnonymous: this.commentInput.isAnonymous,
            };
          } else {
            data = {
              userId: user.id,
              comment: string,
              parentId: null,
              isAnonymous: this.commentInput.isAnonymous,
            };
          }
          const res = await this.$axios.post(`api/v1/Idea/${this.$route.params.id}/comment`, data);
          if (res.status == 200) {
            this.getIdeaDetails();
            const textareaTag = document.getElementsByTagName("textarea");
            textareaTag[0].style.height = "auto";
            this.commentInput = {
              text: "",
              ReplyComment: null,
              isAnonymous: false,
            };
            this.buttonKey++;
          }
        }
      } catch {
        console.log("error");
      }
    },
    async React(value) {
      try {
        var user = JSON.parse(this.$store.state.user);
        const data = {
          userId: user.id,
          reactType: value,
        };
        const res = await this.$axios.post(`api/v1/Idea/${this.$route.params.id}/react`, data);
        if (res.status == 200) {
          this.getIdeaDetails();
        }
      } catch {
        //
      }
    },
    async unReact() {
      try {
        var user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.delete(`api/v1/Idea/${this.$route.params.id}/unreact?userId=${user.id}`);
        if (res.status == 200) {
          this.getIdeaDetails();
        }
      } catch {
        //
      }
    },
    async Delete() {
      try {
        const res = await this.$axios.delete(`api/v1/Idea/${this.$route.params.id}`);
        if (res.status == 200) {
          this.$router.go(-1);
        }
      } catch {
        //
      }
    },
    async getIdeaDetails() {
      try {
        const res = await this.$axios.get(`api/v1/Idea/${this.$route.params.id}`);
        if (res.status == 200) {
          this.idea = res.data.content;
          this.idea.startDate = dateConvert(this.idea.startDate);
          this.comment = this.idea.comments;
          this.reaction = this.idea.reactions;
          this.images = this.idea.image;
          this.files = this.idea.document;
        }
      } catch {
        //
      }

      function dateConvert(timeStamp) {
        let timeStampString = timeStamp.toString();
        if (timeStampString.length < 13) {
          for (var i = timeStampString.length; i < 13; i++) {
            timeStampString += "0";
          }
        }
        const date = new Date(parseInt(timeStampString));
        let month;
        let dateVal;
        let hour;
        let minute;
        if (date.getMonth() < 9) {
          month = "0" + (parseInt(date.getMonth()) + 1).toString();
        } else {
          month = (parseInt(date.getMonth()) + 1).toString();
        }
        if (date.getDate() < 10) {
          dateVal = "0" + date.getDate();
        } else {
          dateVal = date.getDate();
        }
        if (date.getHours() < 10) {
          hour = "0" + parseInt(date.getHours()).toString();
        } else {
          hour = parseInt(date.getHours()).toString();
        }
        if (date.getMinutes() < 10) {
          minute = "0" + (parseInt(date.getMinutes()) + 1).toString();
        } else {
          minute = (parseInt(date.getMinutes()) + 1).toString();
        }
        let DateConverted = date.getFullYear() + "-" + month + "-" + dateVal + " " + hour + ":" + minute;
        return DateConverted;
      }
    },
  },
  mounted() {
    this.getIdeaDetails();
    window.addEventListener("click", this.clickListener);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.clickListener);
  },
};
//
</script>

<style scoped>
.disable {
  opacity: 0.3;
}
.container {
  overflow: unset;
  border: 1px solid black;
  width: 96%;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 10px;
  -webkit-box-shadow: 0 4px 10px rgb(0 0 0 / 50%);
  box-shadow: 0 4px 10px rgb(0 0 0 / 50%);
}
.ideaDetail {
  position: relative;
  left: 270px;
  width: calc(100% - 270px);
  padding-bottom: 100px;
}
.container-content {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
}
.container-reaction {
  border-bottom: 1px solid black;
}
.container-content-top,
.container-reaction-top {
  margin: 16px auto;
  width: 78%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container-content-info {
  display: flex;
  gap: 12px;
}
.container-content-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.container-content-subInfo {
  text-align: left;
}
.container-content-body {
  width: 85%;
  margin: 0 auto;
}
.container-content-body_content {
  width: 90%;
  text-align: justify;
  margin: 16px auto;
}
.container-content-body_content:nth-child(1) {
  margin-top: 16px;
}
.container-content-body_img {
  height: 640px;
}
.container-content-body_img li {
  cursor: pointer;
}
.container-content-body_img img {
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  height: 100%;
  width: 100%;
}

/* Grid1 */
.container-content-body_imgGrid1 {
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.container-content-body_img1 {
  width: 100%;
  height: 100%;
}

/* Grid2 */
.container-content-body_imgGrid2 {
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.container-content-body_img2 {
  width: 50%;
  height: 100%;
}
.container-content-body_img2:nth-child(1) {
  border-right: 1px solid white;
}

/* Grid3 */
.container-content-body_imgGrid3 {
  padding: 0;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.container-content-body_img3:nth-child(1) {
  width: 60%;
  height: 100%;
  border-right: 1px solid white;
}
.container-content-body_img3:nth-child(2),
.container-content-body_img3:nth-child(3) {
  width: 40%;
  height: 50%;
}
.container-content-body_img3:nth-child(2) {
  border-bottom: 1px solid white;
}

/* Grid4 */
.container-content-body_imgGrid4 {
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.container-content-body_img4 {
  width: 50%;
  height: 50%;
}
.container-content-body_img4:nth-child(1) {
  border-right: 1px solid white;
  border-bottom: 1px solid white;
}
.container-content-body_img4:nth-child(4) {
  border-top: 1px solid white;
  border-left: 1px solid white;
}

/* Grid>5 */
.container-content-body_imgGrid5 {
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.container-content-body_img5:nth-child(1),
.container-content-body_img5:nth-child(2) {
  height: 50%;
  width: 50%;
}
.container-content-body_img5:nth-child(1) {
  border-right: 1px solid white;
}
.container-content-body_img5:nth-child(3),
.container-content-body_img5:nth-child(4),
.container-content-body_img5:nth-child(5) {
  height: 50%;
  width: calc(100% / 3);
  border-top: 1px solid white;
}
.container-content-body_img5:nth-child(4),
.container-content-body_img5:nth-child(5) {
  border-left: 1px solid white;
}
.container-content-body_img5:nth-child(5) {
  position: relative;
}

.container-content-body_img5 span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 1;
  font-weight: 500;
  font-size: 24px;
}
.container-content-body_img5:nth-child(5):after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  opacity: 1;
  background: rgba(0, 0, 0, 0.4);
}

.container-content-info_icon-modify {
  position: absolute;
  top: 3%;
  right: 4%;
  cursor: pointer;
}
.container-reaction-top span {
  display: flex;
  gap: 10px;
}
.container-reaction-info {
  display: flex;
  gap: 76px;
}
.container-reaction-info i {
  cursor: pointer;
}
.container-comment-top {
  margin: 16px 24px;
  text-align: left;
}
.container-comment-top .form-select {
  border: 0px;
  outline: 0px;
  width: 150px;
}
.container-comment-top .form-select:focus {
  border: 0px;
  outline: 0px;
  box-shadow: none;
}
.container-comment-body {
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
}
.container-comment-body ul {
  padding-right: 2rem;
}
.container-comment-body li {
  display: flex;
  gap: 12px;
}
.container-comment-body li img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.container-comment-detail {
  background-color: rgb(240, 242, 245);
  border-radius: 20px;
  padding: 0 16px;
  width: 100%;
  text-align: left;
  word-break: break-all;
}
.container-comment-detail span:first-child {
  margin-bottom: 12px;
}
.idea-adjustment-items {
  list-style-type: none;
  min-width: 120px;
  height: 45px;
  top: 4%;
  left: -500%;
  position: absolute;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: right;
  color: black;
  line-height: 44px;
  border-radius: 5px;
  padding: 0;
  text-align: center;
  z-index: 1;
  margin: 0;
}

.idea-adjustment-item {
  margin-top: 0;
  font-size: 16px;
}

.idea-adjustment-item:hover {
  background-color: darksalmon;
  cursor: pointer;
  border-radius: 5px;
}
.Reply {
  margin-left: 12px;
  cursor: pointer;
}
.Reply:hover {
  color: lightblue;
}
.container-comment-footer {
  background-color: rgb(240, 242, 245);
  border-radius: 16px;
  position: relative;
}
textarea {
  width: 100%;
  padding: 14px;
  padding-bottom: 18px;
  /* padding-top: 24px; */
  resize: none;
  background-color: transparent;
  overflow: hidden;
}
.footer-reply {
  text-align: left;
  margin: 0 46px;
  background-color: lightsteelblue;
  padding: 0 12px;
  border-radius: 8px;
}
.bi-send {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 8px;
  right: 21px;
  font-size: 22px;
  border-radius: 50%;
  cursor: pointer;
}
.bi-send:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
.footer-reply i {
  position: absolute;
  right: 10%;
  cursor: pointer;
}
.footer-checkbox {
  display: flex;
  margin: 0 26px;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 0;
  right: -10px;
}
.invisible {
  visibility: unset !important;
}
.previewFilesContainer {
  display: flex;
  gap: 8px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid black; */
  padding: 12px;
  border-radius: 16px;
  overflow-x: auto;
}
.previewFilesContainer .previewItem {
  position: relative;
  min-width: 100px;
  min-height: 85px;
  max-width: 130px;
  max-height: 70px;
  text-align: center;

  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.previewItem i {
  font-size: 26px;
}
.previewItem > span {
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 8px;
}
.previewItem > span:hover {
  background-color: antiquewhite;
  border-radius: 16px;
}
.previewItem > span > p {
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}
@media (min-width: 481px) and (max-width: 1025px) {
  .ideaDetail {
    position: relative;
    left: 80px;
    width: calc(100% - 80px);
  }
}
@media screen and (max-width: 991px) {
  .container-content-body_img {
    height: 340px !important;
  }
}
@media screen and (max-width: 600px) {
  .footer-reply {
    margin: 0 20px;
  }
}
@media screen and (max-width: 610px) {
  .container-comment-body ul {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  .container-comment-body {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .container-comment-body::-webkit-scrollbar {
    display: none;
  }
}
@media screen and (max-width: 480px) {
  .invisible {
    display: none !important;
  }
  .ideaDetail {
    position: relative;
    left: 0px;
    top: 70px;
    width: 100%;
  }
  .container-reaction-info {
    gap: 70%;
  }
  .container-comment-top {
    margin: 4px 0 0 4px;
  }
}
</style>
