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
      commit("setUser", res.content.user);
      commit("setToken", res.content.token.token);
      localStorage.setItem("accessToken", res.content.token.token);
    },
    logout({ commit }) {
      commit("setAuth", false);
      commit("setUser", null);
      commit("setToken", null);
      localStorage.setItem("accessToken", "");
    },
    fetchAccessToken({ commit }) {
      commit("setToken", localStorage.getItem("accessToken"));
    },
  },
});
