import { createStore } from "vuex";

export default createStore({
  state: {
    msg: {
      text: "",
      successful: Boolean,
    },
    isAuthenticated: false,
    auth_token: "",
  },
  mutations: {
    setMsg(state, { text, bool }) {
      state.msg.text = text;
      state.msg.successful = bool;
    },
    setAuthToken(state, token) {
      state.auth_token = token;
      state.isAuthenticated = true;
    },
    logout(state) {
      (state.auth_token = ""), (state.isAuthenticated = false);
    },
  },
  actions: {},
  modules: {},
  getters: {
    getMsg: (state) => {
      return state.msg;
    },
    getIsAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    getAuthToken: (state) => {
      return state.auth_token;
    },
  },
});
