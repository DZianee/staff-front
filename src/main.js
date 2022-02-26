import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from "./plugins/axios";
import store from "./store/index";
import DefaultLayout from "./layout/DefaultLayout.vue";
import EmptyLayout from "./layout/EmptyLayout.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/util.css";
import "@/assets/css/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const app = createApp(App);
app.use(store);
app.config.globalProperties.$axios = axios;

axios.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 400:
        console.log(error.response);
        break;
      default:
        break;
    }
  }
);

app.use(router);
app.component("default-layout", DefaultLayout);
app.component("empty-layout", EmptyLayout);
app.mount("#app");
