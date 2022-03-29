import { createRouter, createWebHashHistory } from "vue-router";

import routes from "./routes";
import store from "../store/index";
// import store from "@/store";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  var user = JSON.parse(store.state.user);
  if (user != null) {
    if (sessionStorage.getItem("User") != null && sessionStorage.getItem("Token") != null && sessionStorage.getItem("Auth") != null) {
      switch (to.name) {
        case "login":
        case "changePass":
          next("/");
          break;
        case "manageView":
        case "DepartmentView":
        case "RoleView":
        case "userView":
          if (user.roleName == "Manager") {
            next();
          } else {
            next("/");
          }
          break;
        case "topicView":
        case "topicideaView":
          if (user.roleName == "Manager" || user.roleName == "QA Manager") {
            next();
          } else {
            next("/");
          }
          break;
        default:
          next();
          break;
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
