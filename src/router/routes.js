// import store from "@/store";
// import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import ChangePassword from "../views/ChangePassView.vue";
import TopicView from "../views/TopicView.vue";
import UserView from "../views/UserManView.vue";
import ManageView from "../views/ManageView.vue";
import ProfileView from "../views/ProfileView.vue";
import TopicIdeaView from "../views/TopicIdeaView.vue";
import NewsView from "../views/NewsView.vue";
import TopicListDetailsView from "../views/TopicListDetails.vue";
import TopicListView from "../views/TopicListView.vue";
import ExploreView from "../views/ExploreView.vue";
import ideaDetailView from "../views/IdeaDetailView.vue";

const router = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { layout: "co" },
  },
  {
    path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
    redirect: "/",
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
  {
    path: "/topic-view",
    name: "topicView",
    component: TopicView,
  },
  {
    path: "/user-view",
    name: "userView",
    component: UserView,
  },
  {
    path: "/manage-view",
    name: "manageView",
    component: ManageView,
  },
  {
    path: "/profile-view/:id",
    name: "profileView",
    component: ProfileView,
  },
  {
    path: "/topicidea-view/:id",
    name: "topicideaView",
    component: TopicIdeaView,
  },
  {
    path: "/news-view",
    name: "newsView",
    component: NewsView,
  },
  {
    path: "/topic-list-view/:id",
    name: "topicListView",
    component: TopicListDetailsView,
  },
  {
    path: "/topic-lists-view/",
    name: "topicListsView",
    component: TopicListView,
  },
  {
    path: "/ideaDetail-view/:id",
    name: "ideaDetailView",
    component: ideaDetailView,
  },
  {
    path: "/explore-view/",
    name: "exploreView",
    component: ExploreView,
  },
];

export default router;
