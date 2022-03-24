import { createApp } from "vue";
import App from "./App.vue";
import VSwitch from "v-switch-case";

import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from "./plugins/axios";
import store from "./store/index";
import DefaultLayout from "./layout/DefaultLayout.vue";
import EmptyLayout from "./layout/EmptyLayout.vue";
import Modal from "./components/Modal.vue";
import PaginationList from "./components/PaginationList.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/util.css";
import "@/assets/css/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const app = createApp(App);
app.use(store);
app.config.globalProperties.$axios = axios;
app.use(VSwitch);

axios.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  async function (error) {
    switch (error.response.status) {
      case 400:
        console.log(error.response);
        break;
      case 401: {
        console.log(error.response);
        if (error.response.data.Message == "Require refresh token") {
          try {
            await axios.post(`api/v1/User/RefreshToken`).then((res) => {
              console.log(res.response);
              if (res.status == 200) {
                router.go();
              }
            });
          } catch {
            store.dispatch("logout");
            router.push({ name: "login" });
            console.log("catch");
          }
        } else {
          store.dispatch("logout");
          router.push({ name: "login" });
          console.log("catch");
        }
        break;
      }
      case 403:
        console.log(error.response);
        console.log("Forbidden");
        break;
      case 500:
        console.log(error.response);
        console.log(error.response.data.Message);
        break;
      default:
        break;
    }
  }
);

app.use(router);
app.component("default-layout", DefaultLayout);
app.component("empty-layout", EmptyLayout);
app.component("confirm-modal", Modal);
app.component("pagination-list", PaginationList);
app.mount("#app");
