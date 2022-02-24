import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";

Axios.interceptors.response.use(
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

createApp(App).use(router).mount("#app");
