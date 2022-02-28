import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
// import store from "@/store";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("Auth") != null) {
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
      case "changePass":
        next();
        break;
      default:
        next();
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
