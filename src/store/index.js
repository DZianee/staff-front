import { createStore } from "vuex";
import axios from "../plugins/axios";

export default createStore({
  state: {
    token: null,
    authenticated: false,
    user: null,
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setAuth: (state, status) => (state.authenticated = status),
    setToken: (state, accessToken) => (state.token = accessToken),
  },
  actions: {
    login({ commit }, res) {
      commit("setUser", JSON.stringify(res.content.user));
      sessionStorage.setItem("User", JSON.stringify(res.content.user));
      sessionStorage.setItem("Token", res.content.token.token);
      // commit("setToken", res.content.token.token);
    },
    attachUser({ commit }, res) {
      axios.defaults.headers["Authorization"] = `Bearer ${res.content.token.token}`;
      sessionStorage.setItem("Auth", true);
      commit("setAuth", true);
    },
    logout({ commit }) {
      commit("setAuth", false);
      commit("setUser", null);
      sessionStorage.clear();
    },
    fetchAccessToken({ commit }) {
      commit("setToken", sessionStorage.getItem("Token"));
      axios.defaults.headers["Authorization"] = `Bearer ${sessionStorage.getItem("Token")}`;
    },
    getUser({ commit }) {
      commit("setUser", sessionStorage.getItem("User"));
    },
  },
});
