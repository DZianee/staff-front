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
      axios.defaults.headers["Authorization"] = `Bearer ${res.content.token.token}`;
      commit("setAuth", true);
      commit("setUser", JSON.stringify(res.content.user));
      // commit("setToken", res.content.token.token);
      sessionStorage.setItem("Token", res.content.token.token);
      sessionStorage.setItem("Auth", JSON.stringify(res.content.user));
    },
    logout({ commit }) {
      commit("setAuth", false);
      commit("setUser", null);
      // commit("setToken", null);
      sessionStorage.clear();
    },
    fetchAccessToken({ commit }) {
      commit("setToken", sessionStorage.getItem("Token"));
      axios.defaults.headers["Authorization"] = `Bearer ${sessionStorage.getItem("Token")}`;
    },
    getUser({ commit }) {
      commit("setUser", sessionStorage.getItem("Auth"));
    },
  },
});
