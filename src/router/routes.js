import HomeView from "../views/HomeView.vue";
import Login from "../views/login/Index.vue";
import ChangePassword from "../views/changePassword/Index.vue";
const routes = [
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

export default routes;
