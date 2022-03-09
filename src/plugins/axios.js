import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL || "https://webenterprisefrontend.herokuapp.com";

export default axios.create();
