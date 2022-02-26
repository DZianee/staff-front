// import store from "@/store";
// import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import ChangePassword from "../views/ChangePassView.vue";

const router = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/change-password",
    name: "changePass",
    component: ChangePassword,
    meta: { layout: "empty" },
  },
];

export default router;
