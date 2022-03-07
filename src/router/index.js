import { createRouter, createWebHashHistory } from "vue-router";

import routes from "./routes";
import store from "../store/index";
// import store from "@/store";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.state.user != null) {
    if (sessionStorage.getItem("User") != null && sessionStorage.getItem("Token") != null && sessionStorage.getItem("Auth") != null) {
      switch (to.name) {
        case "login":
          next("/");
          break;
        case "about":
          // if (sessionStorage.getItem("Auth") !== "Admin") {
          next();
          // } else {
          //   next("/");
          // }
          break;
        default:
          next();
      }
    } else if (to.name == "changePass") {
      next();
    } else if (to.name == "login") {
      next();
    } else {
      //
    }
  } else {
    if (to.name !== "login") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
